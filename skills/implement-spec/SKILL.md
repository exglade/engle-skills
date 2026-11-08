---
name: implement-spec
description: Builds a whole spec from the local work folder by running its tickets through parallel subagents, each in its own worktree, merged onto one integration branch. Use when the user wants a spec implemented end to end after to-spec and to-tickets. Not for a single ticket; use implement.
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from mattpocock/skills (implement-spec), MIT.
---

# Implement spec

You are the orchestrator. Get every ticket in the spec built and merged onto one **integration branch**.

## Key ideas

- The tickets are a **task graph**, not a list. The **frontier** is every `open` ticket whose blockers are all
  `done`.
- You own the work folder. Only you read tickets and change their **Status**, from the main checkout.
- Subagents never touch the work folder. An ignored folder doesn't exist in their worktrees, and two agents writing
  one file collide.
- Start every subagent with a fresh context, not a copy of this conversation. Give it a **brief** with everything
  it needs: the ticket's text, the relevant parts of the spec, notes, and the commits it builds on.
- **Work folder:** `.scratch/work/`.

## Steps

1. **Read** the spec and every ticket in `<work folder>/<feature>/`, and build the task graph. If a blocker points to
   a missing ticket, stop and ask.
2. **Explore (optional).** If tickets need shared research, run one exploration subagent first. It reports back;
   you save its notes to `<work folder>/<feature>/notes/`.
3. **Create the integration branch** from the current branch, following the project's branch naming; otherwise name
   it `<feature>`.
4. **Start the frontier.** For each frontier ticket:
   - Set its **Status** to `in-progress`.
   - Start an implementer subagent in the background, in its own worktree and branch, based on the integration
     branch.
   - Pass it the ticket's brief. Tell it to build with the `implement` skill, skip its review step, and merge the
     integration branch tip into its branch before reporting done.
5. **Merge as each one finishes,** using a merger subagent. On a conflict it can't resolve safely, stop and ask the
   user.
6. **Update and repeat.** Set the ticket to `done`, recompute the frontier, and start subagents for newly unblocked
   tickets.
7. **Review the whole branch** once every ticket is `done`, against the branch you started from. This is the only
   review; reviewing tickets alone misses how they fit together. Use the `review-code` skill if it's available;
   otherwise review the full diff against the spec. Fix the **Act on** findings in one implementer subagent. Bring
   **Consider** findings to the user instead of fixing them; a reviewer always finds something, and fixing every
   finding adds layers and tests nobody needs.
8. **Clean up** every subagent worktree.
9. Done when every ticket is `done`, the Act on findings are fixed, and you've reported the integration branch, each
   ticket's outcome, and anything left open.

## Rules

- Keep everything local. Push, open a PR, or touch a team tracker only when the user asks.
- If a ticket fails twice, stop that branch of the graph and report it. Keep unrelated tickets going.
- Without subagents or worktrees, build the tickets yourself one at a time in frontier order, with the `implement`
  skill.
