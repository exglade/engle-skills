# Boundary discipline

**Rule:** Validate and handle errors at system boundaries (CLI args, config, network, external APIs). Trust typed data
inside. Keep business logic in pure functions.

**Why:** Validation scattered everywhere is noisy and gives false safety. Logic tangled with framework code can't be
tested on its own.

**Applies when:** Wiring validation, error handling, or framework adapters.

**Skip when:** Data comes from a source the types can't vouch for, even inside the system (a cache from an older
version, shared memory). That's a boundary too.

**Smells:**

- Null checks deep in call chains for data validated at the edge.
- Transport or database types leaking through the public interface.
- Business rules inside request handlers.

**Test:** Is this data crossing a boundary right now? If not, the validation is redundant. Can this logic be a pure
function the shell calls? If yes, extract it.
