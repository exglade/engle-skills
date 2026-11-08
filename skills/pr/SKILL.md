---
name: pr
description: Writes a pull request title and body that a reviewer understands in a minute, with the smallest picture that explains the change, evidence it works, and its risk, poured into the repo's own PR template when there is one. Use when the user asks for a PR, a PR description, or to open or update a pull request. Not for reviewing a diff; use review-code.
license: MIT
metadata:
  source: Adapted from mattpocock/skills (pr), MIT.
---

# PR

Write for a reviewer who has the diff but not your context. They should know why, what, and how risky in a minute.

## 1. Gather

- Read the full diff against the base branch, the commits, and the spec or ticket if there is one.
- Find the format, first match wins:
  1. The repo's PR template (`.github/pull_request_template.md`, `.github/PULL_REQUEST_TEMPLATE/`, `docs/`).
  2. PR rules in the project's AGENTS.md, CLAUDE.md, or CONTRIBUTING.md.
  3. Default: [assets/pr.md](assets/pr.md).
- Fill the repo's sections with the content below. Keep their headings and order; drop only what they mark optional.

## 2. Write the content

- **Why first:** the problem and the approach in 1–3 sentences. No preamble.
- **One picture:** the smallest view that makes the change clear. Pick one or two from
  [references/pictures.md](references/pictures.md), placed next to the sentence it supports.
- **Evidence:** before and after.
  - A screenshot for visual changes.
  - Otherwise a test or command that failed before and passes after, with its output.
  - If you couldn't show before, say why.
- **Risk:**
  - **Door:** one-way (hard to undo: data, migrations, public APIs) or two-way (a revert undoes it).
  - **Blast radius:** who or what else it touches.
- **Scope:** what it covers and what it leaves out on purpose.
- **Trade-offs:** only alternatives a reviewer would ask about. Skip when there was no real choice.

## 3. Style

- Short, plain sentences. Bullets over paragraphs.
- Name a code symbol or path only when it carries the change. Name both sides of a rename.
- Use the project's own terms.
- Keep it under about 40 lines. Long logs, file-by-file lists, and raw output go in a linked file or a collapsed
  `<details>` block.
- Title: follow the repo's convention; otherwise `<type>: <what changed>`, imperative, under 70 characters.
- Check the prose with the `unslop` skill if it's available.

## Finish

1. Show the title and body to the user.
2. Create or update the PR only when the user asks, with the repo's tool (`gh`, `glab`, or the agent's PR tool).
3. Done when the user has the text, or the PR link if you opened it.
