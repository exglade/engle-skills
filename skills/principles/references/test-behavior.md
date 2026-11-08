# Test behavior, not implementation

**Rule:** Assert what the code's users can observe: return values, errors, state they can read back, and effects
outside the code (a request sent, a row written).

**Why:** Tests pinned to internals break on every refactor and still miss real bugs.

**Applies when:** Writing, changing, or keeping any test.

**Skip when:** The internal detail is the contract, such as a payload sent to an external service, or an invariant
like a key that must exist in two tables.

**Smells:**

- Asserting a private helper was called, or internal call order.
- Mocking the module's own internal collaborators instead of what's outside it.
- Checking through a side channel, such as querying the database, when the interface can show the result.
- The expected value comes from running the code under test, or recomputes it the way the code does. Take expected
  values from an independent source: a known-good literal, a worked example, the spec.
- Asserting data the test built itself.
- Checking an exact error message no caller reads.

**Test:** Imagine two edits. Break the behavior: the test must fail. Restructure the internals without changing
results: the test must pass. Keep tests that do both. Rewrite or delete the rest.
