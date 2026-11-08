# Separate shared state

**Rule:** When several actors write the same thing, first give each its own: its own file, key, branch, or folder,
merged only where it's read. Serialize access only when one shared object is a real requirement, and then with a
structure (a lock, one writer, sequential phases), not an instruction.

**Why:** Concurrent writes cause races that are rare, hard to reproduce, and slow to debug. "Please don't write at
the same time" is not concurrency control.

**Applies when:** Two processes, threads, agents, or jobs might write the same file, record, branch, or state.

**Skip when:** There's only one writer, now and planned.

**Smells:**

- Two workers updating different fields of one shared file.
- "We need a lock" as the first answer.
- Agents told by instructions alone to take turns on a file.

**Test:** Do these actors need one shared object, or are they each publishing their own facts? If their own, split
the write targets.
