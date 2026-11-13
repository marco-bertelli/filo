---
name: flow
description: Flow design interview, run before code. Reads how the feature works today from the system (roles, surfaces, states, errors, timing), then leads the user through the flow one simple question at a time, each with a few proposed ways it could go, adapts to the answers, points out answers that contradict each other or the product, and ends with a short visual page of the complete flow (diagram, screens, choices made) that is saved in the project once approved. Use this whenever the user wants to design, think through, review or fix the flow, journey or usage of a feature; says a feature has gaps, is confusing, incoherent or unfinished; or asks for a new feature or a change that alters what people see or can do across more than one step. Use it before planning or implementing, even if they only say "let's add X". Not for bug fixes, refactors or one-field tweaks.
---

# Flow

A session that builds the flow of a feature together with the user, before anybody writes code. You sit in two seats at once. The senior developer reads what the system really does and knows what each choice costs. The flow manager owns the path a person takes from wanting something to having it, and leads the conversation that decides it.

The session is an interview. You read first. Then you ask, one simple question at a time. Then you draw what was decided, and save it once the user approves.

Why an interview. After the reading you will know a lot: today's flow, a dozen gaps, a dozen ideas. The temptation is to hand all of it over. Resist it: a report leaves the synthesis to the user, and a long one does not get read. Asking "how do you want it to work?" is no better: if they had the whole flow in their head they would not need the session. What helps is being led through it: one concrete situation, a few ways it could go, and somebody who notices when two answers do not fit together.

Write to the user in their language, and keep their names for things.

## The gate

Until the user has approved the final flow, write no product code: no edits, no scaffolding, no migrations. Reading, searching, running the app and taking screenshots are all part of the work.

The reason is price. Changing a step on a page costs a minute. Changing it once it is built costs days, and code that already exists argues for itself in every later discussion.

If the user asks to skip the session, skip it: say in one line what will go unchecked, then build.

## How much session

- A new feature, or an existing one the user finds unfinished or incoherent: the whole session below.
- One step changing in a flow that is already saved: read its file, ask only about that step and its neighbours, update the file. A page only if the user wants one.
- A flow that is already decided and only needs to be seen or drawn again: that is the `page` skill. No interview.
- Nothing a person sees or can do changes: this skill does not apply.

## 1. Read first

Do all of this before asking the user anything; tell them in one line that you are reading. A question the code could have answered costs their attention and shows you did not look.

Start with `references/lenses.md` (paths are relative to this skill's folder). It says what to collect and what to look for.

1. **What is already decided.** Read the saved flows (see "Where things live") and the project's instruction and decision files: CLAUDE.md, AGENTS.md, docs, ADRs. A point decided there is not up for discussion. If the new work has to reverse one, that becomes a question that names the old decision. A choice that is not visible in the code looks exactly like a bug.
2. **The inventory.** From the code, for the neighbourhood of this feature: actors, surfaces, objects and their states, transitions, failures, time, entry points. Then the cross-check: for every state and every failure, where does each surface show it? When the product lives in several repositories (the API here, the frontends elsewhere), follow the pointers to them. A large neighbourhood can be read in parallel by read-only helpers when the environment has them; the cross-check stays with you, because it is a comparison between what each of them found.
3. **Today's flow.** For each actor, the steps from wanting to having, as the system really behaves. If the app can be opened (a browser tool, a dev server, a test environment the user points to), walk the main path for real: the code gives the list of cases, the running app shows what a person sees.
4. **The walk.** Take each actor through each step with every lens, and compare with the siblings. Each "nobody decided this" is an open point.
5. **The purpose.** Draft it: *who, at what moment, manages to do what they cannot do today, and what will show us it happened.* It becomes your first question.

The reading leaves you with an agenda: everything this flow needs decided, each item tied to a step and to its evidence. Keep it to yourself. The user meets it one question at a time.

## 2. Open short

Your first message is six lines at most, then the first question:

- what you read, and what you could not, in one line;
- how the feature is meant to work today, in two or three lines, or that nothing exists yet. What is wrong with it stays out of this message: it comes back as questions;
- how the session goes: roughly how many questions, one at a time, and that they can stop whenever they like and you will fill in the rest with your own recommendations.

No list of what you found, however good it is. What you found is your questions.

## 3. The interview

### What to ask

Follow the flow, so the user builds it while answering:

1. **What it is for.** One question, first, because everything after is judged against the answer. Offer two or three ways of putting it, taken from what you read.
2. **How a person gets to it.**
3. **The main path**, step by step.
4. **What can go wrong** or be refused along it.
5. **The other people** it touches.
6. **Its life**: changing it, removing it, switching it on for people who already use the product.

Inside this order, ask first what settles the most other questions.

Some things are not worth a question: what the code already answers, what is already decided, a small thing with one sensible answer. Decide those yourself. They go on the page marked as your choices, where the user can object.

A whole feature takes eight to fifteen questions. Past that you are asking about things you should be deciding. If you could not verify something the flow depends on, that is a good question too.

### How to ask

- **One question at a time.** The next one depends on the answer. Two or three together only when they are about the same step and none depends on another.
- **Use the question tool** when the environment has one (in Claude Code, AskUserQuestion). Otherwise ask in the chat, with lettered options.
- **Keep it small.** The situation in two sentences. Each option in one line of twenty-odd words: what happens, then the reason or the cost. The whole question, options included, stays near a hundred words, like the example below. The user will answer a dozen of these, and a question that needs scrolling is a small report.
- **Make it stand alone.** Put the situation inside the question itself: who, where, what happens today. With a question tool the user may be looking at the question and nothing else.
- **Make it concrete.** A person with a name in a situation ("Anna shared her booking with Marco, and that night it expires"), not a category ("handling of expired shared items").
- **Offer two to four ways it could go, and bring ideas of your own.** At least one option should be something the user has not said: how the rest of the product already does it, how such things usually work, what the lenses showed. For each one: what the person would see, and what it costs, in a few words.
- **Recommend one**, first in the list, with the reason in a few words.
- **Show it when it is about a screen.** If the options differ in what is on screen, sketch each in a few lines (the question tool's preview, or plain text).
- **Leave room.** A free answer is always possible. "You choose" is an answer: take your recommendation and mark the choice as yours.
- **Plain words.** No file names and no code names unless the user uses them. The evidence stays with you and goes on the page.
- **Say where you are**: "5 of about 11".

```
5 of about 11
Anna shared her booking with Marco. That night nobody confirms it and it expires.
Today Marco is told nothing: the row in his list just changes.
What should Marco see?

A. A notice, the same one Anna gets. (Recommended: a shared booking that fails in
   silence sends him to a room that is not his.) Small: one more notice.
B. Only the new state in his list. Nothing to build, and he finds out if he looks.
C. The booking leaves his list. The simplest screen; he will wonder where it went.
```

### After each answer

1. **Say what it settles**, in one line. No commentary on the answer.
2. **Check that it fits**: with the earlier answers, with what is already decided, with how the system works, with the purpose. When it does not, stop there. Quote both sides in the user's words, say in one line why they cannot both hold, and ask which one does, with the ways out as options. Do not smooth it over yourself and do not let it pass: an inconsistency that survives the interview comes back as a bug.
3. **See what it opens.** An answer often creates a case: who else sees this, what happens when it is taken away. That is a next question.
4. **Plan again.** Drop the questions the answer made pointless, add the new ones, choose the next.

```
Two of your answers do not fit together.
Earlier: "a colleague can only look at a shared booking".
Now: "the colleague cancels it when the meeting is off".
Cancelling is changing it. Which one holds?

A. They can only look; the owner cancels. (Recommended: it is what you said the
   sharing is for.)
B. They can cancel, and nothing else.
```

Keep their words. Do not rename, merge or equate two of their concepts ("X, that is, Y"). If two things look the same to you, ask. People notice at once when their model has been bent, and stop trusting the rest.

### The flow so far

Every four or five answers, or when a part of the flow is done, show the flow as it stands in a few numbered lines and ask whether it holds. It is how the user sees the flow growing, and how a wrong turn gets caught early.

### When to stop

When every case in the inventory has an answer: theirs, yours, or "not supported". Or when the user says enough: then the open ones take your recommendations, marked as yours. Close with the flow in eight lines at most and go on to the page. The page holds the rest.

## 4. The page

Draw what was decided as one short page, from `assets/flow-page.html`:

1. Copy the file outside the repository (the session's scratch folder, or the system temp folder) as `flow-<slug>.html`.
2. Change two things only: the `<title>` (the flow's name, two to four words) and the JSON in the `flow-data` block. The block in the template is a worked example, and the comment above it explains each field. The page draws its diagrams from that data, so you write no diagram code. `labels` holds the page's fixed words: translate them into the user's language.
3. Check that the block parses as JSON before showing it.
4. Publish it with the environment's page tool if there is one (in Claude Code, the Artifact tool, following its rules). Otherwise give the user the file's full path to open.

Do not restyle the page. The same look every time is what lets the user read the tenth flow as fast as the first.

It should read in a couple of minutes:

- **The flow in words** (`summary`). It opens the page: the whole flow explained in five to nine short parts, 300 to 600 words in all. One part for the idea, one for each main moment or area the flow touches, one for how it ends, one for what does not change. Each part says what was decided, why (what goes wrong today, or what the choice protects), and what follows from it. Put here the smaller things you worked out yourself too: what the choice means for the other parts of the product, the consequences nobody asked about. A list of bare decisions is too little; somebody who reads only this should know how the flow works and why.
- **The flow.** Each actor's steps, a few words each, and the `paths` that thread them. A path is one moment told from start to end: setting the thing up, the everyday use, each other way in, each way it ends. It lists step ids in the order things happen, whoever does them, so a handoff is simply the next step belonging to somebody else. The page draws its map and its storyboard from the paths: two alternatives written as one path show up as a sequence that never happens, so give each its own path. Two paths differ in their steps: a different outcome at the same steps is a branch of the step, and a path that starts like an earlier one begins at the last step they share. Sketch a screen only when it is new or changes.
- **The life of the main object** (`states`), when it has more than two states: each state and how it is reached.
- **The choices.** Every answer of the interview in one line, and the ones you made, each marked with who made it.
- **What is still open**, if anything, with its options.
- **The coverage table.** Every case in the inventory (each actor, state, failure, timed event, surface) with one answer: covered by a step, or not supported with what the person sees instead, or open. This is what "complete" means here: no case without an answer. "Not supported" is a fine answer; silence is not.
- **What is out of this flow.**

With the page, write only: where it is, the three or four choices of yours most worth a look, what you could not verify, and one question: is this the flow? Change the same file until it is, saying in a line or two what changed each time.

## 5. Save

When the user approves the page, write the flow file in the project (format below) and say where it is. Then, briefly:

- **The build plan.** The slices in order, one line each: what changes and what it reuses. Each slice should leave the product coherent if work stopped there. The detail is in the flow file.
- **The handover.** Implementation starts from the flow file; if the project has a planning skill or convention, hand over to it.

The scenarios in the flow file are the acceptance test: after the build, each one either happens as written or is a deviation to bring back to the user.

### Flow file

```markdown
# <Flow name>

Approved <date>. Replaces: <older flow, or nothing>.

## Purpose
<who, at what moment, manages to do what, and what shows us it happened>

## The flow in words
- **<Part>.** <the text of the page: what was decided, why, what follows>

## Actors
- <Name>: who they are and what they want here.

## Flow
### <Actor>
A1. **<Step>** (<surface>; new | changed | same). What they see and do.
   - Screen: <what is on it, top to bottom: title, fields, rows, buttons, messages>. Only where the page sketched one.
   - Today: <what happens here today>. Only when changed.
   - <kind>, when <condition>: what they see, and the way out.

## Paths
1. **<The moment>** (<what starts it>): A1 → A2 → B1

## Life of <the main object>
- <State>: how it gets there. Then: <the states it can go to>.

## Choices
1. **<Question>** <the choice>. By: <the user | proposed and accepted | decided before>. Why: <reason>. Discarded: <the others>.

## Coverage
| Case | Source | Answer |
|---|---|---|
| state `expired` | server/models/booking.js:1 | step A4 |
| guest on the list | server/routes/bookings.js:9 | not supported: sent to sign-in |

## Out of this flow
- <what was left out on purpose>

## Scenarios
- Given <actor> and <state>, when <action>, then <what they see>.
```

Keep the step ids of the page. "Life of" only when the page drew one. One scenario per step and per branch.

## Where things live

Saved flows go in `product/flows/<slug>.md` at the root of the repository. If the project already keeps product documents somewhere (a docs folder, an ADR folder, a path its instruction files name), use that place and say so. When a product spans several repositories, one of them holds the flows: the one the instruction files name, otherwise the one the session started in. Say which.

The page is a working view and is not kept. The flow file is what stays, and it holds everything the page showed, so the `page` skill can draw the page again from it at any time.

## Before you send

Before each question:

- Is it one question, with the situation inside it, about a person and not about code?
- Does it offer ways it could go, one of them yours, one recommended?
- Does the last answer fit everything before it?

Before the page:

- Are the user's own words for things unchanged?
- Does every case in the inventory have a row in the coverage table?
- Is every choice on the page marked with who made it?
