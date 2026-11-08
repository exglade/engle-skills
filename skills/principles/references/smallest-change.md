# Smallest change

**Rule:** Make the smallest change that solves the problem. Remove before you add.

**Why:** Every added line is one more to read, test, and maintain. Deleting dead weight first makes the real change
simpler.

**Applies when:** Sizing a diff, refactoring, or tempted to add an abstraction, option, or guard.

**Skip when:** The small change leaves a known trap for the next person. Then fix the trap, and say why the diff grew.

**Smells:**

- Abstractions or parameters for needs the spec doesn't have.
- Guards and validators beyond what's required.
- Unrelated cleanup mixed into a fix.
- New code built on top of dead code that should have been removed first.

**Test:** Could you delete a line of this diff and still solve the problem? Then delete it.
