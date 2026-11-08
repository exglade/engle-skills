# Smell baseline

- Each smell is a labeled judgement call ("possible Feature Envy"), never a hard violation.
- A documented project rule always wins. If the project endorses something listed here, suppress the smell.

| Smell                  | What it is                                                     | Usual fix                                       |
| ---------------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| Mysterious name        | A name that doesn't reveal what it does or holds               | Rename. No honest name means the design's murky |
| Duplicated code        | The same logic shape in more than one hunk or file             | Extract the shared shape                        |
| Feature envy           | A method that uses another object's data more than its own     | Move it onto the data it envies                 |
| Data clumps            | The same few fields or params keep travelling together         | Bundle them into one type                       |
| Primitive obsession    | A primitive standing in for a domain concept                   | Give the concept its own small type             |
| Repeated switches      | The same switch or if-cascade on the same type in several places | Polymorphism, or one shared map               |
| Shotgun surgery        | One logical change forces edits across many files              | Gather what changes together                    |
| Divergent change       | One module edited for several unrelated reasons                | Split so each changes for one reason            |
| Speculative generality | Abstractions or hooks for needs the spec doesn't have          | Delete; inline until a real need shows          |
| Message chains         | Long `a.b().c().d()` navigation                                | Hide the walk behind one method                 |
| Middle man             | A class or function that mostly delegates                      | Cut it; call the real target                    |
| Refused bequest        | A subclass that ignores most of what it inherits               | Use composition instead                         |
