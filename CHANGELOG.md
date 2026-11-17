# Changelog

## 0.1.0-beta.2 (2026-11-17)

- The page is redesigned around reading and approving, overview first: the numbers that matter at the top (choices to check, open points, new and changed steps, moments), each moment as one line of steps coloured by who acts, the flow in words as one reading column, then "What changes": one row per step that is new or changes, grouped by surface, with today beside tomorrow and the screen. The grid map and the storyboard are gone. The life of the object is drawn only when it is not a straight line. A rail on wide screens lists the parts. The data format is unchanged except for the optional `steps` on choices.
- Reviewing on the page: each choice the model made has "fine" and "change it" with a note, and the picks gather with the open points in one box to paste back. Choices can name their `steps` (a new optional field, "Steps:" in the flow file): each step lists its choices and each choice links to its steps. Clicking a person in the cast lights up only their steps.
- `flow`: proposes splitting a feature into several flows when the reading shows more than about fifteen questions or five kinds of people.

## 0.1.0-beta.1 (2026-11-13)

First public beta.

- `flow`: the flow design interview. Reads the system first, opens in six lines, asks one question at a time with options and a recommendation, checks each answer against the earlier ones and the product, draws the page, saves the flow file on approval.
- `page`: draws the page of a flow that is already decided, from the conversation or from a saved flow file, including files saved in an older format.
- The page: the flow in words, a map with one column per person and one band per moment, the life of the main object, a storyboard with screen sketches, open points, choices by who made them, a coverage table. Phone width, light and dark.
- Two eval cases on a fictional room-booking app.
- README: a demo recorded from a real session, and the flow file that session saved as an example.
