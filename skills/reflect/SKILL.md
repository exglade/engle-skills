---
name: reflect
description: Looks back on a session for corrections, repeated mistakes, and friction, then proposes where each lesson should live so the next session gets it right, from a check or test down to a one-line rule or a skill edit. Use when the user says reflect, retro, "remember this", or wants a session's lessons kept. Not for summarizing a session to continue it; use handoff.
disable-model-invocation: true
license: MIT
---

# Reflect

Turn what went wrong or slow in a session into changes that stop it happening again. Propose; write only what the
user approves.

## 1. Read the session

- Default to the current conversation. Use another session's transcript only when the user points to it.
- Skip a trivial session. Say so and stop.

## 2. Find lessons

Look for these, strongest signal first:

- **Corrections:** a rejected tool call with a reason; "no, use X"; "actually…"; "X, not Y"; "remember: …".
- **Repeats:** the same mistake or correction twice, in this session or already noted in the agent's rules.
- **Friction:**
  - Slow to find a file or fact.
  - A missing check that would have caught a mistake.
  - Wasted or expensive tool calls.
  - Information the agent couldn't reach.
- **Repeated requests:** the same multi-step ask across sessions, a candidate for a skill.

Keep only lasting rules. Drop questions, one-off tasks, and vague feedback.

## 3. Pick where each lesson lives

Fix it at the highest level that works; text is the weakest fix, since nothing fails when an agent skips it.

1. **Structure:** remove the wrong path. One owner for each piece of state, one way to do each task, dead code
   deleted.
2. **Types:** make the bad state impossible to write.
3. **Check:** a lint, script, hook, permission rule, or CI step whose error names the fix. Use it for any rule
   with no exceptions; a rule line only works if the agent remembers it.
4. **Test:** one that fails on the real past mistake.
5. **Skill edit:** the lesson came up while a skill ran, so it belongs in that skill.
6. **Rule line:** one imperative line in the right file, last.

For a rule line, pick the scope:

| Scope                    | File                                                  |
| ------------------------ | ----------------------------------------------------- |
| All my projects          | `~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`           |
| This project, the team   | The project's AGENTS.md or CLAUDE.md; ask first       |

## 4. Check for duplicates

- Search each target file for the same rule before proposing it.
- If one exists, propose merging or replacing, not adding.
- A rule that exists but was broken again is a repeat: move it up a level.
- Flag a rules file over about 150 lines and suggest trimming it.

## 5. Propose, then apply

1. List the lessons, most costly first. For each: the evidence (a quote or event), the level, the target, and the
   exact text or change.
2. Wait for the user to pick. Apply only the picked ones.
3. Write rule lines as one imperative bullet: "Use X for Y", not "X is better".
4. For a skill edit, change the skill's source, not an installed copy; say where the source lives.
5. For a check or test, prove it fails on the past mistake.
6. Done when the picked changes are applied and you've listed each one and its file.
