---
name: why
description: Finds why code is built the way it is, from git history, PRs, tickets, and docs, separating what the record says from inference. Use when the user asks why something works this way, why a choice was made, or what to keep before changing code. Not for how it works now; use how.
license: MIT
metadata:
  source: Adapted from pstack (why), MIT.
---

# Why

Find the reasons behind the code's shape. Read only; leave the code unchanged.

## Steps

1. **Pin the target and the question.** If the user didn't name a target, take your best guess from the conversation
   and say it, so they can redirect.
2. **Anchor on the code:** the files, symbols, and commits that touched them (`git log --follow`, `git blame`).
3. **Gather the record.** Pull PR descriptions and review discussion, linked tickets, and design docs, using
   whatever tools and connectors are available. Trace back past the latest commit; today's shape is often many
   earlier decisions stacked up.
4. **Report** in the shape below. Done when every claim is cited or marked as inference.

## Report

- **The question:** one line.
- **What the record says:** findings, each with its source (commit, PR, ticket, doc).
- **What we can infer:** reasoning beyond the record, written with "appears to".
- **What we don't know:** gaps. If nobody wrote down why, say so; that's an answer too.
- **Sources checked:** each one, including those that turned up nothing or weren't available.
- **Before changing it** (when the user plans a change): what to keep, what's safe to change, and the risks.
