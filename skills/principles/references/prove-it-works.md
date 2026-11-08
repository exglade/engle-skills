# Prove it works

**Rule:** Check the real thing before calling work done: run the feature, read the actual value, inspect the output.

**Why:** "It compiles" and "tests pass" are proxies. Acting on a wrong guess costs more than checking.

**Applies when:** Before reporting any task as done.

**Skip when:** Never skip it. Scale it: a typo fix needs a glance, a feature needs a run.

**Smells:**

- "Should work" or "looks right" with no evidence.
- Trusting a cached value, a log timestamp, or a subagent's report without checking.

**Test:** Can you show the evidence: a command and its output, a screenshot, a test run? Prefer a script a reviewer
can re-run.
