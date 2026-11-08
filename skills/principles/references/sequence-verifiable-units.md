# Sequence verifiable units

**Rule:** Break work into small units that each end in a state you can check. Check each before starting the next.
For tests: one test, make it pass, then the next.

**Why:** A break caught at the unit that caused it is cheap to find. Caught after a batch, it's buried under work
built on top of it.

**Applies when:** Multi-step work: a feature built test-first, a sweep of similar edits, a migration, a stack of
commits or PRs.

**Skip when:** The whole change is one small unit already.

**Smells:**

- All tests written first, then all the code. Bulk tests check imagined behavior and lock in a structure before you
  understand it.
- Many edits made, then one check at the end.
- Commits that only make sense together, in no clear order.

**Test:** After each step, could you run one check and see it pass? In history, does the order tell the story: the
failing test, then the fix; removal, then the new shape?
