# Design

Decisions behind this collection, and why.

## Goal

- Composable agentic engineering skills that leave the developer in control of how things get built, and how far
  to automate. Go step by step, or hand `implement-spec` a spec and let it build, review, and write the PR. Both
  are fine; the developer picks.
- Fit a team: produce no artifacts that need committing and clutter the shared repo. Working files go in
  `.scratch/`, outside git, unless the team asks for them.
- Drop into any project, solo or at work. Work in Codex and Claude Code.

## Scope

The inner loop of engineering: from a feature or idea an engineer receives, to a pull request.

- **In:** understanding the code, planning, building, debugging, verifying, reviewing, and writing the PR.
- **Out:** the outer loop. Managing tickets with the team in GitHub, Jira, or Linear, product design, and product
  management.
- Runs on one developer's machine. One session with subagents is safe today; several sessions on one repo is the
  goal. See [Open](#open).

## Skills

- **One job per skill:** one outcome the user asks for, with a clear finish. Size doesn't matter: `implement` builds
  one ticket, `implement-spec` a whole spec. A skill isn't a stage either; Understand holds `map-code`, `how`,
  `why`, and `what`. If two skills would answer the same request, merge or cut one.
- **Composable:** few dependencies, not zero. `implement-spec` runs `implement` and `review-code`; most skills only
  link to `principles` and work without it.
- **No hard limit on the number of skills.** A skill earns its place with one clear job no other skill does.
- **User and project conventions over skills.** Skills defer to the rules in the project's or user's AGENTS.md or
  CLAUDE.md.
- **Be concise.** Short, clear instructions keep context small. Assume the model is smart; add only what it doesn't
  already know.
- **Set appropriate degrees of freedom.** Match the level of specificity to the task’s fragility and variability.

### Kinds

| Kind      | What it is                    | Examples                                                 |
| --------- | ----------------------------- | -------------------------------------------------------- |
| Workflow  | Steps to get a job done       | grill-me, implement-spec, review-code                    |
| Principle | What good code looks like     | principles (one skill, one reference file per principle) |
| Meta      | Skills about skills           | setup-engle, ask-engle, write-for-agents                 |

- Kinds are for design only. Skills stay flat in `skills/<name>/`, and the README groups them.

### Trigger modes

| Mode        | For                                                       | Examples                             |
| ----------- | --------------------------------------------------------- | ------------------------------------ |
| Manual only | Entry points I start: heavy, writes files, or rare        | implement-spec, to-tickets, grill-me |
| Auto        | Skills other skills call, or that match a plain request   | implement, review-code, how, unslop  |

### Best practices references

Official references for skill authoring best practices:

- [Anthropic - Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [OpenAI - Build skills best practice](https://learn.chatgpt.com/docs/build-skills#best-practices)

## Naming

- Names say what the skill does, clearly and accurately; no fixed pattern.
- Skills that turn one thing into another start with `to-`: `to-spec`, `to-tickets`.
- Avoid ambiguous names that read as something else. `map-code`, not `onboard`, which sounds like onboarding to
  these skills.
- Avoid built-in commands: `review-code`, not `code-review`.

## Packaging

- Everything ships as a skill in `skills/<name>/`, loaded when needed or on `/name`.

## Work folder

- Everything skills make for their own use goes in `.scratch/`, so it never clutters the team's repo. Deliverables
  are the exception: code, a `verify-*` skill, and rules the user approves for AGENTS.md.
- `setup-engle` changes whether `.scratch/` is ignored. It asks, and defaults to `.git/info/exclude` so the team's
  `.gitignore` stays untouched; the user can pick `.gitignore` or no ignore instead. Other skills save to `.scratch/`
  and leave git as it is.
- The work folder is fixed at `.scratch/work/`. A configurable folder meant a pointer file every skill had to read,
  and committing specs meant writing that pointer into the team's AGENTS.md. To keep a spec, the user asks the
  agent to write it into the project's docs.
- Specs and tickets go in `.scratch/work/<feature>/`: `spec.md` and `tickets/NN-<slug>.md`.
- Each ticket lists what blocks it. `implement-spec` works the tickets that have no open blockers, one subagent and
  worktree each, then merges. It reviews the whole branch once at the end; subagents skip per-ticket review.
- The orchestrator owns the work folder in the main checkout. Subagents get a brief with the ticket text and spec
  context, and never read or write the work folder; it doesn't exist in their worktrees.
- No `.scratch/AGENTS.md`. Agents don't auto-load a nested AGENTS.md, so rules there are read only when a skill
  opens it on purpose.
- Skills still work without setup: each names `.scratch/work/` itself, so a teammate can install just one.
- Specs are working documents. Lasting knowledge belongs in the code, its tests, and the project's own docs.

## Principles skill

- One `principles` skill (auto) with an index and one reference file per principle.
- **Engineering principles only:** what good code, architecture and tests look like.
- Each file has: rule, why, applies when, skip when, smells, test.
- "Skip when" stops blind enforcement, e.g. DRY versus code that only looks alike.
- The index in the skill lists them, grouped as tests, design, changing code, and debugging and proof.
- Users and projects can turn principles off with a line like "Principles off: smallest-change" in AGENTS.md or
  CLAUDE.md. The opt-out lives only in `principles`; skills that link to it don't repeat it.

## Open

- Several sessions on one repo. Known ways it breaks today:
  - A session started in its own worktree can't see `.scratch/`. Maybe look up the main checkout with
    `git rev-parse --git-common-dir`.
  - Claiming a ticket is just setting its Status to `in-progress`, so two sessions that start together can both
    take it.
  - Two sessions can edit the same spec or ticket file and overwrite each other.
- `setup-engle` reading a team tracker (GitHub, Jira, Linear). Left out for now.
- A Codex manifest. Add it to `scripts/build-plugin.mjs` when needed, from `package.json`. Codex may read
  `.claude-plugin/` already; test that first.
