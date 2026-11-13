---
tags: [flow]
max_turns: 40
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We are in the middle of a flow session on the bookings flow of this app (the project is in the current folder). You have been asking me questions one at a time. My answers so far:

1. What it is for: a member always knows whether they have the room.
2. When a booking expires because no admin confirmed it: the member gets an email that says so.
3. Guests: not supported in the web app.

Your last question was what the member should see when an admin cancels their booking. My answer: nothing by email. We never send emails about bookings, people get too many already. They just see it in the list.
