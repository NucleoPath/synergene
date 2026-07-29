# No raw sequence data in the model context

SynerGene's agent helps scientists specify and launch CRISPR analysis runs, so the obvious design would pass the sequences they supply into the model's context. We decided the model never sees raw sequence: uploads go to object storage and the agent reasons only over a reference and metadata (`sequenceRef`, length, checksum, organism, target gene) plus analysis parameters. Short oligos — a 20–30bp guide or target site the model needs the bases of to say anything useful — are the one carve-out.

Three reasons, any one of which would be sufficient: proprietary constructs would otherwise leave the building on every request to a third-party model provider; bulk sequence (a FASTQ) does not fit in a context window regardless; and patient-derived material would drag the model provider into scope for compliance.

## Consequences

- Every agent-facing tool signature takes sequence *references*, never sequence. This is the constraint that keeps the agent small.
- An upload path that writes to object storage and mints a reference has to exist before the agent is useful.
- Prompt injection is largely defanged: a hostile FASTQ header never reaches the model, because sequence files never reach the model.
- Anything genuinely requiring base-level reasoning over bulk sequence must be done by a deterministic tool and returned as a summary, not delegated to the model.
