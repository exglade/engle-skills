# Model the domain

**Rule:** Put domain rules in a data structure (a state machine, a typed model, a lookup table, a union) instead of
conditionals spread across files.

**Why:** The right structure makes invalid states impossible and deletes branches. It's cheap at write time and
expensive to recover later.

**Applies when:** Writing stateful logic, or code branches on the same thing in several places. Settle the core types
and data shape before writing the logic on top.

**Skip when:** The current code is clear, local, and unlikely to grow. Boring code beats a forced abstraction.

**Smells:**

- A new feature adds one more branch to an existing if/else chain.
- Two booleans that must stay in sync.
- Modules named after steps (load, validate, save) that repeat the same rules.

**Test:** Does the structure remove branches, duplicated rules, or invalid states? If it only adds indirection, drop
it.
