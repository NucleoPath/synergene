# Prisma ORM with Prisma Postgres for conversation persistence

We need to persist chat Conversations and Messages, and currently have no database. We chose **Prisma ORM with Prisma Postgres** over alternatives (Drizzle + raw SQL, a self-hosted Postgres/Supabase instance, or a local SQLite file) because the Prisma tooling (migrations, Prisma Studio, database provisioning) is already available in this environment, removing the need for separate infra/account setup. SQLite was rejected because it would need to be migrated off before deployment; a self-managed Postgres instance was rejected as unnecessary infra work when a managed option is already wired up.

This carries real lock-in (schema is defined in Prisma's schema language, queries go through the Prisma client) — swapping ORM or database provider later is a meaningful rewrite, not a config change.
