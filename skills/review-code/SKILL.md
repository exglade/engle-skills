---
name: review-code
description: Reviews a code diff against its spec, the project's standards, and the risk of breaking things elsewhere, sorting findings by how much they matter, with an opt-in mode where subagents try to break the change. Use to review a branch, a PR, uncommitted changes, or "everything since X", after implementing a ticket or spec, or when the user wants a change stress-tested or reviewed adversarially. Not for improving code that isn't changing; use improve-code.
license: MIT
metadata:
  source: Adapted from mattpocock/skills (code-review), MIT.
---

# Review code

Review one diff and stay inside it. Report findings; apply fixes only when asked.

## 1. Pin the diff

- Use the range the user gave: a commit, branch, tag, or "uncommitted".
- Default: everything since the merge-base with the main branch, uncommitted changes included.
  - Base: `git merge-base HEAD <main branch>`.
  - Diff: `git diff <base>` (covers commits and the working tree). List commits with `git log <base>..HEAD --oneline`.
- Stop early if the ref doesn't resolve or the diff is empty.

## 2. State the intent

- Find what the change was meant to do, in this order: a path the user passed, a ticket or spec in the work folder,
  commit messages, the PR description.
- **Work folder:** `.scratch/work/`.
- Write the intent in one paragraph. Without a spec, review the Spec axis against that paragraph and say so.

## 3. Gather the standards

- Project rules first: search the repo for every file that says how code should be written, such as
  CONTRIBUTING.md, AGENTS.md, coding standards, and linter configs. **The project overrides everything
  below.**
- Principles: the ones the user named, or the 2–4 most relevant to this diff. Use the `principles` skill if it's
  available.
- The smell list in [references/smells.md](references/smells.md). Smells are judgment calls, not hard violations.
- Skip anything tooling already enforces.

## 4. Review on three axes

Run Spec and Standards in parallel subagents when you can, so neither colors the other. Start each with a fresh
context, not a copy of this conversation, and wait for both. For a small diff (under about 50 lines), review both
axes yourself; subagents cost more time than they save there. Do the Risk axis yourself either way.

- **Spec:** what's missing or partial, what was added unasked, and what looks implemented but wrong. Quote the spec
  line for each.
- **Standards:** where the diff breaks a project rule (cite it) or a chosen principle, or shows a smell (name it,
  quote the hunk).
- **Risk:** what the change could break outside the diff. Find the one fact the change is safe because of, and prove
  it by running real code when that's cheap; otherwise mark it unproven. If the project has a `verify-*` skill, use
  it for user-facing behavior. Look where grep stops: wire formats, DB columns, config, flags, other consumers.

## Break it (opt-in)

Run this only when the user asks for an adversarial review, to "try to break it", or to stress-test the change.

1. Start one or two subagents with a fresh context, each in its own worktree of the repo under review (`git worktree
   add`), with the diff applied, uncommitted changes included. For a small diff, one subagent is enough. Give each
   the diff, the intent, and this brief: "Break this change. Prove each finding with a run against the real code: a
   failing test, a repro script, or command output. Report the command, its output, and the output the intent
   requires. Leave out anything you didn't run, including style and risks that need a future change."
2. Rerun every reported command yourself. Keep a finding only when the output shows the failure and the failure
   breaks the intent. Merge findings with one root cause.
3. Kept findings go in **Act on** with their command; each one is a ready regression test. List how many were
   dropped and why.
4. No findings is a valid result. Say what was tried.

## 5. Sort the findings

- When a smell and a principle flag the same thing, report it once, under the principle.
- Tag each finding with its axis, then put it in one bucket:
  - **Act on:** real problems with correctness, security, or maintainability. Would block a real PR.
  - **Consider:** legitimate, but fixing now may cost more than it's worth. The user decides.
  - **Noted:** valid but not actionable now.
  - **Dismissed:** wrong, nitpicky, or missing context, with the reason, so the user can overrule it.
- Summarize each axis separately, so a clean Standards result can't hide a Spec failure.
- Done when every finding is bucketed and the report below is delivered.

## Report

```text
Intent: <one paragraph>

Act on
- [Spec] <finding>: <why it matters>
Consider
- [Standards] <finding>: <trade-off>
Noted
- ...
Dismissed
- ...: <reason>

Safe because: <the one fact>, proven by <command/output> | unproven
Outside this diff: <one line each, suggest `improve-code`>
Summary: Spec <n findings, worst>; Standards <n, worst>; Risk <n, worst>
```
