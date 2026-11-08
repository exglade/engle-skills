# Agent-specific skill options

These change more often than the spec. Each section lists its source and when it was checked. If a detail matters
and the check is old, read the source page first.

## Trigger modes

| Mode | Use for | Claude Code | Codex |
| --- | --- | --- | --- |
| Auto (default) | Building blocks other skills call; skills that should load on a matching request | Nothing to set | Nothing to set |
| Manual only | Entry points the user starts, especially ones that write files or run long | `disable-model-invocation: true` | `agents/openai.yaml`: `policy.allow_implicit_invocation: false` |

- Set both for a manual-only skill, so it behaves the same in each agent.
- A manual-only skill can't be called by another skill; the Skill tool blocks it. Anything that's called stays auto.

## Claude Code

Source: [Skills](https://code.claude.com/docs/en/skills), [Memory](https://code.claude.com/docs/en/memory).
Checked 2026-10-25.

- Every skill is also a slash command: `/name`.
- `skill-creator`: Anthropic's skill for creating, testing, and tuning skills, from
  [anthropics/skills](https://github.com/anthropics/skills). Install it if it's missing.
- `disable-model-invocation: true`: only the user can run it. Its description stays out of context, and it isn't
  preloaded into subagents.
- `user-invocable: false`: hidden from the `/` menu; only Claude can run it. Rarely needed.
- Reads `AGENTS.md` when the project has no `CLAUDE.md`. A nested `AGENTS.md` loads only when Claude opens a file in
  that folder. Name the file in the skill when it must be read.

## Codex

Source: [Build skills](https://learn.chatgpt.com/docs/build-skills). Checked 2026-11-06.

- Run a skill by name with `$name`, or pick one from `/skills`.
- `skill-creator`: built-in skill for creating and updating skills. Run it with `$skill-creator`.
- Reads only `name` and `description` from SKILL.md.
- `agents/openai.yaml` is optional. Add it only to make a skill manual-only, with nothing else in it:

  ```yaml
  policy:
    allow_implicit_invocation: false
  ```

  Its `interface` block (display name, icons) only changes how the skill looks in the ChatGPT app; skip it.

- Turn a skill off for yourself with `enabled = false` under `[[skills.config]]` in `~/.codex/config.toml`.
- Codex docs don't mention `disable-model-invocation`; use `openai.yaml` for Codex.

## Plugins

Sources: [Claude Code plugins](https://code.claude.com/docs/en/plugins-reference),
[Codex plugins](https://developers.openai.com/plugins/build/plugins). Checked 2026-10-23.

- Both use `skills/<name>/SKILL.md` inside the plugin.
- Claude Code: manifest at `.claude-plugin/plugin.json`. Skills are namespaced: `/plugin:skill`.
- Codex: manifest `plugin.json` at the plugin root. Run a plugin or its skill with `@`.
- Each installed plugin gets its own folder, so same-named skills in different plugins don't overwrite each other.
