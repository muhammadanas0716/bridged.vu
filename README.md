# Bridged.vu

Bridge the gap between users and founders early on. Share concise updates, grow an audience from day one, and build in public with signal over noise.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"/>
  <br/>
  <img src="https://img.shields.io/badge/Analytics-Vercel-blue?style=flat" alt="Vercel Analytics"/>
  <img src="https://img.shields.io/badge/Speed%20Insights-Vercel-blue?style=flat" alt="Vercel Speed Insights"/>
  <img src="https://img.shields.io/badge/Migrations-SQL-lightgrey?style=flat" alt="SQL migrations"/>
</p>

## Features

- Auth with email + password (bcrypt, secure session cookie)
- Founder dashboard: create startups and publish numbered “issues” (updates)
- Public feed (All / Following) with Product Hunt–style cards and upvotes
- Startup pages with updates and upvoting; profile pages with follow
- Notifications and confetti on publish/create
- Supabase Postgres with SQL migrations (no ORM)
- Vercel Analytics and Speed Insights

## Quickstart

```bash
git clone https://github.com/muhammadanas0716/bridged.vu
cd bridged.vu
cp .env.example .env.local
npm install

# Initialize DB schema
npm run migrate

# Dev server
npm run dev
```

Visit http://localhost:3000.

## Environment

Configure `.env.local` using the template in `.env.example`. Key variables:

- `POSTGRES_URL` (Supabase pooled connection; 6543)
- `POSTGRES_URL_NON_POOLING` (5432)
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` (optional if you integrate RLS/edge)

This project connects directly to Postgres using the `postgres` driver. SSL is enabled with relaxed verification for common local setups.

## Migrations

SQL migrations live under `migrations/` and are executed by a tiny runner.

```bash
npm run migrate
```

This creates and populates:

- `users`, `sessions`
- `startups`, `issues`
- `upvotes` with `vote_target` enum
- `follows`

No ORM is used; we keep the schema explicit and easy to audit.

## Architecture

- Next.js App Router (server components where possible)
- Client components for interactive areas (forms, feed, upvotes)
- `lib/db.ts` for the database client
- `lib/auth.ts` for user creation, hashing, sessions
- REST-style API routes under `app/api/**`

## Key Routes

- `/` — Public feed with All/Following and Load more
- `/dashboard` — Tabs for Overview, Startups, Profile
- `/p/[slug]` — Startup page + updates + upvote
- `/u/[handle]` — Profile + follow
- `/login`, `/signup`

## Scripts

- `dev` — run Next.js dev server
- `build` / `start` — production build / start
- `migrate` — run SQL migrations

## Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for workflow, branching, and commit guidelines. All participants are expected to uphold our `CODE_OF_CONDUCT.md`.

## License

MIT — see `LICENSE`.

## Acknowledgements

Inspired by the build-in-public movement, Product Hunt’s card aesthetic, and the open-source community.
