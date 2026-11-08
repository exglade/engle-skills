# Writing docs

Write so a tired engineer understands on the first read. Use the real names from the code (symbols, files, flags,
commands), not synonyms or descriptions of them.

## Pick the type first

One doc, one type. Two questions pick it: does the reader want to **do** something or **understand** something,
and are they **learning** or **working**?

| Type        | For                     | Rules                                                                                 |
| ----------- | ----------------------- | ------------------------------------------------------------------------------------- |
| Tutorial    | Doing, while learning   | Say what they'll build. Every step shows a visible result and what they should see. Keep explanation to a clause and a link. |
| How-to      | Doing, while working    | Solve one problem the reader has. Assume competence; no background. Allow forks: "If you want X, do Y." Title it by the task: "How to rotate keys". |
| Reference   | Looking up, while working | Describe only: facts, options, limits, errors. No instructions or opinions. Mirror the structure of the thing described. Generate from code when you can. |
| Explanation | Understanding           | One bounded topic, anchored on a real "why". Context, history, trade-offs, alternatives. Opinion belongs here and nowhere else. |

Don't mix types. Split and link instead: no reference tables inside a tutorial, no arguing inside a how-to.

## Sentences for docs

- Talk to the reader as "you", in the present tense. "Will" only for things that happen later.
- Instructions are commands: "Click Submit." Never "should be done".
- Put the condition first: "To delete the doc, click Delete."
- Common case first, exceptions after.
- Never "simply", "easy", "just", or "quickly" in a procedure. If it were easy, the reader wouldn't be here.
- Don't announce future work: no "we will soon support…".
- Link text says where it goes: the page title or a short description, never "click here".
