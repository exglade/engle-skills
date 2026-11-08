---
name: research
description: Answers a factual question from primary sources (official docs, source code, specs, changelogs) and saves the findings with a citation for every claim. Use when the user wants something researched, looked up, or checked against the docs, such as whether a library or API supports something, or wants reading legwork done in the background. Not for explaining a concept; use what.
license: MIT
metadata:
  source: Adapted from mattpocock/skills (research), MIT.
---

# Research

Answer one question from the sources that own the facts, and save the answer so it isn't researched twice.

## 1. Frame

- Write the question in one line, with the versions that matter: "Does Prisma 6 support nested transactions on
  Postgres?"
- If the user is busy with other work, run steps 2–3 in a background subagent with a fresh context when the agent
  supports one, so they keep working. Give it the question, the versions, and the output path.

## 2. Investigate

- Use primary sources: official docs, source code, specs, changelogs, first-party API responses. A blog post or
  forum answer is only a lead to the primary source.
- Trace every claim to the source that owns it. Match the version the project actually uses; check the lockfile.
- Prefer running a tiny check over reading, when it's cheap and safe: call the API, run the CLI with `--help`, read
  the installed package's source.
- When sources disagree, record both and which one wins (newer, closer to the code).
- Done when every part of the question has an answer or is marked unknown.

## 3. Write

Save to `.scratch/research/<date>-<slug>.md`. Save into the project's own docs only when the user asks.

```markdown
# <question>

_Researched <date>. Versions: <what was checked>._

## Answer

<Two or three lines. Yes, no, or it depends, and on what.>

## Findings

- <Claim.> [<source title>](<link or path:line>)

## Unknowns

- <What couldn't be confirmed, and where to look next.>
```

## 4. Report

- Give the user the answer, the file path, and anything unknown.
- Done when every claim in the file has a source.
