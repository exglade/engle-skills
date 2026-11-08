---
name: write-for-agents
description: Style rules for documents agents read, such as a skill's SKILL.md, its description and references, AGENTS.md, CLAUDE.md, and prompts. Use whenever creating, editing, or reviewing one, even for a one-line change to a rules file or a skill description. Not for docs people read; use unslop.
license: MIT
---

# Write for agents

Agents read every line, every time. Write so the agent takes the same path every run, and a person can edit one
section without reading the rest.

## When to read more

- Writing or editing a skill: also read [references/writing-skills.md](references/writing-skills.md).
- Setting agent-specific options (manual-only skills, Codex metadata, plugins): read
  [references/agent-options.md](references/agent-options.md).

## Wording

- Plain words, short sentences. "Use", not "utilize". No filler, no flourish.
- Imperative instructions: "Read the ticket", not "You may want to read the ticket".
- Only what the agent doesn't already know. Test each line: would the agent get this wrong without it? If not, cut
  it.
- Moderate detail. Cover the common path; leave rare edge cases to the agent's judgment. Exhaustive instructions
  send agents down paths that don't apply.
- Say what to do. Use "never" only for hard guardrails, and pair it with what to do instead.
- Give each non-obvious rule its reason, in the same file. Agents generalize from the reason, and installed skills
  don't ship with design docs. One clause, not a paragraph: "Keep subagents out of the work folder; worktrees don't
  contain `.scratch/`."
- Normal emphasis. "Use X when…", not "CRITICAL: you MUST". Strong wording makes current models over-apply rules.
  If a rule doesn't take, explain why or pick a sharper word ("relentless" over "thorough"), not capitals.
- One term per concept, used everywhere. Pick "ticket" and keep it; agents read synonyms as different things.
- Give a default, not a menu: one way, plus an escape hatch for the exception.
- Prefer one familiar word over a description of it: "tight loop", "tracer bullet", "frontier".
- Concrete examples over abstract descriptions.
- Teach the method for a class of problems, not the answer to one case.

## Structure

- One topic per `##` section, with a sentence-case heading. Keep sections short so edits stay local.
- **Steps:** numbered, in order, each ending with a done condition the agent can check. When coverage matters, make
  it exhaustive: "every caller updated", not "update the callers".
- **Reference:** bullets or tables, consulted on demand.
- Keep each rule next to its reason and caveats, under one heading.
- One meaning, one place. Copies drift.
- Leave out what the agent can look up (scripts, config, folder layout). Write down what it can't: unwritten
  conventions, reasons, gotchas.
- When pointing to another file, say when to read it: "Read `x.md` if the API returns an error", not "see `x.md`".
- Forward slashes in paths.

## AGENTS.md and CLAUDE.md

- Only what applies to most tasks in the repo. Everything else goes in a doc with a pointer line.
- Each pointer says what the doc is and when to read it.
- Prune stale lines whenever you touch the file; stale lines pile up because adding feels safer than removing.
