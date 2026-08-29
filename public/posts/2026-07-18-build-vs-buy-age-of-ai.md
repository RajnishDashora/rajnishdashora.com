---
title: "Cost, Capability, Experience: A CTO's Build-vs-Buy Philosophy for the Age of AI"
date: "July 18, 2026"
excerpt: "AI didn't kill build-vs-buy — it moved the line, and most teams are still deciding with the old map. A three-lens philosophy for what to build, what to buy, and the one thing you should always own."
slug: "2026-07-18-build-vs-buy-age-of-ai"
pillar: "CTO"
---

AI didn't kill the build-vs-buy decision. It moved the line — and most teams are still deciding with the old map.

For a decade the answer quietly drifted one way: buy. Building was slow, expensive, and risky, so the sane default was to find a SaaS vendor for almost everything and build only the few things that were truly yours. Cost did most of the deciding.

AI reopened the question by inverting the economics on both sides at once. It collapsed the cost to *build* — an agent can stand up the glue, the integrations, the CRUD in an afternoon. And it flooded the market with things to *buy* — every vendor is now "AI-powered." So both instincts now fire for the wrong reasons: *"just build it, it's cheap now"* and *"just buy it, there's a tool for that."* That's exactly why it's worth thinking about again — the old reflexes are miscalibrated.

Here's the thing build-vs-buy always was, and still is: **a strategy question wearing a cost question's clothes.** Every one of these calls is a statement about what you believe is worth owning.

I decide it with three lenses. AI doesn't replace them — it changes what each one tells you.

![Three lenses for build-vs-buy in the age of AI: Cost (count what you'll own, not what you pay — the real bill is the harness), Capability (is it your moat or table stakes? the model isn't your moat), and Experience (control, data, and the freedom to leave). Build-vs-buy is a strategy question wearing a cost question's clothes.](/diagrams/2026-07-18-three-lenses-build-vs-buy.excalidraw.svg)

## Cost — count what you'll own, not what you'll pay

Sticker price is the least interesting number. What matters is the total cost of *owning* the thing for years, and the two curves move in opposite directions: a bought tool's cost compounds — seats, usage tiers, the price hike at renewal — while a built system's cost is front-loaded and then amortizes. The real question isn't "which is cheaper today," it's "where does this cross over, and will we still be running it then."

AI flips the intuition here. The cost to build collapsed — but the cost to run an AI system *reliably* did not. The real bill is the harness: the evals, the guardrails, the monitoring that keep a non-deterministic system trustworthy — plus the churn of models changing underneath you. The cheapest AI feature to *build* is often the most expensive to keep *honest*. "It was cheap to build" and "it's expensive to own" are now routinely the same sentence.

Buying hides its own costs on the other side. Integration is always underestimated, and the switching cost you're signing up for is real — a tool that's cheap to adopt can be brutally expensive to leave. Put the five-year number on the table, harness included, before anyone says "obviously buy."

## Capability — is this your moat, or table stakes?

The oldest rule still holds: build what differentiates you, buy what doesn't. What changed is where the line sits.

AI moved a huge amount of yesterday's "build" into today's "buy." Reasoning, extraction, summarization, transcription, a competent chatbot — that's a commodity API call now. Building it yourself is nostalgia, not strategy, and every hour spent there is an hour not spent on the part only you can build.

But the same shift makes the moat question sharper. **The model is not your moat** — your competitors call the same one. Your moat is what the model can't ship: proprietary data that compounds with use, your workflows, your domain logic, the reliability bar you hold. There's a simple test I apply: *could a competitor rebuild this over a weekend with the same public APIs?* If yes, it isn't a moat, it's a feature — don't pour your scarce build capacity into it. A thin wrapper — a prompt and a nice UI over someone's API — is not differentiation, no matter how good the demo looks.

## Experience — control, data, and the freedom to leave

The third lens is control: over the integration, the data, and your own future.

In regulated or data-sensitive work, this one often decides for you before the other two get a vote. If your value — or your risk — lives in proprietary or sensitive data, you can't route all of it through a third party and hope. Control over access, lineage, residency, and compliance pulls you toward building, hosting, or at least orchestrating more of the stack yourself. (It's the same trust discipline I wrote about in [earning enterprise AI trust](https://rajnishdashora.com/posts/2026-07-05-earning-enterprise-ai-trust), applied to procurement instead of product.)

And guard your exits. Lock-in is the tax you don't see until you try to leave, and in the AI stack it's sharper than usual — swap a model and behavior shifts underneath you. The defense is architectural: standardize the seams. Put a thin, owned abstraction in front of the model and the vendor tools, so a price hike, a deprecation, or a better model next quarter is a config change, not a rewrite. You want to be able to leave even when you have no intention of leaving.

## How I actually run the decision

The three lenses collapse into a short sequence I can run in a meeting:

**Is it our moat?** If it's genuinely differentiating — our data, our workflow, our edge — build it, even if buying looks cheaper this quarter. You don't outsource the thing you compete on.

**Is our data or risk inside it?** If sensitive or regulated data flows through it, build, self-host, or orchestrate it under your control. Compliance is not a feature you can procure your way out of.

**Otherwise, buy the commodity — but keep the seam swappable.** Default to buying anything generic, and wrap it so you're never welded to one vendor.

When it's ambiguous, the tie-breaker is *buy to learn, build to own*: start with a bought tool to move fast and find out whether the capability is actually a moat — then internalize it once you know it's worth owning. The mistake is skipping the question entirely, which is how teams end up in the two classic traps: **building the commodity** out of not-invented-here pride, and **buying the moat** — renting the exact capability that was supposed to set them apart.

## The new frame: buy the commodity, build the moat, own the harness

Put it all together and the old binary dissolves. In the age of AI the question isn't "build or buy?" — it's **"own or orchestrate?"** And the honest answer is usually both. Most strong AI stacks I see settle into an 80/20: vendor platforms for the generic 80%, owned code for the critical 20% — connected by seams you control.

**Buy the commodity** — the foundation model, the plumbing, the generic integrations. Speed you can't out-engineer.

**Build the moat** — your data layer, your workflows, your domain logic. The 20% you actually compete on.

**Orchestrate the seams** — a thin, owned routing and tool layer, so nothing is welded shut.

![Buy the commodity, build the moat, own the harness: buy the foundation model, plumbing, and generic integrations; build your data, workflows, and domain logic (the 20% you compete on); and always keep the harness — evals, guardrails, reliability — in-house. Orchestrate the seams so models and vendors stay swappable.](/diagrams/2026-07-18-buy-build-own.excalidraw.svg)

And the one thing I'd always keep in-house: **the harness** — the evals, guardrails, and reliability layer around whatever you buy or build. That's where trust lives, and increasingly where the differentiation lives too. You can rent the intelligence. You can't rent the accountability.

## The takeaway

AI made building cheap. It didn't make owning free.

Buy the commodity. Build the moat. Own the harness. And decide it as strategy — because that's what it always was.

Where's the line for you right now — the last thing you'd never let a vendor own?
