---
name: map-code
description: Maps a repo, or one part of it such as a package in a monorepo, and writes a reader-friendly guide covering architecture, main flow, stack, layout, key terms, conventions, getting started, and how to contribute, with diagrams. Use when someone is new to a codebase or one part of it and wants the high-level fundamentals before diving in. Not for one feature or flow in depth; use how.
disable-model-invocation: true
license: MIT
---

# Map code

Give the whole map before the street view: what this code is, how it fits together, and how to start working in it.
Wide and shallow; `how`, `why`, and `what` cover the deep dives. Read only; leave the code unchanged.

## 1. Set the scope

- The user's path or package name sets the scope: a monorepo package, a service, a top-level folder. No path means
  the whole repo.
- For a part, also read what applies from the repo root: shared tooling, CI, and conventions. Say which are inherited.
- If a scope is too big to map well, such as a monorepo with many unrelated packages, map the top level and list
  the parts worth their own run under Where to go next.

## 2. Explore

1. **Read what the project says about itself:** README, AGENTS.md or CLAUDE.md, CONTRIBUTING.md, docs, ADRs,
   glossary, CODEOWNERS. Check both the scope's folder and the repo root.
2. **Read the facts:** manifests, lockfiles, scripts, config, CI workflows, entry points, the folder layout, and
   recent history (`git log --oneline -30 -- <scope>`).
3. **Sample the code for conventions:** a few representative files per main area. For a large scope, send 2–4
   read-only subagents, one per angle (architecture, conventions, setup and contributing), and merge their findings.

## 3. Write

1. **Write the guide** from [assets/guide.md](assets/guide.md) to `.scratch/map-code/<name>.md`. `<name>` is the
   repo name, plus the path for a part (`shop-packages-billing`). Replace an earlier guide for the same scope.
2. **Summarize in chat:** the five or six things that matter most, the guide's path, and the suggested deep dives.
3. Done when the guide is saved, every claim is cited or marked unconfirmed, and the user has the summary.

## Rules

- Short sections, skimmable. A diagram when it says more than a paragraph.
- Cite a `file:line` or file path for conventions and claims; agents and people can check them.
- Mark each command as "from the docs" or "from the scripts". Report commands; leave running them to the user, since
  install and test can be slow or change the machine.
- Say "not found" or "unconfirmed" rather than guessing. Gaps go under Open questions.
- Use the project's own terms. Leave out folders and libraries that don't matter to a newcomer.
