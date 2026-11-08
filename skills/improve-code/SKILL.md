---
name: improve-code
description: Surveys working code for changes that would make it easier to change, test, or follow, ranks them, then grills through the one the user picks. Use when the user wants to improve, refactor, or clean up existing code, or find what's slowing work down in an area. Not for reviewing a diff; use review-code. Not for UI or visual design.
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from mattpocock/skills (improve-codebase-architecture), MIT.
---

# Improve code

Find where working code is hard to work with, and propose changes that make future work easier: lower cost of
change, easier tests, code a person or agent can follow.

Leave the code unchanged here. This skill ends with a chosen candidate and an agreed plan.

## 1. Pick where to look

- If the user named an area, a module, or a pain point, use it.
- Otherwise, find hot spots in recent history (`git log --oneline`, files that change often); improvements pay off
  where code keeps changing.
- Read the project's docs and conventions for the area first.

## 2. Explore

Send a read-only subagent with a fresh context to walk the area. Note where you hit friction:

- Understanding one concept means bouncing between many small modules.
- A module's interface is nearly as complex as its implementation.
- Logic was split out "for testability", but bugs hide in how it's called.
- Modules leak into each other.
- Code that's untested, or hard to test through its current interface.

Judge each suspect with the relevant principles (use the `principles` skill if it's available) and the deletion
test: would deleting it concentrate complexity, or just move it? "Concentrates" is the signal you want.

## 3. Present candidates

Rank them, best first. For each:

- **Title:** names the change ("Collapse the order intake layers").
- **Where:** files and modules involved.
- **Problem:** one sentence on what hurts.
- **Change:** one sentence on what would be different.
- **Wins:** short bullets, including how tests improve.
- **Strength:** Strong, Worth exploring, or Speculative.
- **Goes against:** an ADR or documented decision it would reverse, if any. Say which.

End with your top pick and why. Hold interfaces and code until the user picks; designing every candidate wastes
effort on the ones they'll drop.

Offer to save the list to `.scratch/improve/<date>-<area>.md`.

Then ask which candidate to explore.

## 4. Work through the pick

1. Question the user about the chosen candidate in numbered rounds, each with your recommended answer:
   constraints, dependencies, the new shape, which tests survive.
2. Design it as if the new shape had been there from the start, not bolted on.
3. Done when the plan is agreed. Suggest the next step: `to-spec` for larger changes, `implement` for small ones.
