---
name: principles
description: Engineering principles for writing, reviewing, and improving code, each with when it applies and when to skip it. Use when writing or reviewing code, judging whether tests are worth keeping, shaping a design, planning a migration, finding why agents keep copying a wrong pattern, debugging after failed fixes, trusting a benchmark, or when the user names a principle such as DRY, boundaries, or test behavior.
license: MIT
metadata:
  source: Adapted from pstack (principles, architect), MIT.
---

# Principles

Heuristics, not laws. Each file says when the principle applies, when to skip it, and the smells that suggest it's
being broken.

## How to use

- If the user names principles, use only those.
- Otherwise, pick the two to four most relevant to the code at hand; applying all of them buries the findings that
  matter.
- Project conventions win. If the project documents a rule that conflicts, follow the project.
- Skip any principle the user's or the project's rules turn off, such as a line in AGENTS.md or CLAUDE.md like
  "Principles off: dont-repeat-yourself, smallest-change". Say which ones you skipped.
- Check the skip-when line first, then report a finding as "this looks like X, because Y", not as a violation.

## Index

### Tests

| Principle                                                | Reach for it when                             |
| -------------------------------------------------------- | --------------------------------------------- |
| [test-behavior](references/test-behavior.md)             | Writing, changing, or judging a test          |
| [arrange-act-assert](references/arrange-act-assert.md)   | A test does several things or is hard to read |
| [tests-encode-intent](references/tests-encode-intent.md) | A test blocks a change, or a fix edits a test |

### Design

| Principle                                                      | Reach for it when                            |
| -------------------------------------------------------------- | -------------------------------------------- |
| [model-the-domain](references/model-the-domain.md)             | Branching grows, booleans must stay in sync  |
| [deep-modules](references/deep-modules.md)                     | Shaping a module's interface or a seam       |
| [boundary-discipline](references/boundary-discipline.md)       | Wiring validation, errors, or adapters       |
| [type-system-discipline](references/type-system-discipline.md) | Designing types or signatures                |
| [minimize-reader-load](references/minimize-reader-load.md)     | Code is hard to trace                        |
| [dont-repeat-yourself](references/dont-repeat-yourself.md)     | The same rule or logic appears twice         |
| [make-operations-idempotent](references/make-operations-idempotent.md) | A command or job can be retried or crash halfway |
| [separate-shared-state](references/separate-shared-state.md)   | Several actors write the same thing          |
| [make-the-easy-path-right](references/make-the-easy-path-right.md) | Agents keep copying the wrong pattern    |

### Changing code

| Principle                                                                      | Reach for it when                        |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| [smallest-change](references/smallest-change.md)                               | Sizing a diff, tempted to add layers     |
| [redesign-from-first-principles](references/redesign-from-first-principles.md) | A new requirement meets an old design    |
| [sequence-verifiable-units](references/sequence-verifiable-units.md)           | Multi-step work, test-first, commit order |
| [outcome-oriented-execution](references/outcome-oriented-execution.md)         | A planned rewrite or migration           |

### Debugging and proof

| Principle                                              | Reach for it when                          |
| ------------------------------------------------------ | ------------------------------------------ |
| [fix-root-causes](references/fix-root-causes.md)       | Fixing a bug                               |
| [attack-the-premise](references/attack-the-premise.md) | Two fixes on one assumption have failed    |
| [explain-the-number](references/explain-the-number.md) | Trusting or reporting a measured number    |
| [prove-it-works](references/prove-it-works.md)         | Before calling any task done               |
