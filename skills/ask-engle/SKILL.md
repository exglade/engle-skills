---
name: ask-engle
description: Suggests the next skill or step from what the user asks, or from the state of the project and conversation when they don't say. Advises only; the user runs the skill. Use when the user asks "what now?", "which skill?", or how to approach something with this collection.
disable-model-invocation: true
license: MIT
---

# Ask Engle

Tell the user what to do next, and why. Suggest; let the user run it.

## 1. Read the situation

- **If the user described a goal or problem,** match it to the map below.
- **If they just asked "what now?",** read the state, cheapest first:
  1. The conversation: what just finished (a grilling, a build, a review).
  2. `git status` and the current branch: uncommitted changes, commits ahead of the main branch.
  3. The work folder, `.scratch/work/`: specs without tickets, tickets by status.
  4. `.scratch/handoff/` for a recent handoff to resume.
- If it's still unclear, ask one question.

## 2. Suggest

- One next step, with a one-line reason and the exact command: `/to-spec` in Claude Code (`/<plugin>:to-spec` when
  installed as a plugin), `$to-spec` in Codex.
- At most one alternative, if it's close.
- Done when the user has a single clear next step.

## State to next step

| State                                                   | Next                                      |
| ------------------------------------------------------- | ----------------------------------------- |
| These skills not set up here (no `.scratch/work/`)      | `setup-engle`                             |
| New to the repo or one part of it, or no context yet    | `map-code`                                |
| An idea or task that's still vague                      | `grill-me`                                |
| Grilling just ended with agreement                      | `to-spec`                                 |
| A spec with no tickets                                  | `to-tickets`                              |
| Open tickets                                            | `implement-spec`, or `implement` for one  |
| All tickets done, or uncommitted changes                | `review-code`                             |
| Reviewed, clean, and committed                          | `pr`                                      |
| A recent handoff in `.scratch/handoff/`                 | Resume from it                            |
| Moving to another session, agent, or person             | `handoff`                                 |
| A long session with corrections, about to end           | `reflect`                                 |

## Request to skill

| The user wants to…                                  | Skill                 |
| --------------------------------------------------- | --------------------- |
| Wire these skills into a project                    | `setup-engle`         |
| Find missing typecheck, lint, test, or CI tooling   | `audit-tooling`       |
| Get the big picture of a repo or one part of it     | `map-code`            |
| Understand how one area of the code works           | `how`                 |
| Know why code is built this way                     | `why`                 |
| Learn a concept, or compare X vs Y                  | `what`                |
| Check facts in docs or source, with citations       | `research`            |
| Feel out logic or a UI before committing to it      | `prototype`           |
| Stress-test a plan or pin down terms                | `grill-me`            |
| Find the cause of a hard bug or slowdown            | `diagnose-bug`        |
| Stress-test a change by trying to break it          | `review-code`         |
| Prove the app works, or update a stale verify skill | `create-verify-skill` |
| Improve working code that's hard to change          | `improve-code`        |
| Check code against a principle (DRY, boundaries…)   | `principles`          |
| Write a pull request description                    | `pr`                  |
| Keep a session's lessons so they don't repeat       | `reflect`             |
| Hear the last answer again, or catch up after away  | `huh`                 |
| Make text plain, or write a README or doc           | `unslop`              |
| Write a skill, AGENTS.md, or a prompt               | `write-for-agents`    |

## Notes

- Manual-only skills run only when typed: `to-spec`, `to-tickets`, `implement-spec`, `grill-me`, `handoff`,
  `improve-code`, `create-verify-skill`, `map-code`, `reflect`, `huh`, `setup-engle`, `audit-tooling`,
  `prototype`, and this one.
