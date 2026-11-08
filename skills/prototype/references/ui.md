# UI prototype

Several structurally different variants on one page, switched from a floating bar. The user flips between them, picks
one or takes parts from each, and the rest goes away.

## Where the variants live

- **Default: an existing page.** Render the variants on the real route, picked by `?variant=`. Keep the page's data
  fetching, params, and auth; swap only the rendered part. A new section of an existing page counts too. Real
  surroundings and real data expose problems an empty page hides.
- **Last resort: a new throwaway route,** only when nothing could host it. Follow the project's routing convention
  and put `prototype` in the path.

## Build

1. Write the plan in one line at the top of the file: "Three variants of the settings page, switched by
   `?variant=`, on `/settings`." Default to 3 variants; cap at 5.
2. Make each variant **structurally different**: layout, information order, main action. Not colors or copy. If two
   come out alike, redo one with an explicit constraint ("no card grid"). Use the project's components and styling,
   and name them `VariantA`, `VariantB`, and so on.
3. Add one switcher: read `?variant=` (default A) and render that variant. Share small pieces like a header, never
   the layout.
4. Build the floating bar, bottom center, in one shared component:
   - previous and next arrows that wrap around, and a label with the key and name: `B (Sidebar layout)`;
   - arrows update the URL through the router, so a variant survives reload and can be shared;
   - the `←` and `→` keys cycle too, except while an input, textarea, or contenteditable has focus;
   - visibly not part of the design, and hidden in production builds.
5. Point mutations at stubs. The question is the look, not the backend.

## Finish

- Give the user the URL and the variant keys.
- When one wins: fold it into the real page (or promote it to a real route), rewritten properly. Remove the losing
  variants and the switcher from the main branch.
