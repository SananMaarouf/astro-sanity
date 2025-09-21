# Astro + Sanity-CMS Starter Kit

Kickstart your next project with this ready-to-use template, combining the best of Astro, Sanity CMS, React, TailwindCSS, and Vercel! Clone, customize, and launch your own modern, content-driven site in minutes.

## ✨ Features

- **Astro Framework:** Lightning-fast static and dynamic site generation with a modern developer experience.
- **Sanity CMS Integration:** Flexible, real-time content management with powerful schema definitions—edit content without redeploying.
- **Vercel Adapter with ISR:** Deploy to Vercel with built-in [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration), enabling fast updates and scalable performance.
- **React Support:** Use React components seamlessly alongside Astro and other frameworks.
- **TailwindCSS:** Rapidly style your site with utility-first CSS.
- **PortableText Rendering:** Rich text content from Sanity, rendered beautifully in Astro.
- **Environment Variable Setup:** Easily swap out your Sanity project credentials for new projects.
- **Ready-to-Extend Structure:** Clean, modular file organization for easy customization and scaling.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── astro.svg
│   ├── components/
│   │   ├── Welcome.astro
│   │   ├── InternalLink.astro
│   │   ├── PortableText.astro
│   │   └── SanityImage.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── post/
│   │       └── [slug].astro
│   └── sanity/
│       ├── lib/
│       │   ├── load-query.ts
│       │   └── sanity-client.ts
│       └── schemaTypes/
│           ├── author.ts
│           ├── blockContent.ts
│           ├── category.ts
│           ├── post.ts
│           ├── index.ts
├── types/
│   ├── index.ts
│   └── post.ts
├── .env.example
├── astro.config.mjs
├── sanity.config.ts
├── tsconfig.json
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ⚡ Environment Setup

This template uses environment variables for your Sanity project credentials.  
Your actual `.env` file is **not** included in version control (see `.gitignore`).  
To get started, **create your own `.env` file** in the project root, using `.env.example` as a reference:

```bash
cp .env.example .env
```

Then, fill in your Sanity project ID and dataset in `.env`:

```env
PUBLIC_SANITY_PROJECT_ID="your sanity project id here"
PUBLIC_SANITY_DATASET="production"
```

**Note:**  
Your `.env` file is required for local development and building your site!

## 🏁 Get Started

This template is designed to be cloned and customized for your own projects.  
Swap out your Sanity credentials, update your schemas, and start building—no boilerplate required!

---
Ready to launch your next content-driven site?  
**Fork, clone, and create something awesome!**
