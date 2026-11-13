# Contributing

filo is in beta and small. The most useful contributions right now, in order:

1. **A session that went wrong.** Open an issue with the question (or the page) that failed and what you expected. Remove anything private first.
2. **A test case** that pins a behaviour down (see below).
3. **A change** to a skill or to the page, with the check that shows it works.

## Working on it

```bash
git clone https://github.com/marco-bertelli/filo
claude --plugin-dir ./filo
```

`claude plugin validate .` checks the manifest and the skills' frontmatter.

## Ground rules

- **Generic.** No product, company or stack names in the skills. Examples use the fictional room-booking app in `evals/files/roombook`.
- **Explain, do not shout.** The skills tell the model why a rule exists. A rule with its reason survives situations the rule did not foresee.
- **One question at a time** is the product. A change that makes the opener longer or batches questions needs a very good reason.
- **The page is not restyled per flow.** Changes to its look go in the template, for everybody.

## Checking a change to a skill

The cases in `evals/` run with and without the plugin and report the difference:

```bash
claude plugin eval . --scaffold --allow-tools Write Edit Bash --runs 1 --no-publish
```

These are real model runs and cost real tokens.

A conversational skill is not verified by its first message. For a change to the interview, play a whole session: scripted turns with `claude -p` and `--resume`, through to the page and the saved file.

To add a case, copy one of the folders in `evals/`: `prompt.md` (the user's message), `case.yaml`, and one file per assertion in `graders/`. Assertions should be checkable from the transcript: "asks exactly one question", not "asks good questions".

## Checking a change to the page

`skills/flow/assets/flow-page.html` opens in a browser as it is, showing its built-in example.

A small example hides layout faults. Before sending a change:

- fill the template with a flow of real size (five actors, fifteen steps, eight paths is a fair test);
- look at it at about 1280, 820 and 400 px wide, in light and dark;
- check that data without `paths` still draws (the page falls back to one path per actor).

Screenshots in the pull request help.

## Pull requests

Small and focused. Say what you changed, why, and how you checked it. Add a line to `CHANGELOG.md`.

By contributing you agree that your contribution is released under the [MIT licence](LICENSE).
