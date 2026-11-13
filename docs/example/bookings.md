# Room booking flow

Approved 13 Nov 2026. Replaces: nothing (first saved flow).

## Purpose
A member who books a room always knows, before the meeting starts and without asking anyone, whether she has the room, and if not, why and what to do next. It shows when people stop asking what happened to their booking.

## The flow in words
- **The idea.** People ask what happened to their booking because today a booking can end without anyone saying a word: it sits as a draft nobody sent, it expires overnight, or it is still waiting when the meeting starts. The rule now is that Anna always hears the answer before her meeting, and the answer says why and what to do next. Admins keep full control over which bookings go through.
- **Asking for a room.** Drafts are gone. The form sends the booking for confirmation straight away, because a saved draft is the easiest way to believe you have a room you don't. Dropping drafts also closes two holes: every booking is now checked against the limit of three and against other bookings of the same room when it is sent, so two overlapping bookings can no longer both be confirmed. When the form says no (room taken, limit reached, too late, wrong times) it says which, in a sentence, and keeps what she typed, instead of today's "Something went wrong".
- **Waiting.** A booking waits for an admin until whichever comes first: 24 hours after it was sent, or an hour before it starts. Anna's list shows that deadline next to the booking ("answer by Thu 8:00"), so she knows when she will know. A booking sent less than an hour before it starts is refused at once, since no admin could decide in time.
- **The admins' side.** Every admin gets a notice when a booking is sent, and a reminder three hours before it would expire (or halfway there, when the deadline is closer). The admin who made the booking is not notified about their own booking. In the admins' list, waiting bookings come first with their deadline. Saying no is now its own action, Decline, and it needs a short reason, because "An admin cancelled your booking" is exactly the kind of message that makes people ask. When two admins act on the same booking, the second sees who already decided instead of an error.
- **The answer.** Anna gets one notice for every outcome: confirmed, declined with the admin's name and reason, or expired because nobody decided in time. Every notice names the room and the time, since with three bookings "Your booking was confirmed" does not say which. Her list shows the same thing in words, including the expired state, which today appears as raw text.
- **How it ends.** Anna can still cancel her own booking at any time, with no notice (she did it). An admin who cancels a confirmed booking gives a reason, and Anna gets it in the notice. Expiry still frees the slot for others.
- **Switching it on.** On the day this goes live, existing drafts are cancelled. Owners of drafts whose time has not passed get a notice saying the draft was never sent, so they can book again. Bookings already waiting get the new deadline straight away, and any that are already past it expire with a notice.
- **What does not change.** The limit of three waiting or confirmed bookings, admins confirming their own bookings, and the check every ten minutes all stay as they are. That check means a booking can expire up to ten minutes after its deadline, still at least 50 minutes before the meeting. Guests are left out of this flow.

## Actors
- Anna, a member: needs a room for a meeting and wants to know if she has it.
- Luca, an admin: decides which bookings go through.
- Roombook, automatically: the expiry check every ten minutes, and the one-off switch-on.

## Flow
### Anna, a member
A1. **Asks for a room** (Web · New booking; changed). Picks room and time and sends the booking for confirmation in one go.
   - Screen: title "New booking"; Room; From; To; note "An admin will confirm it. If nobody does by an hour before the start, it expires and we'll tell you."; button "Send for confirmation".
   - Today: the button says "Save as draft"; she must then press "Send for confirmation" in her list, and a draft holds nothing.
   - error, when someone already has the room at that time: "Someone already has Room B at that time. Pick another time or room." What she typed stays.
   - limit, when she already has 3 bookings waiting or confirmed: "You already have 3 bookings waiting or confirmed. Cancel one to book another." Link to her bookings.
   - too late, when the meeting starts in less than an hour: "Too late to book this one: an admin needs at least an hour to confirm." She picks a later time.
   - error, when the end is before the start or the time has passed: "The end must be after the start." / "This time has already passed."
   - error, when the room was removed: "This room no longer exists." (as today)

A2. **Sees it waiting, with a deadline** (Web · My bookings; changed). Every booking says in words where it stands; a waiting one says by when she'll know.
   - Screen: title "My bookings"; rows like "Room B · Thu 14 Nov 9:00–10:00 · Waiting for confirmation · answer by Thu 8:00 · Cancel", "Room A · … · Confirmed · Cancel", "Room C · … · Expired: no admin confirmed in time", "Room D · … · Declined by Luca: board meeting"; button "New booking".
   - Today: drafts wait here for a second click, an expired booking shows as "status.expired" with no colour, and nothing says when an answer will come.

A3. **Learns she has the room** (Email and in-app notice; changed).
   - Screen: title "Your booking is confirmed"; "Room B, Thursday 14 November, 9:00–10:00."; button "Open my bookings".
   - Today: "Your booking was confirmed.", without saying which one.

A4. **Learns she doesn't have the room** (Email and in-app notice; changed). One notice whatever the reason, with the reason and a way to book again.
   - Screen: title "You don't have Room B on Thursday at 9:00"; "No admin confirmed it in time, so it expired. The slot is free again."; button "Book another time".
   - Today: expiry sends nothing; an admin's cancel sends "An admin cancelled your booking." with no reason and no booking named.
   - declined, when an admin declined it: "Luca declined it: <reason>."
   - cancelled, when an admin cancelled a confirmed booking: "Luca cancelled it: <reason>."
   - switch day, when she had a draft for a time not yet passed: "Your draft for Room B was never sent, so the room was not held. Book it again if you still need it."

A5. **Cancels her booking** (Web · My bookings; same). Cancels a waiting or confirmed booking. No notice to anyone.

### Luca, an admin
B1. **Hears a booking is waiting** (Email and in-app notice; new). Every admin except the one who made the booking.
   - Screen: title "A booking is waiting for you"; "Anna asks for Room B, Thu 14 Nov 9:00–10:00. Decide by Thu 8:00."; button "Open bookings".

B2. **Confirms or declines** (Web · All bookings; changed). Waiting bookings come first with their deadline; Decline asks for a short, required reason.
   - Screen: title "All bookings"; rows like "Anna · Room B · Thu 14 Nov 9:00–10:00 · Waiting · expires Thu 8:00 · Confirm · Decline", "Marco · Room A · … · Confirmed · Cancel"; on Decline: field "Why are you declining? (Anna will read this)"; buttons "Back", "Decline".
   - Today: the list is titled "My bookings" and mixes everything; the only way to say no is Cancel, with no reason.
   - already decided, when another admin acted first: "Already confirmed by Sara." (or declined). Nothing to do.
   - expired, when the deadline passed while the page was open: "This booking expired at 8:00 and can't be confirmed any more." Anna has been told.

B3. **Gets a reminder** (Email and in-app notice; new). Three hours before the deadline (halfway, if the deadline is closer), only if still undecided.
   - Screen: title "Still waiting: expires at 8:00"; "Anna's booking for Room B, Thu 14 Nov 9:00–10:00, expires if nobody decides."; button "Open bookings".

B4. **Cancels a confirmed booking** (Web · All bookings; changed). Cancel asks for a short reason, as Decline does; Anna gets it in her notice.
   - Today: no reason; Anna reads "An admin cancelled your booking."

### Roombook, automatically
C1. **Expires an undecided booking** (Expiry check, every 10 minutes; changed). At the earlier of 24 hours after sending or an hour before the start, an undecided booking expires, the slot frees up, and Anna is told (A4).
   - Today: only after 24 hours, even if the meeting is over, and nobody is told.

C2. **Closes old drafts** (Once, on switch-on day; new). Existing drafts are cancelled; owners of drafts not yet past get a notice (A4). Waiting bookings take the new deadline; those already past it expire with a notice.

## Paths
1. **Anna books and an admin confirms** (Anna needs a room): A1 → A2 → B1 → B2 → A3
2. **An admin declines** (the room can't be given): B2 → A4
3. **Nobody decides in time** (the admins miss it): B1 → B3 → C1 → A4
4. **An admin cancels a confirmed booking**: A3 → B4 → A4
5. **Anna cancels her booking** (the meeting is off): A2 → A5
6. **Switch-on day** (the day this goes live): C2 → A4

## Life of a booking
- Waiting for confirmation (`pending`): sent from the form. Then: confirmed, expired, cancelled.
- Confirmed: an admin confirms. Then: cancelled.
- Expired: nobody decided within 24 hours or by an hour before the start, whichever came first. Final.
- Cancelled: Anna cancels, or an admin declines or cancels with a reason. Final.
- (`draft` is no longer reachable; existing ones are cancelled on switch-on day.)

## Choices
1. **What is this flow for?** Anna always knows whether she has the room, and if not why and what next, before the meeting starts, without asking anyone. By: the user. Discarded: also reworking the admin side as a goal; only notifying silent endings.
2. **Still waiting when the meeting is close?** It expires an hour before the start and Anna is told. By: the user. Why: admins keep control. Discarded: auto-confirm an hour before; no admin confirmation at all.
3. **How do admins learn a booking is waiting?** Every admin gets a notice when it is sent, and a reminder before it would expire. By: the user. Discarded: notice only on send; no notice, waiting ones on top of the list.
4. **Drafts?** Gone: the form sends the booking for confirmation straight away. By: the user. Discarded: keep drafts with a clear "not sent" label; keep as today.
5. **Notice when a booking expires, or list only?** A notice, the same kind as "confirmed". By: the user (resolving a conflict with answers 1 and 2). Discarded: list only.
6. **Does the 24-hour limit stay?** Yes; the earlier of the two deadlines applies. By: proposed and accepted.
7. **Booking sent less than an hour before the start?** Refused at once with a sentence saying why. By: proposed and accepted. Why: it would expire immediately.
8. **When does the reminder go?** Three hours before the deadline, or halfway when the deadline is closer. By: proposed and accepted.
9. **How does an admin say no?** A Decline action with a required short reason, shown in Anna's notice and list. Cancelling a confirmed booking asks for a reason too. By: proposed and accepted. Why: "an admin cancelled your booking" says neither why nor what next.
10. **What do notices say?** Every notice names the room and the time; refusals name the admin and the reason. By: proposed and accepted.
11. **What does a waiting booking show?** The deadline: "answer by Thu 8:00". By: proposed and accepted.
12. **Errors in the form?** A specific sentence for room taken, limit reached, too late and wrong times; what she typed stays. By: proposed and accepted.
13. **Admins' list?** Titled "All bookings", waiting bookings first with their deadline. By: proposed and accepted.
14. **Two admins act on the same booking?** The second sees "Already confirmed by Sara" instead of an error. By: proposed and accepted.
15. **Admin's own booking?** Other admins are notified, not the one who made it; admins can still confirm their own. By: proposed and accepted.
16. **Switch-on day?** Drafts are cancelled, owners of future drafts get a notice; waiting bookings take the new deadline at once. By: proposed and accepted.
17. **Guests?** Left out of this flow; a separate session on the guest side. By: proposed and accepted. Why: how invitations work is not in this code, and the complaint is about members. Discarded: guests get the same "you don't have the room" notice.
18. **Limit of bookings?** Three waiting or confirmed, as today. By: decided before (server/models/booking.js:3).

## Coverage
| Case | Source | Answer |
|---|---|---|
| state `draft` | server/models/booking.js:1 | removed: A1 sends directly; C2 closes existing ones |
| state `pending` | server/models/booking.js:1 | steps A2, B2 |
| state `confirmed` | server/models/booking.js:1 | step A3 |
| state `cancelled` | server/models/booking.js:1 | steps A4, A5, B4 |
| state `expired` | server/models/booking.js:1 | steps C1, A4, A2 |
| role member | server/roles.js:2 | steps A1–A5 |
| role admin | server/roles.js:2 | steps B1–B4 |
| role guest | server/roles.js:2 · web/router.js:5 | not supported: out of this flow (choice 17); guests are sent to sign-in, as today |
| admin's own booking | server/routes/bookings.js:40 | B1 (others notified), B2 (can confirm, as today) |
| error `roomNotFound` | server/routes/bookings.js:19 | step A1, as today |
| error `limitReached` | server/routes/bookings.js:22 | step A1, limit |
| error `slotTaken` | server/routes/bookings.js:25 | step A1, error |
| times out of order or in the past | server/routes/bookings.js:17 | step A1, error (not checked today) |
| sent less than an hour before the start | server/jobs/expire-bookings.js:6 | step A1, too late |
| error `notDraft` | server/routes/bookings.js:35 | gone with drafts |
| error `notPending` (two admins, or expired meanwhile) | server/routes/bookings.js:43 | step B2, already decided / expired |
| error `notOwner` | server/routes/bookings.js:34 | not supported: buttons only on your own bookings; a forged request gets the generic error |
| error `bookingNotFound` | server/routes/bookings.js:33 | not supported: bookings are never deleted; an old link shows the generic error and the list |
| draft skipped clash and limit checks when sent | server/routes/bookings.js:24, :36 | step A1: every booking checked when sent |
| expiry after 24 hours | server/jobs/expire-bookings.js:3 | step C1, earlier of 24 h or 1 h before start |
| meeting starts while still waiting | server/jobs/expire-bookings.js:6 | step C1 |
| expiry check every 10 minutes | server/jobs/expire-bookings.js:3 | step C1: up to 10 min late, still ≥ 50 min before start |
| notice `bookingConfirmed` | server/routes/bookings.js:45 | step A3, names room and time |
| notice `bookingCancelledByAdmin` | server/routes/bookings.js:56 | step A4, with admin and reason |
| admins never told a booking is waiting | server/routes/bookings.js:36 | steps B1, B3 |
| owner cancels | server/routes/bookings.js:49 | step A5 |
| missing text shows the raw key | web/i18n.js:4 | step A2: every state has its words |
| no colour for `expired` | web/pages/bookings.js:5 | step A2 |
| surface: New booking page | web/pages/new-booking.js:5 | step A1 |
| surface: bookings list | web/pages/bookings.js:7 | steps A2, A5, B2, B4 |
| surface: email + in-app notice | server/notify.js:1 | steps A3, A4, B1, B3 (where in-app notices appear: not verified) |
| bookings whose time has passed | server/models/booking.js:1 | not supported: stay in the list with their last state, as today |

## Out of this flow
- The guest side (choice 17).
- Changing a booking's room or time: cancel and book again, as today.
- How long past bookings stay in the list.
- Changing the limit of three, the 24 hours or the one hour.
- Recurring bookings.

## Scenarios
- Given Anna has fewer than 3 active bookings and Room B is free on Thu 9:00–10:00, when she sends the form, then the booking is "Waiting for confirmation · answer by Thu 8:00" in her list and every other admin gets a notice.
- Given Room B is already waiting or confirmed for someone at that time, when Anna sends the form, then she reads "Someone already has Room B at that time…" and her inputs stay.
- Given Anna has 3 bookings waiting or confirmed, when she sends the form, then she reads "You already have 3 bookings waiting or confirmed…" with a link to her bookings.
- Given the meeting starts in 40 minutes, when Anna sends the form, then she reads "Too late to book this one…" and nothing is created.
- Given the end is before the start, or the start has passed, when Anna sends the form, then she reads the matching sentence and nothing is created.
- Given the room was removed, when Anna sends the form, then she reads "This room no longer exists."
- Given Anna sent a booking on Wed 17:00 for Thu 9:00, when she opens her list, then it reads "answer by Thu 8:00".
- Given a waiting booking, when an admin confirms it, then Anna gets "Your booking is confirmed — Room B, Thursday 14 November, 9:00–10:00."
- Given a waiting booking, when Luca declines it with a reason, then Anna gets "You don't have Room B… Luca declined it: <reason>" and her list shows "Declined by Luca: <reason>".
- Given a waiting booking, when Luca presses Decline without a reason, then he cannot submit until he writes one.
- Given a waiting booking still undecided 3 hours before its deadline, then every admin (except its owner, if an admin) gets the reminder.
- Given a waiting booking undecided at its deadline, when the check runs, then it becomes Expired, the slot is free, Anna gets "No admin confirmed it in time…" and her list shows "Expired: no admin confirmed in time".
- Given Sara confirmed a booking, when Luca then presses Confirm or Decline on it, then he sees "Already confirmed by Sara."
- Given a booking expired while Luca's page was open, when he presses Confirm, then he sees "This booking expired at 8:00 and can't be confirmed any more."
- Given a confirmed booking, when Luca cancels it with a reason, then Anna gets "Luca cancelled it: <reason>."
- Given an admin sends a booking, then the other admins get the notice and that admin does not.
- Given Anna cancels her own booking, then it shows Cancelled and nobody gets a notice.
- Given Anna has a draft for next week on switch-on day, then it becomes Cancelled and she gets "Your draft for Room B was never sent…"; a draft for a past time is cancelled with no notice.
- Given a booking already waiting on switch-on day whose new deadline has passed, then it expires at the next check and Anna is told.
