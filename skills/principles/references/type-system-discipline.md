# Type system discipline

**Rule:** Make the compiler reject impossible states, mixed-up primitives, and unhandled cases.

**Why:** Every state the types forbid is a bug that can't exist and a check you don't write.

**Applies when:** Designing types or signatures in a typed language.

**Skip when:** The language is dynamic, or the project doesn't use these patterns. Don't fight the codebase's style.

**Smells:**

- Two arguments of the same primitive type that mean different things (`userId`, `orderId`).
- External data (JSON, env vars, rows) used without parsing into a type.
- Hand-written types that copy a schema the project already owns.
- A `switch` over variants with no exhaustiveness check.

**Test:** Can you write a value that type-checks but makes no sense in the domain? If so, tighten the type.
