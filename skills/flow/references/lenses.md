# The inventory and the lenses

Two instruments. The inventory is what the system already says about the cases. The lenses are the questions asked at every step.

Both exist for the same reason: a flow feels unfinished where nobody decided what happens, and nobody decides about a case they did not think of. Reading the cases off the system, then asking the same questions at every step, turns "did we think of everything?" into a list that can be checked.

## Contents

- The inventory: what to collect, and where it hides
- The cross-check: is every case shown somewhere?
- The lenses: the questions at each step
- Siblings: the same thing done elsewhere

## The inventory

Collect these for the neighbourhood of the feature: the objects it touches, the screens it appears on, the people who meet it. Not the whole product. Keep `path:line` for each item: it is the evidence behind a question, and it goes on the page.

| What | Why it matters to the flow | Where it usually hides |
|---|---|---|
| **Actors**: every kind of person or system that can meet the feature | Each one walks a different path, and the one nobody listed gets the broken one | Role enums and constants; permission checks and route guards; "is the owner" comparisons; anonymous or invited access; API keys and integrations; jobs and webhooks that act with nobody watching |
| **Surfaces**: every place the feature is seen or triggered | The same step exists once per surface, designed or not | Routers and page folders of each frontend; navigation menus; embedded views (iframe, widget); emails, push, SMS, chat bots; public API and CLI; exports and generated links |
| **Objects and states**: what the feature creates or changes, and every state it can be in | Every state is something a person will, sooner or later, be looking at | Schemas and models; status enums; boolean flags; fields whose emptiness means something (no owner = everybody's); soft-delete markers; expiry dates; counters and limits; settings and feature flags that change behaviour |
| **Transitions**: what moves an object from one state to another, and who may do it | Each one needs a trigger somebody can find, and has consequences for whatever pointed at the object | Create, edit, submit, share, approve, cancel and delete handlers; state machines. For each: who is allowed, and what else stores this object's id |
| **Failures**: every way the system can say no | Each one is a screen: either a sentence with a way out, or a dead end | Error keys and codes returned by the handlers involved; validation rules (required, unique, maximum); conflicts and "already done"; not found, gone; quotas, limits, budgets; timeouts and unreachable services |
| **Time**: everything that happens later, or takes long | The person is not there when it happens, so the flow has to bring them the news | Scheduled jobs and queues; expirations (links, tokens, trials, things left pending); retention and cleanup; long work and its intermediate states; reminders and notifications |
| **Entry points**: how somebody arrives | A feature nobody arrives at does not exist | Menu items; links from other screens; emails and notifications; deep links and shared URLs; search; first-run screens |

A product with no code yet: fill the same table from the user's words and documents, and mark every row "assumed".

## The cross-check: is every case shown somewhere?

This is the step that finds what reading one file at a time never does. It compares the two sides of the product.

- **Each state and each failure, on each surface.** Find the place that turns the value into words: a string catalogue, a switch on the status, an error handler. A value that falls through to a default (a blank badge, the raw key, "something went wrong") is an open point.
- **Each actor the backend admits.** Is there a screen that admits them too? An actor the API serves and no page lets in is an open point. So is the reverse.
- **Each timed event, and each change made by somebody else.** Does anything tell the person affected? Compare with the neighbours: when other changes of the same object notify and this one does not, it is an inconsistency, not a missing feature.

## The lenses

Take each actor through each step of the flow and ask these. Not every lens bites on every step. The answers that come out as "nobody decided" are the open points: each one becomes a question for the user, or a choice you make yourself and show on the page.

1. **Arriving.** How does this person get here, and from where else could they (a link, an email, another surface)? Would they find it without being told?
2. **First time.** What do they see with nothing there yet? Does the empty screen say what this is for and what to do next?
3. **Understanding.** Before they act, do they know what the thing is called, what will happen, who will see it, and what it costs (money, time, a limit used up)? Is each word used with one meaning, the same as everywhere else in the product?
4. **Waiting.** When it takes more than a moment: what do they see meanwhile, can they leave, how do they learn it finished, what if they close everything? When the wait has an end in the real world (the meeting starts, the offer closes, the shift begins), what happens if the thing is still waiting at that moment? A deadline the system keeps and the moment the person cares about are rarely the same clock.
5. **Failing.** For each failure in the inventory that can happen here: what do they read, and what can they do next? Is what they typed still there?
6. **Not allowed.** What does a person without the right see: nothing, a disabled control with a reason, or an error after the click? Is it the same rule as elsewhere?
7. **Changing their mind.** Can they go back, stop halfway, undo afterwards, delete? What happens to everything that depended on it: people it was shared with, things scheduled on it, links already sent?
8. **Coming back.** Tomorrow, where is it? What tells them something changed while they were away?
9. **Other people.** Who else sees it or is affected, what does each of them see, and when? What if the owner leaves or loses access? What if two people act at once?
10. **How many.** With none, one, many, and one past the limit: does the step still work and still make sense?
11. **Elsewhere.** The same step on every other surface in the inventory: present, different or absent, and is that on purpose?
12. **Switches.** For each setting or flag that changes this step: what happens with it on, with it off, and on the day somebody flips it for people already using the product?
13. **Arrived.** Does the path end in the outcome of the value sentence? What tells the person they got there, and what is the natural next thing?

## Siblings: the same thing done elsewhere

For each kind of thing the flow does (sharing, deleting, confirming, naming, notifying, saying no), find where the product already does it. Search for the same field names and the same verbs. Then compare the behaviour: who can, what the others see, which words are used, whether it can be undone.

Same as the siblings: nothing to ask. Different: an open point, unless a recorded decision explains the difference. A new feature that behaves differently from three old ones teaches the user that nothing they learned carries over.

This is also where reuse comes from. A step that an existing screen or mechanism already does should be that screen or mechanism.
