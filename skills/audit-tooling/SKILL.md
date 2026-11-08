---
name: audit-tooling
description: Checks whether a project has the tooling agents and people need to work safely (typecheck, lint, format, fast single tests, a full suite, a run command, CI, and hooks), and suggests what fits the stack for each gap. Use when starting on a project, when agents keep missing errors a tool would catch, or when the user asks what tooling is missing. Not for proving a change works; use a verify-* skill or create-verify-skill.
disable-model-invocation: true
license: MIT
---

# Audit tooling

Find what tooling exists, what's missing or weak, and what would fit. Report first; change nothing unless asked.

## 1. Find what exists

Read the repo, not the user: package scripts, Makefile or justfile, tool configs, CI files, hook configs, and what
the README, AGENTS.md, or CONTRIBUTING.md documents.

| Tool                | What good looks like                                        |
| ------------------- | ----------------------------------------------------------- |
| Typecheck           | One command, runs on the whole project, strict settings     |
| Lint                | One command, runs in CI, few disabled rules                 |
| Format              | One command, enforced in CI or a hook                       |
| Single test         | Runs one file or one test in seconds                        |
| Full suite          | One command, passes on the main branch                      |
| Run the app         | One command from a fresh clone, with documented env vars    |
| CI                  | Runs typecheck, lint, and tests on every PR                 |
| Hooks               | Fast checks before commit, if the team wants them           |

Done when each row has a finding, with the command and where it's defined, or "missing".

## 2. Prove the commands run

1. Run each command found, starting with the fastest. Ask before anything slow, destructive, or needing network
   access or secrets.
2. Record pass, fail, or doesn't start, and how long it took.
3. Done when every found command has a result, or a reason it wasn't run.

## 3. Suggest

- For each gap or weak spot: one default that fits the stack and what the project already uses, plus one line on
  why. "Add `tsc --noEmit` as `typecheck`; the project has TypeScript but no typecheck script."
- Rank by how much it helps agents: fast feedback (typecheck, single test) first, polish (hooks) last.
- Flag undocumented commands: a command that works but isn't in the README or AGENTS.md is one agents won't find.

## 4. Report

- One table: tool, status (ok, weak, missing, broken), command, and suggestion.
- Offer to add missing tools or document commands in the project's AGENTS.md or README. Those are team files: ask
  first, and on a team repo it's a team decision.
- Done when the user has the table and has chosen what, if anything, to change.
