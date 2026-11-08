# Make operations idempotent

**Rule:** Make each state-changing operation safe to run twice, or after a crash halfway. Read the current state,
compare it to the goal, and apply only the difference.

**Why:** Crashes, restarts, and retries are normal. If a half-finished run changes what the next run does, every
restart becomes a debugging session.

**Applies when:** Writing commands, migrations, setup scripts, job handlers, or loops that can be retried.

**Skip when:** The operation is a one-off you run by hand and watch, and a rerun is impossible or harmless.

**Smells:**

- "Run this only once."
- A step that assumes the previous step finished.
- A lock, temp file, or claimed job that the next run can't tell is stale.
- Appending where you meant to set.

**Test:** What happens if it runs twice in a row? If the previous run stopped at any point? Both should end in the
same state.
