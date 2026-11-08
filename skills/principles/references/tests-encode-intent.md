# Tests encode intent

**Rule:** A test records what the code should do. When the intent changes, change the test first, then the code.

**Why:** Agents often "fix" code to satisfy an outdated test, locking in behavior that was meant to change.

**Applies when:** A test fails during a change, or a fix touches a test.

**Skip when:** Never. This one always holds.

**Smells:**

- Code bent into an odd shape so an old test passes.
- An assertion loosened with no change in requirements.
- A test deleted or skipped to get green.
- Many tests that only restate the code (tautological tests).

**Test:** For each test you change, can you name the requirement change behind it? If not, the code is wrong, not
the test.
