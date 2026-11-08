# Fix root causes

**Rule:** Reproduce the bug and trace it to its cause before changing code.

**Why:** Fixing a symptom leaves the cause to strike again somewhere else.

**Applies when:** Fixing any bug.

**Skip when:** It's an emergency mitigation. Ship it, label it as a mitigation, and keep the bug open.

**Smells:**

- A fix that adds a guard at the crash site without knowing why the value was bad.
- Two or more failed fixes in a row. Stop and test the assumption they share (attack-the-premise).
- "Works now" with no reproduction before the fix.

**Test:** Can you name the cause, and show a check that failed before the fix and passes after?
