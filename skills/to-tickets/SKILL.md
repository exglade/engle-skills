---
name: to-tickets
description: Splits a spec, plan, or the current conversation into thin vertical tickets in the local work folder, each listing the tickets that block it. Use when the user wants work broken down, sliced, or planned into tickets, even without saying "tickets". Not for writing the spec; use to-spec.
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from mattpocock/skills (to-tickets), MIT.
---

# To tickets

Split the work into **tickets**: thin vertical slices, each listing the tickets that **block** it.

## Work folder

- The work folder is `.scratch/work/`. Tickets are working files; `.scratch/` keeps them out of the team's repo.
- Keep work local. Publish to a team tracker only when the user asks.
- Tickets go in `<work folder>/<feature>/tickets/`. If a spec exists, use its `<feature>` folder.

## Steps

1. **Gather context** from the conversation. If the user passes a spec path, read it in full.
2. **Explore the codebase** if you haven't. Use the project's own terms and follow its conventions.
   Look for prefactoring: make the change easy, then make the easy change.
3. **Find shared contracts.** Decide whether several slices will build on the same new types, interfaces, or
   module. If so, plan a sketch ticket first; see Sketch first below. Otherwise skip this step.
4. **Draft slices** by the slice rules below. Give each ticket its blockers; a ticket with none can start at once.
   Give each its **Boundaries**: other tickets' work it must leave alone, and what must stay as it is. Parallel
   tickets need it most; it keeps them out of each other's way.
5. **Check with the user.** Show a numbered list of titles, blockers, and what each delivers, plus the sketch's
   call sites and signatures if there is one. Ask whether the size is right, whether each blocker really gates its
   ticket, and whether any should merge or split. Repeat until the user approves.
6. **Write one file per ticket** at `tickets/<NN>-<slug>.md` from [assets/ticket.md](assets/ticket.md). Number from
   `01` in dependency order, blockers first. Separate files let subagents each take one.
7. Done when every approved ticket has its file and the user has the folder path.

## Sketch first

When parallel slices share new types or interfaces, each agent would invent its own version and the merges would
conflict. Settle the contract in one ticket that blocks them.

- Sketch it while drafting: write two or three call sites the way a caller would, then the types and signatures
  they imply. Try a second, structurally different shape and keep the one with the smaller interface that hides more.
- Write the sketch into ticket `01`'s Sketch section. Building ticket `01` turns it into real code with stub bodies
  (`not implemented`), committed and compiling. Its acceptance criteria name the types and signatures.
- Every slice that uses the contract is blocked by it.
- Skip it when the slices don't share new code, or there's only one slice.

## Slice rules

- Each slice cuts through every layer it needs (schema, API, UI, tests), not one layer at a time.
- Each slice can be shown or checked on its own.
- Each slice fits in one fresh context window.
- Prefactoring comes first.
- For more, use the `principles` skill if it's available: `sequence-verifiable-units` for slicing and order,
  `deep-modules` for the sketch.

## Wide refactors

A wide refactor is one mechanical change that breaks many call sites at once, like renaming a column. No vertical
slice can land green, so use **expand–contract**:

1. **Expand:** add the new form beside the old. Nothing breaks.
2. **Migrate:** move callers over in batches (per package or directory). Each batch is a ticket blocked by expand.
3. **Contract:** delete the old form. This ticket is blocked by every migrate batch.

If batches can't stay green alone, keep the order but have them share an integration branch, all blocking a final
integrate-and-verify ticket.

## Gaps in the spec

- When the spec leaves a detail open (an output format, an edge case), pick the likely answer, write it into the
  ticket's acceptance criteria as an assumption, and list it at the check-in so the user can overrule it.
- Leave the spec as it is; send the user back to `to-spec` only for gaps that change the plan.

## Rules

- Tickets keep a stable ID (`NN`) and a status: `open`, `in-progress`, or `done`.
- Describe behavior, not file paths or code; both go stale.
- Exceptions: the sketch ticket's types and signatures, and a prototype snippet that pins a decision better than
  prose. Keep only the decision-rich part and say where it came from.
