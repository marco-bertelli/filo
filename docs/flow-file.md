# The flow file

When you approve a flow, it is saved as one Markdown file in your repository. This is what stays: the page is a view of it, and the code is built from it.

## Where it goes

`product/flows/<slug>.md` at the root of the repository. If the project already keeps product documents somewhere (a docs folder, an ADR folder, a path named in its instruction files), that place is used instead, and you are told. When a product spans several repositories, one of them holds the flows: the one the instruction files name, otherwise the one the session started in.

Commit it with the rest of the project.

## Format

```markdown
# <Flow name>

Approved <date>. Replaces: <older flow, or nothing>.

## Purpose
<who, at what moment, manages to do what, and what shows us it happened>

## The flow in words
- **<Part>.** <what was decided, why, what follows>

## Actors
- <Name>: who they are and what they want here.

## Flow
### <Actor>
A1. **<Step>** (<surface>; new | changed | same). What they see and do.
   - Screen: <what is on it, top to bottom: title, fields, rows, buttons, messages>.
   - Today: <what happens here today>.
   - <kind>, when <condition>: what they see, and the way out.

## Paths
1. **<The moment>** (<what starts it>): A1 → A2 → B1

## Life of <the main object>
- <State>: how it gets there. Then: <the states it can go to>.

## Choices
1. **<Question>** <the choice>. By: <the user | proposed and accepted | decided before>. Why: <reason>. Discarded: <the others>. Steps: <ids, when the choice shows in particular steps>.

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

A complete file, saved by a real session on the example app: [example/bookings.md](example/bookings.md).

## The sections

**Purpose.** One sentence everything else is judged against. If a later change does not serve it, the change belongs to another flow.

**The flow in words.** The explanation a new person on the team should read first. It carries the reasons, which the step list cannot.

**Flow.** Every step of every actor. The id (`A1`, `B2`) is the same one the page shows and the paths use. `new | changed | same` says how the step compares with the product before this flow. "Screen" is written only for screens that are new or change; "Today" only for steps that change. The lines under a step are the cases that go differently: empty, error, not allowed, waiting.

**Paths.** The moments of the flow, each as ordered step ids across actors. Alternatives are separate paths.

**Life of.** Present only when the main object has more than two states.

**Choices.** The record of the session. "By" tells you how much weight a choice carries: yours, proposed by the model and accepted, or decided before the session. "Discarded" keeps the options that lost, so nobody proposes them again without knowing.

**Coverage.** Every case the system knows, with the place in the code where it comes from and one answer. A case with no row is a case nobody decided.

**Scenarios.** One per step and per branch.

## Building from it

- The **scenarios** are the acceptance test. After the build, each one either happens as written or is a deviation to bring back to whoever approved the flow.
- The **coverage table** is the checklist for the edges: every "not supported" row is a message somebody has to write.
- The **choices** answer the "why is it like this?" of six months from now. A choice that is not written down looks exactly like a bug.
- Hand the file to your planning skill or agent as the thing to plan from. filo ends with a short build plan (slices in order, each leaving the product coherent) but does not plan the implementation in detail.

## Changing a saved flow

Run `/filo:flow` and say what changes. For one step, it reads the file, asks only about that step and its neighbours, and updates the file in place. For a rethink, it runs the whole session and the new file says which flow it replaces.

## Versions

The format may still change before 1.0. `/filo:page` reads files saved by older versions and rebuilds what they lack; when it does, it says so.
