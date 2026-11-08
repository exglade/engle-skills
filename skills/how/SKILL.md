---
name: how
description: Explains how one area, feature, or flow of a codebase works, covering structure, runtime flow, domain terms, and where code lives. Use when the user asks how something works here, traces a flow, or asks where code should live. Not for an overview of a whole repo or package; suggest the user run /map-code. Not for why it was built that way; use why.
license: MIT
metadata:
  source: Adapted from pstack (how), MIT.
---

# How

Explain one part of the code the way a senior engineer walks a teammate through it: enough for a working mental
model, not a line-by-line tour. Read only; leave the code unchanged.

## 1. Set the scope

- One area: a module, a feature, a flow, "how does X work".
- For a whole repo or package at a high level, suggest `map-code` instead.
- If the scope is unclear, state your reading and start. The user can redirect.

## 2. Explore

- Start with what the project says about itself: README, AGENTS.md or CLAUDE.md, docs, ADRs, glossary.
- Then the facts: manifests, scripts, entry points, the folder layout, config, CI.
- Check recent history (`git log --oneline -30`) for hot spots.
- For a large scope, split it into 2–4 angles, send a read-only subagent on each, and merge their findings yourself.
- Run cheap read-only commands (`--help`, listing tests) when that's faster than reading; real output beats guesses.

## 3. Explain

Use these sections, dropping any that don't apply:

- **Overview:** what it is and who uses it, in two or three sentences.
- **Key concepts:** the domain terms, as the code uses them.
- **How it works:** the main flow, start to end, with a small diagram when it helps.
- **Where things live:** the folders and modules that matter.
- **Try it:** the tests or commands that exercise this area.
- **Conventions:** patterns a newcomer would break.
- **Gotchas:** anything surprising or easy to get wrong.
- **Open questions:** what you couldn't confirm.

Cite real `file:line` locations for claims.

## Finish

1. Offer to save the explanation to `.scratch/notes/<area>.md` so later sessions can reuse it.
2. Done when the user has the explanation, and the saved path if they chose to save.
