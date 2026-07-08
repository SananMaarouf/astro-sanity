---
name: starting-dev-environment
description: Use when starting local development on this Astro + Sanity project, when asked to run/preview/launch the site or Studio, or when hitting a blank Studio, CORS errors, empty page content, or stale generated types after a git pull.
---

# Starting the Astro + Sanity Dev Environment

## Overview

This project needs **two dev servers running concurrently** — Astro (site) and
Sanity Studio (CMS) — plus generated types kept in sync with the schema. Their
process behavior differs in a way that trips up agents managing them via Bash.

## Startup sequence

```bash
npm install
cp .env.example .env   # only if .env is missing — then fill in real project ID/dataset
npm run sanity:codegen  # regenerates src/sanity/sanity.types.ts + schema.json
npm run dev              # Astro site
npm run sanity:dev       # Sanity Studio (separate terminal/process)
```

Confirm both came up: `curl -s -o /dev/null -w '%{http_code}' http://localhost:4321` and
`http://localhost:3333` should both return `200`.

## Critical: the two servers behave differently as processes

- **`npm run dev` (Astro) daemonizes.** It forks a persistent background process and
  the command returns almost immediately once it's up — this is normal, not a crash.
  Don't `run_in_background` it expecting a long-lived foreground task; instead treat
  the `npm run dev` invocation as fire-and-check. Manage/inspect it with:
  - `npx astro dev status`
  - `npx astro dev logs`
  - `npx astro dev stop`
- **`npm run sanity:dev` (Studio) blocks in the foreground** like a normal dev server.
  Run it with `run_in_background: true` (Bash tool) or in a separate terminal, and
  stop it by killing that process/PID. It takes a few seconds to bind after the
  command starts — poll (e.g. curl in a loop) rather than assuming instant readiness.

Mixing these up (e.g. backgrounding `npm run dev` and waiting for it to "finish
starting", or expecting `sanity:dev` to return immediately) is the most common
confusion when scripting this project's startup.

## When things don't work

| Symptom | Cause | Fix |
|---|---|---|
| Studio blank / API calls fail (browser console CORS errors) | `localhost:3333` not registered | `npm run sanity:cors-add -- http://localhost:3333 --credentials`. Check current origins with `npx sanity cors list`. Astro itself needs no CORS entry — its Sanity fetches happen server-side. |
| Studio shows wrong/empty project content | `SANITY_STUDIO_PROJECT_ID`/`SANITY_STUDIO_DATASET` mismatch `PUBLIC_SANITY_*` | Align both pairs in `.env` — `sanity.config.ts` reads the `SANITY_STUDIO_*` vars, Astro reads the `PUBLIC_*` ones. |
| `sanity dev`/`sanity cors-add`/etc. fail with auth errors | No authenticated Sanity CLI session | `npm run sanity:login` |
| Types stale or `sanity:codegen` output doesn't match schema | Schema or GROQ queries changed but codegen not rerun | `npm run sanity:codegen` (runs `sanity:extract` + `sanity:typegen`) |
| Build/dev succeeds but pages render empty | Required singleton docs (`Site Settings`, `Navigation`, `Footer`, `Landing`) not published in Studio | Create/publish them in Studio at `localhost:3333` |
| `.env` has literal `"project-id"` / `"dataset"` values | Copied from `.env.example` but never filled in | Fill in the real project ID/dataset from the Sanity project |

## Shutting down

- Astro: `npx astro dev stop` (do NOT rely on Ctrl-C or killing the shell — the
  daemon survives that)
- Studio: kill the process/PID you started it with
