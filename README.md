# Engle Skills

**Eng**ineer-**le**d agentic engineering skills, for working alongside AI agents and alongside your team.

Many popular collections cost you in two ways. Some spec the whole feature and let the agent build it, so you lose
control of how it's done. Others leave specs, plans, and notes across the repo that your team never asked for, and as
they drift from the code, they send the agent down the wrong path.

The goal: move as fast as the agent allows, while staying in control of the decisions.

Each skill does one job and works on its own, so you plug in the one that fits instead of following a fixed pipeline.
Skills work from the session and write a file only when a step needs one, into `.scratch/`, outside git. They're
plain instructions, not tied to one agent or model.

It's the set I use on my own projects and at work.

[How to use](#how-to-use) | [Skills](#skills) | [Principles](#principles) | [Other recommended skills](#other-recommended-skills)

## How to use

### 1. Install the skills

> [!WARNING]
> Some skills share names or jobs with popular collections. If you have both installed, keep one copy of each, or the
> agent may load the wrong one.

<details>
<summary><b>Claude Code</b></summary>

```text
/plugin marketplace add exglade/engle-skills
/plugin install engle@engle-skills
```

Update with `/plugin marketplace update engle-skills`.

Plugin skills are namespaced, so `/to-spec` becomes `/engle:to-spec`.
</details>

<details>
<summary><b>Any agent</b></summary>

```sh
npx skills@latest add exglade/engle-skills
```

[skills.sh](https://skills.sh/) CLI gives you more control over which skills to add and when to update.
Run it again to update and pick up new skills.
</details>

### 2. Per project, run `/setup-engle`

You only need to run this once per project to set up:

- Keep `.scratch/` out of git: only for you, for everyone, or not at all.
- Create `.scratch/work/`, where specs and tickets go.

### 3. Now fly! Or run `/ask-engle` for help

Run `/ask-engle` with what you're doing, or just "what now?". It suggests the next skill and why.

There's a main flow that takes one feature from idea to PR:

1. **`grill-me`:** the agent questions you until the plan is clear, options first.
2. **`to-spec`:** writes the agreed plan to `.scratch/work/<feature>/spec.md`.
3. **`to-tickets`:** splits the spec into thin tickets, each listing what blocks it.
4. **`implement-spec`:** builds every ticket that's unblocked in parallel, each in its own worktree, merges them, and
   reviews the whole branch with `review-code`.
5. **`pr`:** writes the PR description.

Skills follow your AGENTS.md or CLAUDE.md over their own defaults. To change a default, add a rule to your AGENTS.md.

### 4. Optional: add other recommended skills

See [Other recommended skills](#other-recommended-skills) for skills from other collections that work well with these.

## Skills

⚑ runs only when you call it. The rest also load on their own when your request matches.

| Stage      | Skill                   | What it does                                           |
| ---------- | ----------------------- | ------------------------------------------------------ |
| Start      | `setup-engle` ⚑         | Wire these skills into a project                       |
| Start      | `ask-engle` ⚑           | Suggest the next skill or step                         |
| Project    | `audit-tooling` ⚑       | Find missing or weak tooling, and suggest fixes        |
| Understand | `map-code` ⚑            | An HTML guide to a repo or part of it, with diagrams   |
| Understand | `how`                   | How one area or flow of the code works                 |
| Understand | `why`                   | Why the code is built the way it is                    |
| Understand | `what`                  | What a concept is, with its trade-offs                 |
| Understand | `research`              | Answer a question from primary sources, with citations |
| Plan       | `grill-me` ⚑            | Stress-test an idea until the plan is clear            |
| Plan       | `prototype` ⚑           | Throwaway code that answers one design question        |
| Plan       | `to-spec` ⚑             | Write the agreed plan as a local spec                  |
| Plan       | `to-tickets` ⚑          | Split a spec into tickets with blockers                |
| Build      | `implement`             | Build one ticket, test first where it's cheap          |
| Build      | `implement-spec` ⚑      | Build a whole spec with parallel subagents             |
| Debug      | `diagnose-bug`          | Build a feedback loop, find the root cause, fix it     |
| Verify     | `create-verify-skill` ⚑ | Create or update a skill that proves the app works     |
| Review     | `review-code`           | Review a diff for spec, standards, and risk            |
| Review     | `improve-code` ⚑        | Find and rank improvements in existing code            |
| Ship       | `pr`                    | Write a PR description a reviewer can read fast        |
| Any        | `handoff` ⚑             | Hand work over to another session or agent             |
| Any        | `reflect` ⚑             | Keep a session's lessons so mistakes don't repeat      |
| Any        | `huh` ⚑                 | Re-explain plainly, or catch up on what you missed     |
| Any        | `unslop`                | Make writing plain and specific                        |
| Any        | `write-for-agents`      | Style rules for skills, AGENTS.md, and prompts         |
| Any        | `principles`            | Engineering principles, below                          |

## Principles

`principles` holds engineering heuristics, each with when to apply it and when to skip it. Other skills use the ones
that fit. Name one to focus a review: "/review-code against DRY".

- **Tests:** test behavior, arrange-act-assert, tests encode intent.
- **Design:** model the domain, deep modules, boundary discipline, type-system discipline, minimize reader load, don't
  repeat yourself, idempotent operations, separate shared state, make the easy path right.
- **Changing code:** smallest change, redesign from first principles, sequence verifiable units, outcome-oriented
  execution.
- **Debugging and proof:** fix root causes, attack the premise, explain the number, prove it works.

## Other recommended skills

Skills from other collections that work well for engineering.

| Area     | Skill                                                                                        | What it does                                                       |
| -------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Security | [`/security-review`](https://github.com/anthropics/claude-code-security-review) by Anthropic | Review pending changes for vulnerabilities. Built into Claude Code |
| Security | [`security-audit`](https://github.com/cloudflare/security-audit-skill) by Cloudflare         | Audit a whole repo for vulnerabilities, with each finding verified |

## Design and credits

[docs/design.md](docs/design.md) records the decisions behind the collection and why.

Built on ideas and skills from [Matt Pocock's skills](https://github.com/mattpocock/skills) and
[pstack](https://github.com/cursor/plugins/tree/main/pstack). See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
