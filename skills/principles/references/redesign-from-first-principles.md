# Redesign from first principles

**Rule:** When a new requirement arrives, design as if it had been there from the start, then deliver that design
in steps.

**Why:** Bolting a requirement onto a design built without it leaves special cases, flags, and workarounds that
every later change has to step around.

**Applies when:** A new requirement or change of direction touches an existing design, including one recorded in
an ADR or older docs.

**Skip when:** The requirement is a one-off or temporary, or a redesign costs far more than the special case will.
Say that it's a bolt-on and why.

**Smells:**

- A new flag or mode threaded through code that never needed it.
- "Keep the old way working" with no caller that needs it.
- An ADR or old doc kept as a constraint after its reason no longer holds.
- Types, docs, or examples that still describe the design before the change.

**Test:** If you wrote this from scratch with the new requirement, would you build what you're about to build? If
not, what's the step from here toward that design?
