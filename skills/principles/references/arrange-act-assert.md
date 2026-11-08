# Arrange-Act-Assert

**Rule:** Each test has three parts: set up, one act, then check. One behavior per test.

**Why:** A test that acts several times tests several things. When it fails, you can't tell which one broke.

**Applies when:** Writing or reviewing a test.

**Skip when:** A scenario test deliberately walks a user journey. Keep those few, and name them as journeys.

**Smells:**

- Several calls to the code under test in one test.
- Setup calls (API calls, inserts) in the test body, reading like things under test.
- Asserts spread between acts.

**Notes:**

- Several asserts are fine when they check one act (status, body, and header from one call).
- Move setup into named helpers or fixtures, like `givenUserWithCart()`, so the act stands out.
