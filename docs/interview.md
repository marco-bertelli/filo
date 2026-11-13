# The interview

This page explains how `/filo:flow` works and why it is shaped the way it is. The instructions the model follows are in [`skills/flow/SKILL.md`](../skills/flow/SKILL.md); this is the reader's version.

## Why an interview

After reading a codebase, an agent knows a lot: today's flow, a dozen gaps, a dozen ideas. Two ways of using that knowledge fail.

- **The report.** Everything it found, in one long message. The synthesis is left to you, and a long message does not get read.
- **The open question.** "How do you want it to work?" If you had the whole flow in your head you would not need the session.

What helps is being led: one concrete situation, a few ways it could go, and somebody who notices when two answers do not fit together. So the reading produces an agenda the model keeps to itself, and you meet it one question at a time.

## The gate

Until you approve the final flow, no product code is written: no edits, no scaffolding, no migrations. Changing a step on a page costs a minute. Changing it once built costs days, and code that already exists argues for itself in every later discussion.

You can always skip the session. It says in one line what goes unchecked, then builds.

## Reading first

Before the first question it collects, for the neighbourhood of the feature:

| What | Why it matters |
|---|---|
| **Actors**: every kind of person or system that can meet the feature | The one nobody listed gets the broken path |
| **Surfaces**: every place the feature is seen or triggered | The same step exists once per surface, designed or not |
| **Objects and states** | Every state is something a person will be looking at |
| **Transitions**: what moves an object between states, and who may | Each needs a trigger somebody can find |
| **Failures**: every way the system can say no | Each is a screen: a sentence with a way out, or a dead end |
| **Time**: what happens later, or takes long | The person is not there when it happens |
| **Entry points**: how somebody arrives | A feature nobody arrives at does not exist |

Then a cross-check that reading one file at a time never does: for every state and every failure, where does each surface show it? An error key the frontend never translates, a role the API serves and no page lets in, a timed change that notifies nobody: each is an open point.

It also reads what is already decided (saved flows, `CLAUDE.md`, `AGENTS.md`, docs, ADRs). A decided point is not reopened. If the new work has to reverse one, that becomes a question that names the old decision.

## The lenses

Each actor is walked through each step with thirteen questions:

1. **Arriving.** How do they get here? Would they find it without being told?
2. **First time.** What do they see with nothing there yet?
3. **Understanding.** Before acting, do they know what will happen, who will see it, what it costs?
4. **Waiting.** What do they see meanwhile, and how do they learn it finished?
5. **Failing.** For each failure that can happen here: what do they read, and what can they do next?
6. **Not allowed.** Nothing, a disabled control with a reason, or an error after the click?
7. **Changing their mind.** Back, stop, undo, delete, and what happens to everything that depended on it.
8. **Coming back.** Tomorrow, where is it? What tells them something changed?
9. **Other people.** Who else is affected, what do they see, and when?
10. **How many.** None, one, many, one past the limit.
11. **Elsewhere.** The same step on every other surface: present, different or absent, and is that on purpose?
12. **Switches.** Each setting that changes this step: on, off, and the day somebody flips it.
13. **Arrived.** Does the path end where the purpose said, and does the person know?

Every "nobody decided this" becomes a question for you, or a choice the model makes and shows on the page.

It also compares with **siblings**: where the product already shares, deletes, confirms or notifies. A new feature that behaves differently from three old ones teaches people that nothing they learned carries over. The full text is in [`lenses.md`](../skills/flow/references/lenses.md).

## What it asks, and in what order

The questions follow the flow, so you build it while answering:

1. What it is for. First, because everything after is judged against it.
2. How a person gets to it.
3. The main path, step by step.
4. What can go wrong or be refused along it.
5. The other people it touches.
6. Its life: changing it, removing it, switching it on for people who already use the product.

Some things are not worth a question: what the code already answers, what is already decided, a small thing with one sensible answer. Those it decides, and they appear on the page marked as its choices.

## The shape of a question

- One at a time. The next depends on the answer.
- The situation is inside the question, with a named person: "Anna shared her booking with Marco, and that night it expires", not "handling of expired shared items".
- Two to four options, each one line: what the person would see, and what it costs.
- At least one option you have not said yourself.
- One recommended, first, with the reason.
- A sketch when the options differ in what is on screen.
- No file names and no code terms.
- A counter: "5 of about 11".

## After each answer

1. It says in one line what the answer settles.
2. It checks that the answer fits: with earlier answers, with what is already decided, with how the system works, with the purpose. If not, it quotes both sides in your words, says why they cannot both hold, and asks which does.
3. It looks at what the answer opens: who else sees this, what happens when it is taken away.
4. It replans: questions made pointless are dropped, new ones added.

It keeps your words. Two of your concepts are never merged or renamed; if they look the same, it asks.

## When it stops

When every case in the inventory has an answer: yours, its own, or "not supported". "Not supported" is a fine answer. Silence is not: that is what *complete* means here.
