# Getting started

## Install

You need [Claude Code](https://claude.com/claude-code) with plugin support.

```
/plugin marketplace add marco-bertelli/filo
/plugin install filo@filo
```

Start a new session afterwards. `/filo:flow` and `/filo:page` should appear among the commands.

To update later: `/plugin marketplace update filo`.

## Your first session

Open Claude Code in the repository of your product and either run `/filo:flow` or simply say what you want to think through:

> The bookings flow feels unfinished: people keep asking what happened to their booking. Before we touch anything I want to go through the whole flow.

### 1. It reads

It tells you in one line that it is reading, and then reads: the roles, the screens, the states an object can be in, the errors the server can return, the jobs that run later, the flows and decisions already written down. On a large codebase this takes a few minutes. If your frontends live in other repositories, say where: it will follow.

### 2. It opens

Six lines at most: what it read, how the feature works today, how many questions to expect. Then the first question, always about what the feature is for.

### 3. You answer

Each question is a situation and a few ways it could go. You can:

- pick an option;
- answer in your own words;
- say "you choose": it takes its recommendation and marks the choice as its own.

Every four or five answers it shows the flow so far in a few numbered lines. Read those: it is the cheapest moment to catch a wrong turn.

When an answer contradicts something (an earlier answer, a decision recorded in the project, the way the system works), it stops and asks which one holds. This is the part worth the session. Do not rush it.

You can say "enough" at any time. The questions left take their recommendations.

### 4. It shows the page

One page with the whole flow. With it you get a short message: where the page is, the three or four choices it made by itself that most deserve a look, and what it could not verify. Read "The flow in words" first, then follow the map.

Ask for changes in plain words ("the colleague should not get a notice when the owner takes it back"). It changes the same page and tells you what changed.

### 5. You approve

Say the flow is right. It writes `product/flows/<name>.md` (or the place your project already uses for product documents) and gives a short build plan: slices in order, each leaving the product coherent if work stopped there.

## Afterwards

- **Build from the file.** Start the implementation from the flow file, with your usual planning skill or by hand. The scenarios at its end are the acceptance test.
- **See it again.** `/filo:page <name>` redraws the page from the saved file at any time.
- **Change one step.** Run `/filo:flow` and say which step changes. It reads the saved file, asks only about that step and its neighbours, and updates the file.
- **Commit the file.** It is part of the product, like a migration or a test.

## Tips

- Answer as the product owner, not as the developer. The session keeps file names and code terms out of the questions on purpose.
- If a question is about something you really do not care about, say "you choose". Fifteen questions is the ceiling; past that it should be deciding, not asking.
- Keep your own names for things. If it renames one of your concepts, say so: it is told not to.
- The session works in your language. The page's fixed words are translated too.
- To skip the session for a change that does not need it, say so. It will tell you in one line what goes unchecked, then build.
