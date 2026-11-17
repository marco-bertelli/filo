---
name: page
description: Draws or redraws the visual page of a flow that is already decided - each moment as a line of steps, what changes on each surface with today beside tomorrow and the screens, the life of the main object, the choices behind it. Use when the user asks to see, show, draw, redraw or refresh the page, the diagram or the picture of a flow, for a flow saved in the project (product/flows) or the one just built in this conversation. It asks nothing and decides nothing. To design a flow or change one, use the flow skill instead.
---

# Page

Draw the page of a flow that already exists. Nothing is decided here: no interview, no new choices. If what you read does not hold together, draw it as it is and say so in one line. Changing a flow is the `flow` skill's work.

Write to the user in their language, and keep their names for things.

## Which flow

Take the first that applies:

1. **The page of this conversation.** If a `flow-<slug>.html` was built earlier in this conversation, the JSON in its `flow-data` block is the flow.
2. **A saved flow.** `product/flows/<slug>.md` in the repository, or wherever the project keeps its flows (its instruction files say). With one file, take it. With several and no name given, list them in one line and ask which.
3. **Neither.** Say there is no flow to draw yet, and that `/filo:flow` builds one.

## Drawing it

The page comes from `../flow/assets/flow-page.html` (paths are relative to this skill's folder), and the rules for it are in "4. The page" of `../flow/SKILL.md`. In short:

1. Start from a fresh copy of the template, outside the repository, as `flow-<slug>.html`. Do this even when a page already exists: the template may have changed since, and the old data moves into the new one.
2. Change only the `<title>` and the JSON in the `flow-data` block. The comment above the block explains every field. Translate `labels` into the user's language.
3. Check that the block parses as JSON.
4. Publish it with the environment's page tool if there is one (in Claude Code, the Artifact tool, following its rules). Otherwise give the file's full path.

Do not restyle the page and do not draw diagrams by hand: the page draws them from the data, and leaves out by itself the parts that do not apply (no row for a step that stays the same, no life figure for a straight line).

### From a saved flow file

| In the file | In the data |
|---|---|
| Purpose | `value` |
| The flow in words | `summary[]`: each part's title and text |
| Actors, Flow | `actors[]` and their `steps[]`: keep the ids; the step's "new / changed / same" is `change`, its "Screen" line becomes the `screen` blocks, "Today" is `today`, the cases under it are `branches` |
| Paths | `paths[]` |
| Life of ... | `states` |
| Choices | `decisions[]`; "By" gives `by`: the user is `you`, proposed and accepted is `me`, decided before is `before`; "Steps" gives `steps` |
| Coverage | `coverage[]` |
| Out of this flow | `out[]` |

A file saved by an older version may lack some of this. Then:

- **No "The flow in words".** Write it from the purpose, the steps and the choices with their "Why", as the template's comment describes. Do not invent reasons the file does not give.
- **No paths.** Build them from the scenarios and the order of the steps: one path per moment, alternatives in separate paths. Say that you did.
- **No screen lines.** Sketch a screen only from what the step's text says is on it. Do not invent controls.
- **No "new / changed / same".** Leave every step as `same`.
- **No "Steps" on the choices.** Give a choice its `steps` only where its text or its "Why" names the step's screen or action plainly; otherwise leave it out. Say that you did.

### From the page of this conversation

Move its JSON into the fresh template. If it was written for an older template (steps with `next` or `apart`, no `paths`), write the `paths` from what the session decided and drop the old fields. If its `where` values do not start with the surface ("Backoffice · Users"), rewrite them so they do: the page groups what changes by it.

## What to write with it

Where the page is, and one line on anything you had to rebuild or could not draw. Nothing else: the page is the answer.
