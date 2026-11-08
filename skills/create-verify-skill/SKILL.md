---
name: create-verify-skill
description: Creates a project-specific verify skill that lets any agent launch the app, drive it like a user, and capture proof that a change works, and updates that skill when the app changes. Use when a project has no scripted way to prove UI, CLI, or service behavior, when agents keep claiming done without showing it works, or when an existing verify skill is out of date.
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from pstack (create-verification-skill, maintain-verification-skill), MIT.
---

# Create a verify skill

Generate `verify-<app>`: a skill inside this project that shows an agent how to launch the app, drive it like a
user, and capture evidence. Write it for an agent reading it cold, mid-task, that has never seen the app.

## 1. Study the repo, not the user

Answer these from the code. Ask the user only what you can't observe.

- **Surface:** what does a user touch? Web UI, CLI or TUI, desktop app, API, library. Pick the main one; note others.
- **Run:** how does it start locally? Use the repo's own dev command. Note ports, env vars, seed data, and auth.
- **Drive:** how can an agent use it? Existing harnesses first (Playwright, Cypress, PTY helpers, curl-able
  endpoints). Otherwise a generic recipe: a browser for web, a PTY or tmux session for CLI, HTTP for services.
- **Observe:** what evidence can you capture? Screenshots, transcripts, response bodies, logs, exit codes, DB state.
- **Isolate:** can two instances run side by side (ports, data dirs)? If not, the skill must say so.

If the app doesn't build or start as-is, fix that or report it precisely before generating.

## 2. Write the skill

- Location: the project's skills folder for the agent in use: `.claude/skills/verify-<app>/` for Claude Code,
  `.agents/skills/verify-<app>/` for Codex. If the team uses both, ask which.
- Frontmatter: `name: verify-<app>` and a description naming the app, its surface, and when to use it.
- Sections, each filled from what you found. No placeholders.
  - **Launch:** the exact command, and how to tell it's ready (usable, not just a process answering). Start from an
    empty data dir, including migrations and seed data. Include teardown.
  - **Doctor:** one read-only check that the instance is worth driving: process up, right build, port is ours, auth
    valid.
  - **Drive:** the recipe with real selectors or commands from this repo. Prefer stable handles (ARIA labels, data
    attributes, route paths) over coordinates.
  - **Evidence:** what to capture and where it goes. Drive the real user path, not test-only shortcuts. Capture the
    action and the resulting state. Check side effects (files, rows, messages), not only the screen.
  - **Cleanup:** stop only the processes the run started, by their IDs; killing by name can take down the user's
    own instances. Keep the evidence.
  - **Helpers:** any script the skill ships is executable, with its invocation shown.

## 3. Seed a feature map

- Add `features/README.md` plus one file for each of the top 3–5 user-facing features.
- Each feature file covers: what it is, how a user reaches it, how to drive it, and what end state proves it works.
- If seed data can't support a journey, record why under the feature's gotchas and leave the journey as it is; a
  weakened journey proves nothing.

## 4. Prove the skill works

1. Follow the generated skill end to end once: launch, doctor, drive one feature, capture evidence, clean up.
2. Confirm the evidence survives cleanup.
3. Fix what failed, running cleanup after each failed attempt.
4. Done when one full run passes. A generated skill that was never run is a draft; say which steps stayed unverified.

## 5. Hand over

- Tell the user where the skill is and what it proved.
- Committing it to the project is the user's call. On a team repo, it's a team decision.
- Suggest running this skill again when the app's features change; it updates the existing skill.

## Update an existing verify skill

When a `verify-<app>` skill already exists, update it instead of generating a new one. The feature map goes stale
as soon as the app changes. If there are several verify skills, ask which.

1. **Fix the index.** Read `features/README.md` and the feature files. Fix missing, extra, duplicate, or dead
   entries.
2. **Read the source per feature.** One read-only subagent with a fresh context per feature file, in parallel. Each
   explains how the feature works now, flags where the file no longer matches the code (with `path:line`), and
   returns one recipe to check it live.
3. **Find what's missing.** Look at recent changes for user-facing features with no file. Name a source path before
   calling one missing.
4. **Drive every feature live,** even when the source looks clean. You do all the driving, following the skill's
   own Launch section. Run Doctor before the first drive and after any failed one. Keep evidence through cleanup.
   A feature you can't reach needs the exact blocker (auth, OS, external state) and the route you tried.
5. **Sort what you found:**
   - The file is wrong or missing something: fix the file.
   - The app works but the harness can't drive it: fix the harness, then drive it again.
   - The app is broken: report it to the user. Never change product code or edit the docs to hide it.
6. **Finish** with one of: **clean** (nothing to change), **changed** (one commit of proven fixes to the verify
   skill's folder only), or **blocked** (say exactly what stopped it).
