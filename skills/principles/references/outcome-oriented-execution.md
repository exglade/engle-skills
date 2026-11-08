# Outcome-oriented execution

**Rule:** In a planned rewrite or migration, aim for the end state. Accept planned, scoped breakage in between
instead of writing compatibility code to keep every step smooth.

**Why:** Code that keeps intermediate states working tends to outlive the migration and become debt.

**Applies when:** A planned rewrite or migration with clear phases, on a branch or in code you own.

**Skip when:** Each step ships to users, or others build on the shared branch. Then keep it green with
expand–contract: add the new beside the old, move callers, delete the old.

**Smells:**

- Adapters and shims written only to keep a half-migrated state working.
- A compatibility layer with no planned removal.
- "We'll delete the old path later" with no ticket for it.

**Test:** Is each piece of temporary code needed by a real caller during the change? If not, skip it, say where
breakage is allowed, and verify fully at the end.
