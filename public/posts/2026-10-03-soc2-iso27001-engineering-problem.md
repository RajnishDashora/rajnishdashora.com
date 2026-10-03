---
title: "SOC 2 and ISO 27001 Are Engineering Problems Disguised as Paperwork"
date: "October 3, 2026"
excerpt: "Neither certification is won by having good controls. Both are won by proving the controls ran — which makes evidence the bottleneck, and evidence is something you engineer, not something you write."
slug: "2026-10-03-soc2-iso27001-engineering-problem"
pillar: "AI"
---

A security certification looks like a documentation project: write the policies, buy the tool, book the
auditor, wait.

Then the auditor asks for evidence that a control operated across the period — several times over — and
the team meets what both certifications actually test. **SOC 2 Type II and ISO 27001 are ultimately
evidenced by operating history.** Not by intent, not by architecture, not by how good your policies read.
By whether ordinary controls actually ran, repeatedly, and left records behind.

That property decides most of what certification costs you, and the decisions behind it get made early —
most before any auditor is engaged. Having led both certifications to completion while building AI
platforms for regulated enterprises, here's what I'd want a founder or CTO to know before starting.

## The two instruments answer different questions

They get mentioned in the same breath, as if they were variations on one audit. They aren't.

**SOC 2 is an attestation about operation.** A Type II report says a CPA firm examined your controls and
opined that they were suitably designed *and operated effectively throughout a stated period* — and it
includes the auditor's tests and their results. A Type I covers the same ground minus the
operating-effectiveness opinion: a point-in-time statement that the design is sound.

**ISO 27001 certifies a management system.** The audit asks whether you have a functioning ISMS — one that
identifies risk, selects controls, checks itself through internal audit and gets reviewed by management.
The controls matter, but what's certified is the machine that keeps choosing and correcting them.

![One control set feeding two instruments. ISO 27001:2022 certifies the management system and needs scope, a risk register, a Statement of Applicability positioning all 93 Annex A controls, internal audit and management review. SOC 2 Type II attests that controls operated effectively throughout a stated period, and needs a system description plus testable evidence; the Security criteria are always in scope and each added category adds cost. Between them sits the shared control set — access control, change management, logging, vulnerability management, incident response, vendor risk.](/diagrams/2026-10-03-two-instruments-one-control-set.excalidraw.svg)

The practical consequence: **ISO gives you the machine, SOC 2 gives you the receipt.** Enterprise buyers
usually want the receipt; regulators and larger procurement functions increasingly want the machine. Sell
into regulated industries and you'll be asked for both, which is why running them as one program pays.

## The observation window is a decision, not a requirement

The common belief about a Type II is that it needs a six-month observation period. The standards don't
say that.

No AICPA standard, criteria document or guide sets a minimum. The AICPA's SOC 2 guide is explicit that
**management is responsible for determining the time frame** the examination covers. Your auditor then
judges, before accepting the engagement, whether sufficient evidence of operating effectiveness is likely
to exist over the window you picked.

Three, six and twelve months are conventions — useful ones, but conventions. What actually sets the floor
is **evidence**: the auditor has to sample each control at the frequency you claim it runs, and that
frequency is something you set yourself.

## Your control frequencies silently set your minimum window

This one is invisible until it costs you a quarter.

When you write "access reviews are performed quarterly" into a policy, you have just decided your
observation window cannot usefully be shorter than a quarter. The same goes for annual disaster-recovery
tests and anything else on a slow cadence. The arithmetic is unforgiving, and it is set by a sentence
written in a document nobody thought of as a schedule.

The frequencies in your policy set are **calendar commitments**, and the most consequential thing you
decide before the clock starts.

![The same observation window against three control cadences. A monthly control gives an auditor three operations to sample in a three-month window. A quarterly control has no complete cycle inside a six-week window, so it cannot be tested for that period. An annual control yields one operation a year at best, so a first report is thin on it whatever window you choose. No AICPA standard sets a minimum window — management determines the time frame (AICPA SOC 2 guide 1.39); evidence sets the floor.](/diagrams/2026-10-03-control-frequency-sets-the-window.excalidraw.svg)

The discipline is to walk the control set once, early, asking of every frequency: *is this what we will
actually do, and is it the slowest cadence we can defend?* It's the easiest step to skip, because at that
stage it reads like proofreading — and it's the most valuable hour in the project.

## The Statement of Applicability is where scope quietly gets expensive

ISO 27001:2022 restructured Annex A into 93 controls across four themes — organizational, people,
physical and technological. Annex A is normative and the Statement of Applicability is mandatory, so every
one of those 93 needs a documented position: included with a justification tied to a risk, or excluded with
a justification for the exclusion.

The instinct is to include almost everything, because exclusions feel like admissions. Resist it.
**Every control you include is one you must now operate and evidence — at Stage 2, at every surveillance
audit, and at recertification.** It's a standing commitment with a recurring cost, and that cost lands on
whoever produces the records. A well-argued exclusion signals a mature risk assessment, not a gap:
auditors test whether your positions are reasoned, not whether they're maximal.

The same logic applies on the SOC 2 side. The Security criteria — the Common Criteria — are in every
engagement; Availability, Processing Integrity, Confidentiality and Privacy each *add* criteria, effort
and cost. Let a buyer's wishlist pull three extra categories into your first report and you've multiplied
the evidence burden to satisfy a preference that was never a requirement.

## The overlap is real, but it's in the controls — not the artifacts

The reason to run these together is that they draw on the same operational reality — access control,
change management, logging. One set of controls feeds both.

The overlap stops at the deliverables, though: ISO's artifacts describe a *management system*, SOC 2's
describe a *system*. One evidences that you govern; the other, what you built and how it behaves.

That matters because being ISO-ready genuinely accelerates a SOC 2 — the controls exist and operate — but
hands you nothing resembling a system description. Writing one means documenting your architecture, data flows,
subservice organizations and commitments at a precision rarely committed to paper — and it can't
be produced the week before fieldwork.

Plan for one control set and two documentation tracks. Not one of each.

## Where LLMs and agents change what's in scope

Everything so far applies to any software company. When the system under certification calls models it
doesn't own — agents retrieving data and acting on a user's behalf — a few control areas need deliberate
mapping. Three I would prioritize:

**What the model may see is an access-control question, not a product question.** What matters is whether
the agent inherits the permissions of the user it acts for, or quietly holds broader ones. An agent that
summarises a customer's account through one service identity can read every customer's account. The same
feature, scoped to the permissions of whoever asked, can read one. Only the second survives being sampled —
and the difference is invisible in the product, because both versions answer the question correctly.

**Inference needs logging, not just access.** Conventional audit trails answer who opened what. Once a
model is in the path, the auditable event also includes what was retrieved, what was passed to the model,
and what came back — the chain somebody will ask you to reconstruct after an incident, impossible if you
only logged the API call.

**Model providers are vendors.** Every provider, gateway and tool endpoint in the path is a third-party
relationship, and vendor-risk controls apply to each. Treat the model as infrastructure rather than a
supplier and you find out late, usually in a buyer's questionnaire.

None of the three needs a new framework. All three need deciding before the window opens, because each is
evidenced by records that only exist if the control was already running.

## ISO hands you a stretch of elapsed time. Spend it.

If evidence costs elapsed time, the useful question is where elapsed time comes from. ISO certification
gives you a stretch of it on purpose.

Initial certification runs as two audits, a split required by the standard certification bodies themselves
work under. Stage 1 reviews what exists — scope, risk assessment, Statement of Applicability, internal
audit, management review. Stage 2 tests what happens, by interviewing control owners and sampling records
across a period. They can't be one sitting: design can be read in a day, operation can't.

Hence a mandatory interval — typically four to eight weeks, set by your certification body rather than the
standard, so it's worth asking about while you choose one. Two things belong in it. Major nonconformities
from Stage 1 must close before Stage 2 begins, a hard gate that should shape how you triage findings. And
any control you stood up recently has to run again: one deployed the week before Stage 1 passes a
documentation review and fails an effectiveness audit.

That second one is why the interval is a feature, not a delay: you cannot create operating history
retroactively. Run another cycle of every control, keep what each emits, and the gap stops being dead time
and becomes the cheapest evidence you will ever collect.

## What to outsource, and what you cannot

**Outsource the audit.** It carries no weight unless it's independent.

**Outsource the gap assessment** if you've never done this. Someone who has read a hundred control sets
finds the holes faster than a team reading its first.

**Keep the control design in-house.** This is the one I'd argue hardest. A control set designed by people
who won't be operating it comes out defensible, generic and unworkable in practice — and controls nobody
on the team owns get performed as theatre for the auditor, then abandoned the rest of the year. That is
precisely what a Type II is built to detect.

**Keep the system description in-house.** Nobody outside your engineering organization can describe how
your platform actually works, and an inaccurate description is a finding waiting to happen.

## The bottleneck is evidence, and that makes it an engineering problem

Everything above converges on one thing. These certifications are not won by having good controls, but by
being able to show that good controls ran — repeatedly, with records, across a period.

Which reframes the exercise. If evidence is a byproduct of how the team already works — access reviews
that emit a record, change management that leaves a trail, logging you'd want anyway — audit preparation is
an export job. If it has to be reconstructed at the end, you get the pattern every engineering team
recognizes: a scramble, screenshots in a shared folder, and a quarter of senior time that was meant for the
product.

The teams that find this easy aren't the ones with the most controls. They're the ones who decided early
that the instrumentation *is* the control. That same investment is what makes security reviews fast
afterwards, because the records that satisfy an auditor are the ones most buyer questionnaires ask for.

If I were starting again, I'd spend the first two weeks on two things: the frequency of every control we
were about to commit to, and where its evidence would come from. Everything else — policies, tooling,
auditor selection — is downstream of those two answers.

---

For teams who've been through it: what did you commit to on paper early that you'd write differently,
knowing an auditor would sample it for three years?
