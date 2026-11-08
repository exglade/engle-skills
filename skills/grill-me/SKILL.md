---
name: grill-me
description: Stress-tests a plan, decision, or idea with rounds of questions until both sides share one understanding, laying out options first when the approach is open and sharpening fuzzy terms along the way. Use when the user wants holes poked in a plan, a decision challenged, or a vague task sharpened. Not for writing the result down; use to-spec.
disable-model-invocation: true
license: MIT
metadata:
  source: Adapted from mattpocock/skills (grilling, grill-me, domain-modeling), MIT.
---

# Grill me

Interview the user until you both understand the plan the same way. Write no files unless the user asks.

## Go deeper first

Before mapping decisions, check the task is deep enough, not just big enough. Answer briefly, then propose the
sharper version of the task and let the user accept or trim it:

1. What would a top professional in this field do here that the user isn't asking for?
2. What raw material would they start from, instead of something already summarized?
3. Which specific methods and tools would they use?
4. What, other than you or the user, would show the result is right?

Leave choices that belong to the user open.

## Map the decisions

- Treat the plan as a **design tree**: each decision branches into the decisions that depend on it.
- The **frontier** is every open decision whose prerequisites are settled.
- Ask only frontier questions. A question that depends on an open one waits; asking it now means guessing the answer.

## Options first

- When the task is vague or the approach is unsettled, open with an options round.
- Lay out 2–3 real approaches: how each works, what it costs, when it wins. Recommend one.
- Grill the details after the user picks. Skip this round when the approach is already clear.

## Ask in rounds

1. Ask the whole frontier in one round; one question at a time is slow. Number each question and recommend an
   answer. For a choice, list the options and their trade-offs first.
2. Wait for the answers.
3. Recompute the frontier and ask the next round.

Format each round like this:

```text
❓ **Q1** - **<title>**: <question, with options if it's a choice>

➡️ <your recommended answer>

---

❓ **Q2** - **<title>**: <question>

➡️ <your recommended answer>
```

## Sharpen terms

- **Fuzzy words:** for a vague or overloaded term, propose one precise term: "By 'account', do you mean the Customer
  or the User?"
- **Scenarios:** invent concrete edge cases that force precise boundaries between concepts.
- **The code:** when the user says how something works, check the code agrees. Surface contradictions.

## Facts vs decisions

- Facts are your job. Look them up in the code, docs, or tools; use a subagent with a fresh context for wide
  searches.
- While a lookup runs, ask the questions that don't depend on it.
- Decisions are the user's. Put each one to them and wait.
- Push back when an answer looks wrong, and say why.

## Finish

1. Done when the frontier is empty: every branch visited, nothing silently assumed.
2. Summarize the decisions as a short list.
3. Act on the plan only after the user confirms the summary. To write it down, suggest `to-spec`.
