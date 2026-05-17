# Astro × Sanity Starter

A template for static websites using **Astro 6**, **Sanity 5**, and
**TypeScript**. No i18n — single-language, flat routing.

This README is written to be useful both for:
1. **First-time users** setting up the template.
2. **Returning users** who need a quick re-onboarding months later.

## Returning in 6 months? Start here

Use this exact sequence:

```bash
git pull
npm install
cp .env.example .env   # only if .env is missing
npm run sanity:codegen
npm run dev
```

In a second terminal:

```bash
npm run sanity:dev
```

Then confirm:
1. Site opens at <http://localhost:4321>
2. Studio opens at <http://localhost:3333>
3. Content appears as expected

If Studio fails, jump to [Troubleshooting](#troubleshooting).

## What this template includes

- Astro static site output (`output: 'static'`)
- Sanity Studio runs separately via `npm run sanity:dev` (not embedded in the Astro app)
- Flat page routing: `/`, `/posts`, `/post/[slug]`, `/author/[slug]`, `/category/[slug]`, `/[page]`
- Centralized, typed GROQ queries in `src/sanity/lib/queries.ts`
- Prebuilt schemas: `siteSettings`, `navigation`, `footer`, `landing`, `page`,
  `post`, `category`, `author`, and `blockContent`
- Tailwind CSS + shadcn UI setup

## Prerequisites

Install before starting:

1. **Node.js 20+**
2. **npm 10+** (bundled with modern Node)
3. **Sanity account** (free tier is fine)
4. **Git**

## First-time setup (foolproof path)

### 1) Create your repository from this template

On GitHub:
1. Click **Use this template**
2. Create your new repository
3. Clone it locally

```bash
git clone <your-new-repo-url> my-site
cd my-site
```

### 2) Install project dependencies

```bash
npm install
```

### 3) Create or choose a Sanity project

If you need a new one:

```bash
npm run sanity:login
npm run sanity:create-project -- "My Site"
```

Save the **project ID** and **dataset name** (`production` is typical).

### 4) Create `.env`

```bash
cp .env.example .env
```

Set values:

```env
PUBLIC_SANITY_PROJECT_ID="your-project-id"
PUBLIC_SANITY_DATASET="production"
PUBLIC_SITE_URL="http://localhost:4321"

SANITY_STUDIO_PROJECT_ID="your-project-id"
SANITY_STUDIO_DATASET="production"
```

### 5) Keep Astro and Studio targeting the same Sanity project

This template has two config entry points:

1. `.env` (used by Astro integration + `sanity.cli.ts`)
2. `sanity.config.ts` (used by Studio config)

`sanity.config.ts` reads `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET`
from the environment — keep those aligned with the `PUBLIC_*` values.

### 6) Start Sanity Studio

```bash
npm run sanity:dev
```

Studio runs at <http://localhost:3333>. Keep this terminal open — you'll use it to create content in the next step.

### 7) Add local CORS origin

```bash
npm run sanity:cors-add -- http://localhost:4321 --credentials
```

This is required for local Astro + Studio communication.

### 8) Generate schema/query types

```bash
npm run sanity:codegen
```

Run this any time you change:
- Sanity schemas
- Query selections in GROQ files

## First content you must create

Before running the dev server, create the required singleton documents in Studio
at <http://localhost:3333> (already running from step 6). Publish the following:

| Document type | Why it matters | Minimum fields to fill |
|---|---|---|
| `Site Settings` | Global title + nav reference + SEO defaults | `title`, `primaryNav` reference |
| `Navigation` | Main menu rendering | `title`, at least 1 `items[]` row with `label` + (`href` or `internalRef`) |
| `Footer` | Footer text/contact section | `address` and/or `copyright` |
| `Landing` | Homepage hero content | `title` and `ctaBtnText` |

Optional but recommended:
- `post`, `author`, and `category` to validate list/detail routes
- `page` to validate CMS-driven `/[page]` routes

Once content is published, open a new terminal and continue to step 9.

### 9) Run the app

```bash
npm run dev
```

You now have two terminals running:
- `npm run sanity:dev` → Studio at <http://localhost:3333>
- `npm run dev` → Site at <http://localhost:4321>

## Daily development workflow

When actively building, use two terminals:

**Terminal 1** — Astro site:
```bash
npm run dev
```

**Terminal 2** — Sanity Studio:
```bash
npm run sanity:dev
```

Other common tasks:

- Pull latest and reinstall after lockfile changes:
  ```bash
  git pull && npm install
  ```
- After changing schemas or GROQ queries:
  ```bash
  npm run sanity:codegen
  ```
- Before deploying:
  ```bash
  npm run build
  ```

## File map (where to edit what)

| Goal | File(s) |
|---|---|
| Change Studio project config | `sanity.config.ts` |
| Add/edit document schemas | `src/sanity/schemaTypes/*` |
| Change Studio sidebar organization | `src/sanity/structure.ts` |
| Add or adjust data fetching | `src/sanity/lib/queries.ts` |
| Update layouts/components | `src/layouts/*`, `src/components/*` |
| Update routes/pages | `src/pages/*` |

## Command reference

| Command | Purpose |
|---|---|
| `npm run dev` | Run Astro dev server at `localhost:4321` |
| `npm run sanity:dev` | Run Sanity Studio at `localhost:3333` |
| `npm run build` | Build static production output to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run sanity:deploy` | Deploy Studio to the Sanity-hosted URL |
| `npm run sanity:codegen` | Extract schema and generate `src/sanity/sanity.types.ts` |
| `npm run sanity:cors-add -- <origin> --credentials` | Allow frontend origin in Sanity CORS |
| `npm run sanity:dataset-list` | Show datasets in current Sanity project |

## Deployment checklist

Before production deploy:

1. Set production environment variables
2. Ensure `PUBLIC_SITE_URL` is your real domain
3. Add production CORS origin:
   ```bash
   npm run sanity:cors-add -- https://your-site.example --credentials
   ```
4. Deploy Sanity Studio to the hosted URL so you can manage content from the browser:
   ```bash
   npm run sanity:deploy
   ```
5. Build the site:
   ```bash
   npm run build
   ```
6. Deploy `dist/` to your host (or add an Astro adapter for SSR targets)

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Studio at `:3333` is blank or API calls fail | Missing CORS origin | `npm run sanity:cors-add -- http://localhost:4321 --credentials` |
| Studio shows unexpected project content | `sanity.config.ts` projectId/dataset mismatch | Align `SANITY_STUDIO_*` env vars with `PUBLIC_SANITY_*` |
| `sanity:codegen` fails or types are stale | Schema extraction/typegen not rerun | `npm run sanity:codegen` |
| Build succeeds but page content is empty | Required singleton docs not created | Create `Site Settings`, `Navigation`, `Footer`, `Landing` |

## References

- [Astro docs](https://docs.astro.build/)
- [Sanity + Astro integration](https://www.sanity.io/docs/astro)
