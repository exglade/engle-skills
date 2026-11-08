# Logic prototype

One self-contained HTML file that lets anyone drive a state model by clicking buttons. For questions about business
logic, state transitions, or data shape: things that look fine on paper and feel wrong once pushed through real
cases.

## Build

1. **State the question** in a visible intro at the top of the page, not only a comment.
2. **Put the logic in a pure module** in one `<script>` block, shaped to fit the question:
   - a reducer `(state, action) => state` for discrete events on one value;
   - a state machine when "which actions are legal now" is part of the question;
   - pure functions over a plain type when there's no current state;
   - a small class when the logic really owns ongoing state.

   No DOM access inside it. The page calls the module, never the other way, so the module can lift into the real code
   later.
3. **Build the page** in plain HTML, CSS, and JS, all inline. No framework, bundler, or server; it opens by
   double-click. Use domain words on every label, so a designer or PM can use it. Top to bottom:
   - title and one-line question;
   - current state as a readable panel (labeled fields, not raw JSON), re-rendered after every click, with what
     just changed called out;
   - free-play buttons, one per action, always available;
   - guided scenarios, one per tab: a short description, then the buttons to press in order. Starting a scenario
     resets to a known state. Cover the happy path, an awkward edge case, and something that should be illegal.
4. Keep it plain: clean type, one accent color, no animation.

## Avoid

- Tests, a real database, or generalizing for later.
- Logic that touches the DOM; it can no longer lift out.
- Shipping the HTML page. Only the logic module is worth keeping.
