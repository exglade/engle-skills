---
name: prototype
description: Builds throwaway code that answers one design question, either a clickable state-model demo or several UI variants on one page. Use when the user wants to feel out whether logic, a state model, or a data shape holds up, or to compare what a screen could look like before committing.
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from mattpocock/skills (prototype), MIT.
---

# Prototype

Throwaway code that answers one question. The question decides the shape.

## 1. Pick the shape

- **"Does this logic or state model hold up?"** Read [references/logic.md](references/logic.md): one HTML file
  with a pure logic module, free-play buttons, and guided scenarios.
- **"What should this look like?"** Read [references/ui.md](references/ui.md): several structurally different
  variants on one page, switched with `?variant=`.
- If it's unclear, ask. If the user isn't around, pick from the code (a backend module means logic, a page means UI)
  and state the assumption at the top of the prototype.
- Done when the question is written down in one line and the shape is picked.

## 2. Build it

- **Clearly throwaway.** Put it next to the code it's for, with `prototype` in the file or route name. Follow the
  project's routing and folder conventions.
- **Runs with one command** or a double-click. Nothing to think about to start it.
- **No persistence** unless persistence is the question. Then use a scratch DB or file named so it's obviously safe
  to wipe.
- **No polish:** no tests, no error handling beyond what keeps it running, no abstractions.
- **Show the state** after every action or variant switch, so the user sees what changed.
- Done when you've run it once and it works.

## 3. Hand it over

- Give the user the file path or URL, and the scenarios or variant keys.
- The useful feedback is "that shouldn't be possible" or "header from B, sidebar from C". Add scenarios or
  variants when asked.

## 4. Capture the answer

1. Write the verdict: the question, the answer, and why. Put it in the spec if there is one; else in
   `.scratch/prototype/<date>-<slug>.md`.
2. Fold the validated decision into the real code only when the user asks, and rewrite it properly: prototype code
   was written without tests.
3. Keep the prototype itself out of the main branch. Commit it to a throwaway branch `prototype/<slug>` and name
   that branch in the verdict, or delete it if the user doesn't want it kept.
4. Done when the verdict is saved and the main branch has no prototype code.
