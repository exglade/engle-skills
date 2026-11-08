---
name: to-spec
description: Writes the plan agreed in the conversation as a spec in the local work folder, without interviewing again. Use when the user wants a plan written up, a spec drafted, or the outcome of a grilling session captured. Not for splitting work into tickets; use to-tickets.
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from mattpocock/skills (to-spec), MIT.
---

# To spec

Write down what you and the user already agreed. If something important is still open, name it and suggest
`/grill-me` first; a spec built on a guess sends the build the wrong way.

## Work folder

- The work folder is `.scratch/work/`. Specs are working files; `.scratch/` keeps them out of the team's repo.
- Keep work local. Publish to a team tracker or the project's docs only when the user asks.
- The spec goes in `<work folder>/<feature>/spec.md`. Pick a short kebab-case `<feature>` slug.

## Steps

1. Explore the codebase if you haven't. Use the project's own terms and follow its conventions.
2. Sketch the test seams and check them with the user, with one line per seam on what it catches and what it
   misses. Prefer existing seams and the highest one that works; fewer
   seams mean fewer, sturdier tests. Use the `principles` skill if it's available: `test-behavior` and
   `deep-modules`.
3. Write `spec.md` from [assets/spec.md](assets/spec.md).
4. Done when the spec is written and you've told the user its path.

## Rules

- The spec is a working document for this piece of work, not the long-term record.
- Describe modules and behavior, not file paths or code; both go stale.
- Exception: a prototype snippet that pins a decision better than prose (a schema, a type, a state machine). Keep
  only the decision-rich part and say it came from a prototype.
- User stories cover every behavior, with no padding.
