# Writing a skill

Style preferences for skills. The format and the authoring process come from `skill-creator` and the
[Agent Skills specification](https://agentskills.io/specification); this file only adds what they leave open.
Agent-specific options are in `agent-options.md`.

Use `skill-creator` for the process (`$skill-creator` in Codex; `/skill-creator` in
Claude Code, or `/<plugin>:skill-creator` when installed as a plugin). Use the two together: skill-creator runs
the process and doesn't cover style; apply these rules to what it writes. Where they differ on style, these win.

## Scope

- A skill earns its place when the agent can't do the job well alone. Agents rarely load skills for simple one-step
  tasks anyway.
- One coherent job, like a well-scoped function. Too narrow and several skills load for one task; too broad and it
  triggers at the wrong times.

## Frontmatter

| Field           | Rule                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------ |
| `name`          | Required. 1–64 chars, `a-z0-9` and single hyphens, no leading or trailing hyphen. Matches the folder |
| `description`   | Required. 1–1,024 chars. See Descriptions                                                  |
| `license`       | Optional. A license name, or a bundled license file                                        |
| `compatibility` | Optional, max 500 chars. Only if the skill needs a specific product, tool, or network access |
| `metadata`      | Optional. String keys and values                                                           |
| `allowed-tools` | Optional, experimental. Space-separated pre-approved tools; support varies by agent        |

- Agents add their own fields, like `disable-model-invocation`. See `agent-options.md`.
- Quote a value that contains `: `; YAML breaks on it.

## Names

- Clear and accurate first: the name says what the skill does or produces. `to-tickets` splits work into tickets;
  `ticket` could mean making one.
- Short, once it's clear.
- Reuse another collection's skill name only to replace that skill on purpose; flat installs overwrite same-named
  skills.

## Descriptions

- Shape: "What it does. Use when…. Not for…".
- No "I" or "you".
- All "when to use" goes here, not in the body; the agent only sees the description when deciding.
- Front-load the words a user actually types. One phrase per situation; skip synonyms.
- Be a little pushy: agents tend to under-load skills. Cover requests that don't name the topic: "even without
  saying 'tickets'".
- Add "Not for…" only when a sibling skill shares keywords: "Not for code in this repo; use `how`."

Example:

```yaml
description: Splits a spec or plan into thin tickets that list what blocks them. Use when the user wants work broken
  down, sliced, or planned into tickets, even without saying "tickets". Not for writing the spec; use to-spec.
```

## Body

- Start with one or two lines on what the skill does.
- Then one `##` section per topic: steps, rules, output format.
- Match strictness to risk: state the goal and let the agent choose where many approaches work; give the exact
  command where a step is fragile.
- Add a **Gotchas** section for concrete mistakes the agent makes without being told. Keep it in `SKILL.md`; the
  agent may not know when to open a separate file for it. When you correct an agent, add the correction here.
- If the agent writes the same helper logic on every run, bundle it as a script in `scripts/`.
- Workflow skills end with a step that checks the result works. Rule and reference skills don't need one.
- Write only for the agent running the skill. Notes for maintainers, such as how to add a reference file or "keep this in
  sync with the README", go in the source repo's docs; an installed skill runs in other projects, where "the README" means
  theirs.

## Links between skills

- Name the other skill and give a fallback: "Use the `review-code` skill if it's available; otherwise…".
- Link only to files in the skill's own folder; install paths differ between agents.
- A skill that others call must stay auto-triggered. See `agent-options.md`.
- Defer to the project: its conventions beat the skill.
- Borrowed text: check the license before copying.
