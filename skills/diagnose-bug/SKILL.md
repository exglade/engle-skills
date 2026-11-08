---
name: diagnose-bug
description: Finds the root cause of a hard bug or performance regression by building a failing feedback loop first, then reproducing, hypothesizing, instrumenting, fixing, and cleaning up. Use when the user says "diagnose" or "debug this", or reports something broken, throwing, flaky, or slow that resists a first look.
license: MIT
metadata:
  source: Adapted from mattpocock/skills (diagnosing-bugs), MIT.
---

# Diagnose bug

A discipline for hard bugs. Skip a phase only with a stated reason.

Read the project's docs for the area first, if they exist.

Use the `principles` skill if it's available: `fix-root-causes`, `attack-the-premise` after failed fixes, and
`explain-the-number` before trusting a timing or benchmark.

## Redact

- Replace every secret in commands, output, and artifacts with `<REDACTED>`.
- Keep credentials in env vars, not in what you show.
- Quote only the lines of a captured artifact that carry the signal.
- If redacted output isn't enough, say so and ask the user.

## Phase 1: Build a feedback loop

**This is the skill.** With a **tight** loop that goes **red** on this bug, you will find the cause. Without one, no
amount of reading code will save you. Spend most of your effort here.

Ways to build one, roughly in order:

1. A failing test at whatever seam reaches the bug.
2. A curl or HTTP script against a running dev server.
3. A CLI run with a fixture input, diffed against known-good output.
4. A headless browser script that drives the UI and asserts on DOM, console, or network.
5. A replay of a captured trace (request, payload, event log) through the code path.
6. A throwaway harness that runs a minimal slice of the system.
7. A property or fuzz loop for "sometimes wrong" bugs.
8. A bisection script for `git bisect run` when the bug appeared between two known states.
9. A differential loop: same input through old and new versions, diff the outputs.
10. Last resort, a human in the loop: copy [scripts/hitl-loop.template.sh](scripts/hitl-loop.template.sh) and drive the
    user through the steps.

Tighten it:

- Faster: cache setup, skip unrelated init, narrow the scope.
- Sharper: assert on the exact symptom, not "didn't crash".
- Deterministic: pin time, seed randomness, isolate the filesystem and network.

**Flaky bugs:** raise the reproduction rate instead of chasing a clean repro. Loop the trigger, add stress, narrow
timing. 50% is debuggable; 1% isn't.

**No loop possible:** stop and say so. List what you tried. Ask for an environment that reproduces it, a captured
artifact, or permission to add temporary instrumentation. Hypothesize only once a loop exists.

**Done when** you have one command, already run, that is:

- [ ] **Red-capable:** it drives the real code path and asserts the user's exact symptom.
- [ ] **Deterministic:** same verdict every run (or a pinned, high rate for flaky bugs).
- [ ] **Fast:** seconds, not minutes.
- [ ] **Agent-runnable:** it runs unattended, or through the HITL script.

If you catch yourself building a theory before this command exists, stop.

## Phase 2: Reproduce and minimize

- Run the loop and watch it go red. If you forced the red by changing code or a fixture, `diff` against a clean copy
  to prove the change landed; a stale build or the wrong file makes it fail for another reason.
- Confirm it's the user's failure, not a nearby one. Wrong bug, wrong fix.
- Capture the exact symptom for later comparison.
- Shrink the repro: cut inputs, callers, config, and steps one at a time, re-running after each cut.

**Done when** every remaining element is needed: removing any one makes the loop go green.

## Phase 3: Hypothesize

- Write 3–5 ranked hypotheses before testing any.
- Each must be falsifiable: "If X is the cause, then changing Y makes the bug disappear."
- Show the ranked list to the user before testing. They may know something that re-ranks it. If they're away,
  carry on with your ranking.
- When two fixes that share one assumption have both failed, stop fixing. Write the assumption down and test it
  directly; each failed fix is evidence against it.

## Phase 4: Instrument

- Each probe tests one prediction. Change one variable at a time.
- Prefer a debugger or REPL, then targeted logs at the boundaries that separate hypotheses.
- Tag every debug log with a unique prefix, like `[DEBUG-a4f2]`, so cleanup is one grep.
- **Performance:** measure a baseline first (timer, profiler, query plan), then bisect. Measure, then fix.

## Phase 5: Fix and regression test

- Write the regression test before the fix, but only at a **correct seam**: one that exercises the real bug pattern
  as it happens at the call site.
- If no correct seam exists, that's a finding. Note it: the architecture is keeping the bug from being locked down.

With a correct seam:

1. Turn the minimized repro into a failing test.
2. Watch it fail.
3. Apply the fix.
4. Watch it pass.
5. Re-run the Phase 1 loop on the original, un-minimized scenario.

## Phase 6: Clean up

- [ ] The original repro no longer reproduces.
- [ ] The regression test passes, or the missing seam is documented.
- [ ] All `[DEBUG-...]` logs are removed (grep the prefix).
- [ ] Throwaway harnesses are deleted or clearly marked.
- [ ] The confirmed hypothesis is in the commit message, so the next debugger learns from it.
