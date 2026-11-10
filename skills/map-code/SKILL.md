---
name: map-code
description: Maps a repo, or one part of it such as a package in a monorepo, and writes an interactive HTML guide covering architecture, a layered stack diagram, main flow, how the folders are organized and why, key terms, conventions, getting started, and how to contribute. Use when someone is new to a codebase or one part of it and wants the high-level fundamentals before diving in. Not for one feature or flow in depth; use how.
disable-model-invocation: true
license: MIT
---

# Map code

Give the whole map before the street view: what this code is, how it fits together, why it's laid out the way it
is, and how to start working in it. Wide and shallow; `how`, `why`, and `what` cover the deep dives. Read only;
leave the code unchanged.

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
3. **Find the layers:** what sits closest to the user, what it calls, and what it rests on (UI, API, domain, data,
   platform). Note which way calls go and any layer the code skips.
4. **Find the folder logic:** what the top folders are split by (feature, layer, package, or a framework convention
   such as Next.js `app/`), and where a new endpoint, page, or model would go. Look for the rule in docs first, then
   infer it from where similar files sit. Note folders that break the rule.
5. **Sample the code for conventions:** a few representative files per main area. For a large scope, send 2–4
   read-only subagents, one per angle (architecture and layers, folder structure and conventions, setup and
   contributing), and merge their findings.

## 3. Write

1. **Write the guide** from [assets/guide.html](assets/guide.html) to `.scratch/map-code/<name>.html`. `<name>` is
   the repo name, plus the path for a part (`shop-packages-billing`). Replace an earlier guide for the same scope.
   If the user asks for Markdown, write the same sections to `.scratch/map-code/<name>.md` instead, with the layer
   bands and the folder tree as nested lists.
2. **Summarize in chat:** the five or six things that matter most, the guide's path, and the suggested deep dives.
   Tell the user to open the file in a browser.
3. Done when the guide is saved, every claim is cited or marked unconfirmed, and the user has the summary.

## Rules

- Short sections, skimmable. A diagram when it says more than a paragraph.
- Cite a `file:line` or file path for conventions and claims; agents and people can check them.
- Tag each reason for a layer or folder `documented` (the project says so, with the source) or `inferred` (read
  from the code). A newcomer needs to know which reasons are the team's and which are your guess.
- Draw only the layers the code has. If it isn't layered, say so in one line instead of forcing bands.
- Mark each command as "from the docs" or "from the scripts". Report commands; leave running them to the user, since
  install and test can be slow or change the machine.
- Say "not found" or "unconfirmed" rather than guessing. Gaps go under Open questions.
- Use the project's own terms. Leave out folders and libraries that don't matter to a newcomer.

## Gotchas

- Write the content as plain HTML in the page, not as data a script renders. Agents and search tools read the file
  as text.
- Escape `<` and `&` in text, code, and Mermaid source (`List&lt;T&gt;`); raw ones break the page.
- Keep the template's styles and script. The script loads Mermaid from a CDN; offline, the diagram source still
  shows as text.
- Add or remove nav links when you add or remove sections, so every link has a target.
