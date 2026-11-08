# Make the easy path right

**Rule:** Shape the code so the change that looks right from one file is right for the whole repo. Leave one way to do
each task, and make the wrong way fail to build.

**Why:** The next contributor is often an agent that sees only the files it opened, copies the nearest example, and
takes the shortest path that compiles. Whatever the code makes easy is what gets copied.

**Applies when:** Designing a module or interface, reviewing a diff that adds a second way to do something, or
asking why agents keep repeating the same mistake in one area.

**Skip when:** A short-lived duplicate is part of a planned migration (expand–contract), with the removal already
scheduled. Or the code is a throwaway prototype.

**Smells:**

- **Two ways to do one task:** an old and a new helper both in use. Each keeps gaining callers. Keep one, move the
  callers, delete the other in the same change.
- **Importable internals:** a caller can import a module's private parts, so they become its interface. Make them
  unreachable from outside, so the import fails the build.
- **Hand-synced lists:** adding an item means editing several lists, and an agent updates only the one it sees.
  Derive the others from one list, or make the build fail when they disagree.
- **Split ownership:** two modules write the same state, or each keeps its own copy. Give the state one owner; others
  read it or ask the owner to change it.

**Test:** Pick a likely change and imagine making it from the first file an agent would open. If the obvious edit
there leaves something else silently wrong, the design needs a single owner, a single list, or a build error.
