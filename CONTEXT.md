# Synergene

An AI chat application built on Next.js and the AI SDK.

## Language

**Conversation**:
A saved, ongoing exchange of messages between a visitor and the assistant. Currently scoped to an anonymous visitor (no user accounts yet).
_Avoid_: Thread, session, chat

**Visitor**:
An unauthenticated browser identified by an anonymous, cookie-based ID. Conversations belong to a Visitor, not a User — there is no login yet.
_Avoid_: User, session, client
