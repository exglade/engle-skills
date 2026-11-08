---
name: implement
description: Builds one ticket from the local work folder, or one brief from implement-spec, end to end, test-first where it's cheap, then reviews and commits it. Use only when the user names a ticket to implement, or when implement-spec hands a brief to a subagent. Not for everyday coding requests or a whole spec; use implement-spec for a spec.
license: MIT
metadata:
  source: Adapted from mattpocock/skills (implement), MIT.
---

# Implement

Build one ticket end to end.

## Before you start

- **Under implement-spec:** the orchestrator's brief is your ticket. Don't read or write the work folder; the
  orchestrator owns it.
- **Working alone:**
  1. Find the ticket in the work folder, `.scratch/work/`.
  2. Read the ticket in full, and the spec in the same feature folder if there is one.
  3. Check every ticket under **Blocked by** is `done`. If one isn't, stop and name it.
  4. Set the ticket's **Status** to `in-progress`.
- Stay inside the ticket's **Boundaries**. If the work needs something they rule out, stop and say so.
- Either way, follow the project's conventions over this skill.

## Build

- Work at the seams the spec or brief agreed. Say so before adding a new one.
- When the code needs something the agreed interfaces don't allow, stop and say so; don't work around it quietly.
  The design may be wrong, or the requirement missed.
- With no spec, list the seams you plan to test (the public interfaces, such as a function or an endpoint) and get
  the user's OK before writing a test. Give each seam one line on what it catches and what it misses. Testing
  effort goes where they choose, not everywhere.
- Write a test first when there's a cheap local way to test the behavior. Watch it fail for the right reason, then
  make it pass. One test at a time, not all tests first.
- Test behavior users can see, not implementation details. Fewer, meaningful tests beat many shallow ones.
- When an existing test blocks a behavior the ticket asks to change, change the test first; don't bend the code to
  pass an outdated test.
- When a test needs heavy setup or brittle mocks, use the closest real check instead (a command, a request, a
  script) and say so. A bad test costs more than no test.
- Run the typecheck and the single test file often. Run the full suite once at the end.
- Use the `principles` skill if it's available, for both the code and the tests. Its index says which ones fit the
  change; `smallest-change` and `prove-it-works` fit every ticket.

## Finish

1. Check each acceptance criterion and show evidence: a test, a command, or output. Confirm the ticket's
   **Boundaries** held. If the project has a `verify-*` skill, use it to prove user-facing behavior on the
   running app.
2. Review your diff, uncommitted changes included, with the `review-code` skill if it's available; otherwise review
   it yourself against the ticket and the Build rules. Fix what you find. Skip this step when implement-spec says so;
   it reviews the whole branch at the end.
3. Commit to the current branch.
4. Working alone, set **Status** to `done`.
5. Done when it's committed and you've reported what changed, the evidence, and anything left open.
