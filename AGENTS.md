# AGENTS.md

A collection of portable agent skills.

## Before editing a skill

- Read [docs/design.md](docs/design.md) for the structure and the reasons behind it.
- Follow the writing standard in [skills/write-for-agents/SKILL.md](skills/write-for-agents/SKILL.md). It covers
  wording, structure, names, descriptions, trigger modes, and links between skills.

## Repo rules

- One skill, one job. When two skills overlap, merge or cut one.
- Stay portable: no assumptions about tracker, stack, or agent.
- Update the README tables and the `ask-engle` tables when adding, renaming, or removing a skill, then run
  `pnpm build:plugin`.
- Never edit `.claude-plugin/*.json` by hand. Change `package.json` (except `version`) and run `pnpm build:plugin`.

## Commits and releases

release-please sets the version and writes `CHANGELOG.md` from commit messages, so leave `version` alone and write
each message as a public changelog line.

- Use Conventional Commits, scoped to the skill: `feat(map-code): write an interactive HTML guide`.
- Pick the type by what changes for users, not which file changed. A `SKILL.md` edit that changes behavior is
  `feat` or `fix`, not `docs`.
- Add `!` only when users must act, such as a renamed or removed skill. A new skill is `feat`.

## Duplicated instructions

Some instructions are repeated in several skills on purpose, so each skill works alone. Change every copy together.

- Work folder `.scratch/work/`: `setup-engle`, `to-spec`, `to-tickets`, `implement`, `implement-spec`,
  `review-code`, `ask-engle`.
- Ticket fields (`Status`, `Blocked by`): `to-tickets` (and `assets/ticket.md`), `implement`, `implement-spec`.
- Orchestrator owns the work folder: `implement-spec`, `implement`.
- Test instructions: `implement` (short copy) and `principles` (full).

## Testing

- Test a skill's behavior in a fresh session, in a separate project.
- Run skills under development only in that test project. Reading them here as reference, like the writing
  standard, is fine.
