# Don't repeat yourself

**Rule:** Each piece of knowledge, such as a business rule, has one source of truth.

**Why:** Copies drift. A fix lands in one copy and not the other.

**Applies when:** The same rule appears in two or more places and must change together.

**Skip when:**

- Code looks alike but changes for different reasons. Merging it couples unrelated things.
- It's only the second copy. Wait for the third (rule of three).
- The shared abstraction would be harder to read than the copies. Duplication beats the wrong abstraction.

**Smells:**

- One logical change forces edits in many files.
- A bug fixed in one place and still present in its copy.

**Test:** If one copy changes, must the others change too? Only then extract.
