---
name: setup-engle
description: Wires this skill collection into the current project by keeping .scratch/ out of git and creating the work folder for specs and tickets. Safe to run again. Use when the user starts using these skills in a project or wants to change that wiring. Not for the project's own build, test, or lint tooling; use audit-tooling.
disable-model-invocation: true
license: MIT
---

# Setup Engle

Wire the collection into this project. Skills work without it; this makes the one choice up front.

## Rules

- Safe to run again: read what exists first. Never add a second `.scratch/` line to an ignore file.
- Write only inside `.scratch/` and to the ignore file the user picks. Team files are the team's.
- Everything the skills make for their own use (specs, tickets, notes, handoffs) goes in `.scratch/`, so the repo
  stays clean. Don't offer a work folder outside it.

## 1. Keep `.scratch/` out of git

1. Run `git check-ignore -q .scratch/`. If it's already ignored, say so and move on.
2. Ask how to keep `.scratch/` out of git:
   - **Only for me** (default): add `.scratch/` to the file `git rev-parse --git-path info/exclude` prints. The team
     never sees it. In a worktree `.git` is a file, so a literal `.git/info/exclude` breaks.
   - **For everyone:** add `.scratch/` to `.gitignore`. It's a team file, so say so; on a team repo it's their call.
   - **Don't ignore it:** change nothing.
3. Done when `git check-ignore` matches the user's choice.

## 2. Create the work folder

1. Create `.scratch/work/` if it doesn't exist. Specs and tickets go there.
2. Done when the folder exists.

## 3. Suggest next steps

Suggest these; they're manual, so the user runs them.

- `/audit-tooling` when the project's typecheck, lint, or test commands are missing or unclear.
- `/create-verify-skill` when there's an app to run and no `verify-*` skill yet. Look in the project's
  `.claude/skills/` and `.agents/skills/`.

## 4. Report

- List what changed, what was already in place, and what was skipped.
- Done when the user has that list.
