# The page

The page is how a decided flow is shown: at the end of an interview, or at any later time with `/filo:page`. It is one self-contained HTML file. In Claude Code it is published with the Artifact tool; elsewhere you get the file's path.

The page is a working view. What is kept is the [flow file](flow-file.md), which holds everything the page shows.

## Its parts

<img src="img/page-words.png" alt="The top of the page" width="760">

**The header.** The flow's name, what it is for in one sentence, the numbers that matter (choices of the model to check, open points, new and changed steps, moments), each a link to its part, and the cast: each person with a letter and a colour that follow them down the page. On a wide screen a rail on the left lists the parts and shows where you are. Click a person in the cast to light up only their steps, in the flow and in what changes; click again to see everyone.

**The flow in words.** Five to nine short parts: the idea, each main moment, how it ends, what does not change. Each says what was decided, why, and what follows, including the consequences nobody asked about. Somebody who reads only this should know how the flow works.

<img src="img/page-map.png" alt="The flow" width="440">

**The flow.** Every moment (setting it up, everyday use, each other way in, each way it ends) as one line of steps, in the order things happen. Each step is a pill in the colour of who does it: filled when it is new, outlined when it changes, grey when it stays as it is. A dark arrow is a handoff. A step with a row under "What changes" links to it.

<img src="img/page-storyboard.png" alt="What changes" width="760">

**What changes.** One row for each step that is new or changes, or where something can go differently, grouped by surface (the part of the step's `where` before the first ` · `). Each row says who and where; a changed step shows what happens there today beside what happens with this flow. Under it, the cases that can go differently (empty, error, not allowed, waiting), each with its way out, and the choices that bear on the step. A screen that is new or changes gets a small sketch beside the row. Steps that stay as they are get no row.

<img src="img/page-life.png" alt="The life of the main object" width="760">

**The life of the main object.** Its states on a line, in the order of a normal life, with the jumps drawn as arcs. Only when the object has more than two states and its life is not a straight line.

**Still open.** Only if something is. Each open point has its options, to pick on the page.

**The choices behind it.** Every choice, grouped by who made it: you, the model (proposed, open to objection), or decided before the session, each with links to the steps where it shows. Each of the model's choices has "fine" and "change it" (with a note): the number at the top counts the ones you have not marked yet. Your picks on the open points and on these choices gather in one box, to copy back into the chat.

**Cases covered.** A folded table: every case the system knows (each actor, state, failure, timed event, surface) and its answer: covered by a step, not supported with what the person sees instead, or open.

**Out of this flow.** What was left out on purpose.

The page works at phone width and in light and dark themes.

## `/filo:page`

```
/filo:page            the flow of this conversation, or the only saved one
/filo:page bookings   a saved flow, by name
```

It asks nothing and decides nothing. It takes, in order: the page built earlier in the conversation, a saved flow file, or tells you there is no flow yet. It always starts from a fresh copy of the template, so a flow saved months ago is redrawn with today's page.

When the file was saved by an older version and lacks something (no paths, no "flow in words"), it rebuilds that part from what the file does say and tells you in one line.

## How it is drawn

The template is [`skills/flow/assets/flow-page.html`](../skills/flow/assets/flow-page.html). The model changes two things in it: the `<title>` and one JSON block. The page draws everything from that data, so no diagram is ever written by hand and no text is ever cut: the boxes are HTML and the lines are an SVG layer drawn over their measured positions.

The data, in short:

| Field | Holds |
|---|---|
| `title`, `status`, `value` | the name, where the work stands, what the feature is for |
| `summary[]` | the flow in words: `{ title, text }` parts |
| `labels` | the page's fixed words, translated into your language |
| `actors[]` | `name`, `who`, and their `steps[]` |
| `steps[]` | `id` (a letter per actor and a number: `A1`, `B2`), `title`, `where` (surface first: `Backoffice · Users`), `change` (`new`, `changed`, `same`), `screen` (the sketch), `what`, `today`, `branches[]`, `points` |
| `paths[]` | one per moment: `title`, `when`, and the step ids in the order things happen, across actors |
| `states` | the life of the main object: `nodes[]` and `edges` |
| `decisions[]` | each choice: the question, the answer, `by` (`you`, `me`, `before`), and the `steps` where it shows |
| `points[]` | what is still open, with options and a recommendation |
| `coverage[]` | each case, its source in the code, its answer |
| `out[]` | what is out of the flow |

A path never forks. Two alternatives are two paths; a different outcome at the same steps is a branch of the step. This is what keeps the page honest: alternatives written as one path would be drawn as a sequence that never happens.

A screen sketch is a list of blocks: a title bar, lines of text, fields, rows, buttons, system notes, placeholders. The full description of every field is in the comment above the JSON block in the template, next to a worked example.

## Changing the look

The skills are told not to restyle the page: the same look every time is what makes the tenth flow as quick to read as the first. What varies is which parts appear, and the page decides that from the data. To change it for your team, edit the template (colours are tokens at the top of its `<style>`), then check it as [CONTRIBUTING.md](../CONTRIBUTING.md) describes: on data of a real flow's size, rendered and looked at.
