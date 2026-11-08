# Attack the premise

**Rule:** When two fixes that share one assumption have both failed, stop fixing. Write the assumption down and
test it directly.

**Why:** Each failed fix is evidence against what it assumed. A third fix on the same assumption spends effort
where the evidence says the cause isn't.

**Applies when:** Two or more attempts at a bug, a performance goal, or a failing check have missed the same way.

**Skip when:** The fixes failed for different, already understood reasons.

**Smells:**

- "Let me try one more thing" after two misses.
- Each fix adds a guard or cleanup step instead of removing the cause.
- Nobody can state, in one sentence, what all the fixes assumed.

**Test:** Can you name the shared assumption, and an observation that would come out differently if it were false?
Make that observation before the next fix.
