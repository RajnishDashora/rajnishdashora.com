---
title: "AI Coding Agents: The Chaos Isn't the Model — It's the Missing Harness"
date: "July 13, 2026"
excerpt: "Coding with AI agents feels like a slot machine — brilliant one pull, broken the next. The fix isn't a better model; it's the harness you build around it, and how you treat its building blocks."
---

Coding with an AI agent feels like a slot machine.

One pull, it ships a clean feature in minutes. The next, it invents an API that doesn't exist and confidently breaks your build. Same model, same kind of prompt — wildly different outcomes.

The instinct is to blame the model, or wait for the next one. That's the wrong lever.

The chaos isn't a model problem. It's a *missing-structure* problem.

## The part you actually build

Strip an agent down and there are two parts. There's the **model** — the reasoning engine, which the provider ships and you don't control. And there's everything wrapped around it: the instructions, the tools, the checks, the limits. That second part is the *harness*, and it's entirely yours to build. Which is the whole point: **the reliability is yours, because the part that decides it is yours.** You can't outsource it to a model you didn't train.

It's the same shape as platform engineering — the model is the engine; the harness is the paved road that lets a whole org drive on it safely.

That work has a name now — *harness engineering* — and its building blocks are increasingly called **agent primitives**.

![Without a harness, the same prompt yields random outcomes — ships, breaks, ships, breaks: a slot machine. With a harness, the agent's work runs through tests and evals before it ships, and failures loop back to the agent, not to you — you review the harness once, and it reviews every run: an assembly line.](/diagrams/2026-07-13-slot-machine-to-assembly-line.excalidraw.svg)

## What agent primitives are

Agent primitives are the small set of reusable building blocks you compose to steer an agent — the same way platform primitives (containers, pipelines, service templates) steer a cloud. You're not tuning weights. You're assembling structure *around* the model.

![The agent primitives, treated like production code: instructions / specs (AGENTS.md, CLAUDE.md, skills), context, tools + MCP, guardrails & hooks, sub-agents, and evals — versioned artifacts you own, review, and test. When each is explicit, a flaky agent becomes debuggable.](/diagrams/2026-07-13-primitives-like-code.excalidraw.svg)

The set the field is converging on:

**Instructions / spec files** — the agent's role, goals, and boundaries (`AGENTS.md`, `CLAUDE.md`, skill files). Intent, written down and versioned.

**Context** — what the agent can see, and when: docs, architecture, examples, memory. I've learned the leverage lives here, not in clever prompting — get the context wrong and the smartest model still guesses.

**Tools (and MCP)** — the actions an agent is allowed to take, each defined tightly enough that it knows when to reach for one. The Model Context Protocol has become the common way to wire them in.

**Guardrails & hooks** — deterministic code that fires at fixed points (before a tool call, before a commit) to enforce the rules you refuse to leave to the model's discretion.

**Sub-agents & orchestration** — narrow specialists you can hand a scoped job, and the glue that decides who runs when.

**Evals** — the checks that catch a bad *how*, not just a bad answer: did it reason soundly and use the right tools, or just land somewhere plausible?

None of these are exotic — and that's the point. Look across the serious coding agents — Claude Code, Copilot, Cursor, Codex — and you see the same small set of pieces, just wired together differently. We're past hand-crafting a bespoke agent for every task; the real work now is in how you compose the same few primitives.

## My stand: primitives are engineering artifacts, not vibes

The stand is simple: **treat your agent primitives as first-class, versioned engineering artifacts** — reviewed, tested, and owned like any other production code.

The moment you do, the chaos stops being random. A flaky agent becomes a *debuggable system*: the spec was ambiguous, the context was stale, a guardrail was missing, an eval didn't exist. Each is fixable. And each fix compounds — for the whole team, not just the one senior engineer who happened to hold the magic prompt in their head.

That's the real shift I keep seeing: the cheap part and the hard part swapped places. Writing the code is nearly free now; the value moved to deciding what's right, proving it, and steering. **Primitives are how you write that judgment down** so it survives past one engineer's head.

And how much of that structure a task needs is a *blast-radius* question, not a matter of taste. On one end is *vibe coding* — casual, throwaway, perfect for a prototype. On the other is *agentic engineering* — specs, guardrails, evals, checks at every step. Most work lives in between, and the honest skill is drawing that line per task instead of picking one dogma for everything. You can run the fanciest agent on the market and still be vibe-coding — if nothing checks the output before it ships, that's all it is.

Nobody blinks if a throwaway landing page gets vibe-coded. But "we vibe-coded the payment service" is a sentence that should end a meeting. Same tools, different stakes — and the primitives you invest in scale with the stakes.

## At enterprise scale, this is a trust problem

In regulated environments, the harness isn't a productivity nicety. It's the thing that makes agentic engineering safe to ship at all — and it maps directly onto the [trustworthy-AI framework I wrote about earlier](https://rajnishdashora.com/posts/2026-07-05-earning-enterprise-ai-trust), now pointed at the way you build software.

Start with verification, because an agent fails in two different ways — and you have to catch both.

A **test** answers the question you already know how to ask: is the output correct — input X, output Y? An **eval** answers the one that actually bites you in production: did the agent get there sanely — sound reasoning, the right tools, no lucky guess? An agent that's right for the wrong reasons is a time bomb. So I treat eval coverage the way I treat test coverage: a release gate, not a nice-to-have.

Around that sit the enterprise primitives — the same ones that earn a compliance team's trust anywhere else:

**Deterministic guardrails** — business rules (limits, RBAC, compliance thresholds) enforced in code the agent runs inside, not in a prompt it can decide to ignore.

**Inherited identity** — the agent operates with the requesting user's permissions and never escalates.

**An immutable audit trail** — every action logged so a reviewer, or a regulator, can replay exactly what happened and why.

This is compliance-by-design, applied to how the software gets built. The agent writes the code; the harness makes the code trustworthy.

## The takeaway

The chaos of coding with agents never fully disappears. You don't eliminate it — you *contain* it. Agent primitives are the unit of that structure; the harness is the system they add up to.

Good platform engineering has always been about turning chaos into paved roads — letting a whole org move fast without breaking things. Harness engineering is that same move, one level up: from paving roads for people to paving roads for agents.

Better models are coming. They won't save an unstructured team — the harness will.
