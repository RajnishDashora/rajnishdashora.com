---
title: "The Agent-Primitive Playbook Is Already Written. Adopt It in Order of What You Can't Retrofit."
date: "September 15, 2026"
excerpt: "The advice on governing agent instructions has converged: owners, behavioral review, regression gates, cleanup, run-level records. What's missing is the order. Sort every practice by what it costs to add later, and the sequence looks nothing like the checklists."
slug: "2026-09-15-agent-primitives-adopt-what-you-cant-retrofit"
pillar: "ENG"
---

The advice on agent primitives has converged, and fast.

Put an owner on every instruction file. Review changes against behavior, not wording. Keep a small set of recorded tasks and block the merges that regress them. Clear out rules that have gone stale. Read the engineering guides published this year and you'll find most of that list in each of them.

The list is right. It's also where teams stall, because it arrives flat. A flat checklist hands a team of fifty engineers, already running agents, two bad options: adopt all of it at once and watch it erode, or adopt none of it and plan to "get to governance later."

In the [last post](https://rajnishdashora.com/posts/2026-07-13-ai-coding-agents-missing-harness) I argued that agent primitives — instructions, context, tools, guardrails, sub-agents, evals — should be treated as versioned engineering artifacts. This post is about the part the checklists leave out: the order.

## The question that orders the list

Every practice has two prices: what it costs to adopt now, and what it costs to adopt later. Most prioritization looks only at the first. The number that should set the sequence is the gap between them.

Some practices cost about the same whenever you start. Others are nearly free on day one and close to impossible a year in. Those go first — even when they feel premature, and especially when nobody is asking for them yet.

![Adopt in order of what you can't retrofit. Cheap now but impossible later, so do them in week one: record the primitive revision behind every agent run, name an owner for every primitive, and split inherited rules from local ones. Expensive now but cheap to add later, so add them where the blast radius justifies it: behavioral review gates, regression task sets, and cleanup sweeps.](/diagrams/2026-09-20-adopt-what-you-cant-retrofit.excalidraw.svg)

Sort by that gap and two things move. The practice most engineering guides leave out goes to the top. The one they spend the most words on can wait.

## Week one: the three you can't retrofit

**Record which revision steered every run.** When an agent produces a change, log the commit of the primitives it was running with, alongside the output — and if your org-wide rules live in a separate repo, their revision too. On day one that is a single field. A year in, there is no way to add it: the history you'd need was never written down, and nothing you build afterwards can tell you which rules were in force when a given change shipped.

Keep the record small and specific: the revision of the primitives, the model version, and which on-demand pieces — skills, tool definitions — were actually loaded for that run. The model version belongs in there because behavior can shift when the provider updates the model, with no diff anywhere in your repo. And record the pointer, not the payload. A revision ID tells you exactly what was in force without copying prompts and context into logs, which in a regulated environment is its own data-handling problem.

This is the one I'd do before anything else, and it's the one engineering guides mostly skip. Every serious incident review I've run, from Gojek onwards, opened with the same question, and it was never about how sophisticated the system was. It was: what changed, and when? That question only has an answer because deploys are recorded — every release carries a version, a timestamp and an author, so a regression can be lined up against the change that caused it. Agent instructions are now part of what changes. When an agent-written change breaks something weeks after it shipped, the review will ask what the agent was running with at the time, and you can't line a regression up against changes you never recorded.

**Put a name on every primitive.** One line in `CODEOWNERS`. Today, whoever wrote a rule is still around and remembers why it's there. Each month you wait, more rules turn into folklore — still loaded, still followed, and explainable by nobody. Then ownership gets assigned by archaeology instead of by default.

**Split inherited rules from local ones before the files multiply.** Decide which rules are org-wide and can't be overridden in a repo, and which belong to the team that owns the service.

![Two tiers of agent primitive. The inherited tier is org-owned and non-overridable: data-boundary rules, actions that always require a human, release and audit requirements. The local tier is owned by the team that owns the service: its context, its examples, its tools. Every agent run composes both, with the inherited tier winning conflicts.](/diagrams/2026-09-20-two-tiers-of-primitives.excalidraw.svg)

With three repos, that's one directory decision. With fifty, it's reconciling fifty slightly different copies of your compliance rules, each edited by someone optimizing for their own merge.

None of the three needs a tooling budget, a platform team, or a policy committee. That's the argument for doing them now. When the irreversible practices are this cheap, "we'll get to it" isn't saving anything. It's spending an option you can't buy back.

## Later, and narrowly: the expensive ones

**Behavioral review gates.** Requiring a primitive change to show a before/after on recorded tasks, and blocking regressions in CI, is among the most written-about practices on the list, and for high-stakes primitives it's the right one. It's also the one that costs real engineering time to build and ongoing time to maintain, because the task sets go stale as the codebase moves.

But it retrofits cleanly. You can put a gate in front of any primitive on any day, and it protects every change from that day forward. Waiting costs you only the regressions in between. So spend it where those hurt: the inherited tier first, and a local primitive once it has caused an incident that justifies a gate.

**Cleanup sweeps.** A rule describing a service you deleted isn't harmless clutter — the agent is still following it. But a sweep can run in any quarter. The part of cleanup that can't wait is already covered in week one: an owner to ask whether a rule is still true.

## Where this order is wrong

Two cases, and both are worth checking before you copy the sequence.

**A small team with one repo.** The inherited/local split is premature when there's only one place for rules to live. Name owners and record runs; put off the split until a second repo has its own agent instructions.

**A primitive that has already hurt you.** Retrofit cost is a default, not a rule. If a change to one instruction file has already caused an incident, gate that file now. Waiting only makes sense for regressions you haven't had yet.

There's also a cost the week-one list doesn't remove: someone has to read the records. A run log nobody queries is still worth having, because the value arrives the day someone needs to answer a question about the past. But be clear that you're buying an option, not an insight.

## Why the order gets missed

The advice lives in two places that rarely cite each other.

Engineering guides cover owners, behavioral review, regression sets and cleanup. That's the craft of building the harness, and it's where the interesting problems are. Run-level records mostly show up somewhere else: in compliance and audit writing, framed as attribution evidence. The engineers building the harness read the first kind. The one practice you can never add retroactively lives in the second.

The person whose job spans both is usually the CTO.

That's why sequencing lands on a leader's desk. Left to whichever guide a team happened to read, the order follows what that genre cares about. It should follow what you lose by waiting. The expensive practices cost the same whenever you start them. The boring ones are only cheap once.

## The takeaway

The primitives are already in your repo, and the playbook for governing them is already published. What's left is judgment about order.

Do the cheap, irreversible things this week, while they're still cheap. Add the expensive things later, where the blast radius justifies what they cost.

---

If an agent-written change broke production tonight, how long would it take your team to find out what the agent was running with when it wrote it?
