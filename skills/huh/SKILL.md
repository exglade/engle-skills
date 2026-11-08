---
name: huh
description: Re-explains plainly what the user missed, either the last message that didn't land or everything that happened since the user last spoke, and lists what's waiting on them. Use when the user says "huh?", "wait, what?", "I don't follow", "say that again simply", "catch me up", or "what did I miss".
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from mattpocock/skills (wait-what) and pstack (ketchup), MIT.
---

# Huh?

Say it again so one person can follow it on the first read.

## Pick the case

- **The last message didn't land:** re-explain that message.
- **The user was away** (several turns, subagent results, or long work since their last message), or they ask to
  catch up: re-explain everything since their last message. Assume they remember that message and nothing after.

## How to say it

- Start with one or two sentences of context: what we're doing and where we got to.
- Then the point, answer first.
- Short sentences, everyday words. Define or drop each piece of jargon.
- Use the project's own terms for project things.
- Shorter than the original. Drop anything the user doesn't need to decide or act.
- Say what changed for the user, not how you did it: "the tests pass", not the command you ran.

## Catching up

- Check the current state of what you report (branches, runs, subagents) instead of repeating old reports.
- One short line per thing the user asked for: what came of it, and whether it's done, running, failed, or not
  checked. Never call something done that still waits on them.
- A small diagram when a change is easier to see than read, such as how parts now connect.
- Stay read-only: change nothing while catching up.

## End with what's waiting

- List every decision or step only the user can take: an approval, a choice, access you lack. Include ones raised
  earlier that are still open. Work you can do yourself isn't one of them.
- For each: the call, your pick, the evidence, and the risk, enough to decide from this reply alone.
- If nothing waits on the user, say so.
