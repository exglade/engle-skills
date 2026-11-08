# Minimize reader load

**Rule:** Reduce what a reader must trace (layers between question and answer) and hold in their head (hidden or
mutable state).

**Why:** Maintainability is the work a reader does to understand code. Line counts and patterns are proxies.

**Applies when:** Code is hard to follow, or you're about to add a layer or state.

**Skip when:** The layer hides a real decision or has two real implementations.

**Smells:**

- Wrappers with one caller. Adapters with one implementation.
- A layer that repeats the methods and arguments of the one below.
- Module-level or global state where a local or a return value would do.

**Test:** Can a new reader answer "where does X come from?" and "what can change X?" in under 30 seconds?
