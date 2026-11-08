# Deep modules

**Rule:** Put a lot of behavior behind a small interface. The interface is everything a caller must know: types,
invariants, ordering, errors, config.

**Why:** A deep module gives callers more for less to learn, and keeps changes and bugs in one place. Tests cross
the same interface as callers, so a small one means fewer, sturdier tests.

**Applies when:** Designing or reshaping a module (a function, class, package, or slice), placing a seam, or making
code easier to test.

**Skip when:** The code is a thin adapter on purpose, such as a wrapper over an external API that only maps names.

**Smells:**

- The interface is nearly as complex as the implementation.
- Understanding one concept means hopping between many small modules.
- A pass-through: deleting it would remove nothing but a hop.
- A seam with only one implementation, added "for testability".
- Tests that need to reach past the interface to check anything.

**Test:** Imagine deleting the module. If complexity reappears across its callers, it earns its keep. If it just
vanishes, it was a pass-through; inline it.
