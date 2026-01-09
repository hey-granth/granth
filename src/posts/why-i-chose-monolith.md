---
title: "Why I chose Monolith for a Production Backend"
date: "2026-01-09"
summary: "I thought microservices meant maturity, until real constraints forced me to unlearn that assumption entirely."
tags: ["architecture", "backend", "engineering"]
---


When I first got to know about the project I had to deliver, microservices felt like the obvious choice.

It was my first time working on something this big. Bigger than the stuff I was genuinely used to. The system had multiple user roles, each with different responsibilities, different flows, different expectations. It had to *do a lot*. Naturally, my brain went:

> “Break it down. Smaller services. Easier to scale. Easier to manage. This is how real systems are built.”

Very sensible. Very junior. Very wrong.

---

## The Conversation That Changed Everything

Right before I started planning things out, I had a conversation with one of my seniors. The kind you listen to even when they’re silent.

He asked me why I was going with microservices.

I said, confidently and incorrectly:
> “Because that’s how we scale to a larger user base.”

He smiled. That smile seniors give when they know you’re about to learn something the hard way, but they’re feeling generous today.

He asked:
> “How many users are you actually building this for?”

I told him the number. Around a thousand users. The client wanted it to work *perfectly* at that scale. No drama.

He said something that stuck:
> “A properly built monolith can handle much more than that without breaking a sweat.”

Then he walked me through the part no blog post and no hype thread really emphasizes.

Microservices don’t remove complexity.  
They **move it**.

And most of the time, they add more of it.

---

## The Mistake I Was About to Make

I thought microservices would make things easier because:
- smaller codebases
- isolated responsibilities
- independent deployments
- “industry best practices”

What I wasn’t accounting for:
- inter-service communication
- data consistency across services
- distributed transactions
- auth duplicated everywhere
- versioned APIs between my *own* code
- debugging across multiple logs and timelines
- local development turning into orchestration hell

For a system targeting ~1k users, this would have been self-inflicted pain.

Not “scaling problems”.  
**Coordination problems.**

---

## Choosing the Monolith (Reluctantly)

So I pivoted.

Not to a messy, everything-in-one-file monolith.  
To a **modular monolith**.

Single deployable backend.
Single primary database.
Clear internal modules.
Background workers where needed.
Strict boundaries enforced by code and permissions, not network calls.

No premature distribution. No architectural cosplay.

Just a system designed to work.

---

## What I Learned While Actually Building It

### Simplicity Compounds

Once I started building, the benefits weren’t theoretical. They were immediate.

- Deployments were boring (the good kind)
- Tests were fast and meaningful
- Refactors were possible without coordination meetings
- Schema changes didn’t feel like defusing a bomb
- Debugging meant reading code, not tracing requests across services

Everything lived in one place. My brain thanked me.

---

### Data Consistency Wasn’t a Research Project

The system had multi-step workflows that *had to be correct*.

In a monolith:
- transactions are real
- rollbacks work
- invariants are enforceable
- failures are predictable

I didn’t need sagas. I didn’t need compensating actions. I needed correctness.

And I got it.

---

### Async Didn’t Mean Distributed

Heavy work ran in the background.

But background jobs operated on the same models, the same schema, the same assumptions.

No serialization gymnastics.
No contract drift.
No “why is this field missing in prod but not locally” moments.

Async was about *timing*, not *topology*.

---

### Testing Was Honest

I could spin up the system, run migrations, hit real code paths, and know that tests meant something.

No mocking half the architecture.
No pretending network calls wouldn’t fail.
No guessing which service owned what.

When tests failed, it was my fault. That’s a feature.

---

## Would Microservices Have Helped?

Not here. Not then.

They would have:
- slowed iteration
- increased operational overhead
- made debugging harder
- introduced failure modes I didn’t need
- solved problems I didn’t have

Microservices shine when teams need autonomy and systems need isolation.

This system needed **correctness, speed, and clarity**.

---

## This Isn’t an Anti-Microservices Rant

Important clarification.

Microservices are great.
For the right problems.
At the right time.
With the right team.

This was not that time.

Choosing a monolith here wasn’t conservative.  
It was realistic.

---

## The Actual Lesson

Most people don’t pick microservices because they need them.

They pick them because:
- they sound scalable
- they look impressive
- they’re afraid of “outgrowing” a monolith
- the internet told them so

But architecture is not about vibes.  
It’s about constraints.

Given my constraints, the monolith wasn’t just enough.  
It was *better*.

---

## Closing

I didn’t choose a monolith because microservices are bad.

I chose it because:
- the scale didn’t justify the overhead
- the team size didn’t demand distribution
- the system needed to be correct more than clever
- and I actually wanted to ship something solid

Turns out, boring architecture is underrated.

And yeah. My senior was right. Obv.
