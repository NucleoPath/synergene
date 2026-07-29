# Context

Glossary for SynerGene, a genomics AI assistant that helps scientists specify and launch CRISPR analysis work.

## Scientist

The user. A named researcher with an email address, not an anonymous visitor — analysis work completes hours after it is launched, so every piece of work must be attributable to someone reachable.

Avoid "user" and "visitor" for this concept.

## Sequence Reference

A pointer to sequence data held in storage, together with its metadata — length, checksum, organism, target gene. This is the only form in which sequence data enters the assistant's view; the assistant reasons over references and never over bases, except for short oligos. See [ADR-0003](docs/adr/0003-no-raw-sequence-in-model-context.md).

## Analysis Run

One execution of a chosen analysis against Sequence References, using a parameter set the Scientist has approved. A run takes hours, outlives the conversation that launched it, and is the thing an audit asks questions about: what was approved, by whom, and what was executed.

A run is not a message, and a conversation is not the record of it.

## Approval

The Scientist's explicit confirmation of a proposed Analysis Run before any compute is committed. An Approval binds to a specific parameter set, so it records not just consent but consent *to what*.

An Approval is only meaningful if the Scientist could evaluate what they were approving, which is a constraint on what a proposal must show, not just on what it must contain.
