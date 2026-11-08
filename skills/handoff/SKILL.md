---
name: handoff
description: Compacts the current conversation into a handoff document so a fresh session, another agent such as Codex or Claude Code, or a colleague can pick up the work. Use when the user wants to continue elsewhere, switch agents, or pass work on.
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from mattpocock/skills (handoff), MIT.
---

# Handoff

Write a document a fresh agent can start from cold.

## Steps

1. If the user said what the next session is for, shape the document around that.
2. Write `.scratch/handoff/<date>-<slug>.md` with:
   - **Goal:** what the work is for, in one or two lines.
   - **Done so far:** decisions and results, with their reasons.
   - **Next:** the remaining steps, first one first.
   - **Open questions:** anything unsettled.
   - **Pointers:** paths or links to specs, tickets, ADRs, commits, and branches.
   - **Suggested skills:** which skills the next agent should use.
3. Tell the user the path, and a one-line prompt to start the next session with.

## Rules

- Point to artifacts that already exist (specs, tickets, ADRs, diffs) instead of copying them.
- Redact secrets, keys, and personal data.
- Write for an agent with no context: name files and branches in full.
