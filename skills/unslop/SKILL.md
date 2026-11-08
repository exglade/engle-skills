---
name: unslop
description: Cuts AI tells from writing and makes it plain and specific, and shapes docs by type (tutorial, how-to, reference, explanation). Use when writing or editing text people read, such as docs, READMEs, RFCs, PR descriptions, commit messages, or replies, or when the user says "unslop this", "sounds like AI", or "too wordy". Not for skills, AGENTS.md, or prompts; use write-for-agents.
license: MIT
metadata:
  source: Adapted from pstack (unslop, technical-writing), MIT.
---

# Unslop

Edit text so it reads like a person who knows the subject wrote it. Keep the meaning, the intended tone, and the
language. The examples below are English; in another language, apply the same rule with that language's plain
words and its own AI tells.

## When to read more

- Writing or restructuring a doc (README, guide, RFC, reference): also read [references/docs.md](references/docs.md).

## Steps

1. Scan the text for the patterns below.
2. Rewrite each hit. Don't swap one tell for another.
3. Read it once more as the reader. Done when no pattern is left and nothing a reader needs was cut.

When a rule makes a sentence worse, fix the sentence another way or leave it.

## Content

- **Say what it does, not how it feels.** "Types that follow your schema" names a feeling; "a column rename fails
  the build" names the mechanism. If a sentence could appear unchanged in another project's docs, cut it.
- **Name the source** or cut the claim: no "experts believe" or "it's widely known".
- **No empty -ing tails:** "…, ensuring reliability", "…, highlighting the need for". Cut them or say the real
  effect.
- **No generic endings:** "The future looks bright." End on a fact or a next step.
- **Have a view** where the text allows one. Weigh the trade-off and say what you make of it, instead of listing
  pros and cons.

## Words

- Plain words: "use", not "utilize" or "leverage"; "help", not "facilitate"; "many", not "numerous".
- No AI vocabulary: delve, crucial, pivotal, robust, seamless, landscape, tapestry, testament, underscore, showcase,
  foster, enhance, intricate, vibrant.
- "Is" and "has", not "serves as", "stands as", "boasts", or "features".
- Concrete words over abstract metaphors: "add", not "wedge in"; "base", not "substrate"; "way", not "vector"; no
  "north star", "flywheel", or "paradigm".
- One term per thing. Don't cycle synonyms.
- Cut filler: "in order to" is "to"; "due to the fact that" is "because"; "it's important to note that" is nothing.
- Hedge once, if at all: "may", not "could potentially possibly".
- Replace an adverb with a stronger verb or a number: "significantly faster" becomes "2x faster".

## Sentences

- One idea per sentence. Split a sentence the reader has to read twice.
- Mix lengths. Short ones land a point; longer ones carry a fact with its condition.
- Active voice: "the loader parses the file", not "the file is parsed". Passive only when the actor doesn't matter.
- No "not just X, but Y" or "it's not X, it's Y". State the point.
- No forced groups of three. Use the natural number.
- No false ranges: "from startups to enterprises" when they're not on one scale.

## Format

- No em dashes. Use a period or a comma.
- Colons before a list or an example, not as a connector mid-sentence.
- Bold sparingly. A bold label that restates its own line ("**Speed:** Speed improved") becomes prose.
- Sentence-case headings. Straight quotes. No decorative emoji.

## Replies

- No "Great question!", "Certainly!", "I hope this helps!", or "Let me know if…".
- No flattery. Answer directly.
