# SmartFlow Myanmar — Customer Management

SmartFlow Myanmar is an Admin-only customer management MVP built around a calm editorial “Paper Ledger” interface. It provides customer profiles, status and tags, search/filter, notes, a follow-up queue, customer detail drawers, and an activity timeline.

## Current mode

The app runs immediately with local preview records so the interface can be reviewed before Supabase is connected. When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are supplied, it attempts to load and write `customers` records through the Supabase client. Supabase schema and RLS policies should be created before production use; the frontend intentionally does not include service-role credentials.

## Local setup

```bash
pnpm install
pnpm dev
```

The project uses the managed React/Vite static scaffold under `client/`. The primary UI is in `client/src/App.tsx` and the Paper Ledger design system is in `client/src/index.css`.

## Supabase integration

Create a Supabase project, configure an Admin Auth user, and add the `customers` table with fields matching the `Customer` type in `client/src/App.tsx`: `id`, `full_name`, `phone`, `email`, `company`, `status`, `source`, `notes`, `tags`, `last_touch`, `created_at`, `updated_at`, and `archived_at`. Enable Row Level Security and allow only the approved Admin identity to read and modify records. Then configure the two client-side environment values in the hosting platform:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Use only the public anon key in the browser. Never place a Supabase service-role key in frontend code or GitHub.

## Validation

```bash
pnpm check
pnpm build
```

## Planned next steps

The next production pass should add Supabase Auth screens, migrations/RLS policies, persisted activity records, tag management, CSV export, duplicate handling, and a deployment-specific environment configuration. The current preview is intentionally usable without those credentials so the product flow can be reviewed first.

## GitHub repository and deployment

This project is prepared for a new GitHub repository and GitHub Pages deployment. The repository can be created from the Manus Management UI using the project’s GitHub export action, or created manually and populated with this project’s files. Use a repository with a `main` branch because `.github/workflows/deploy-pages.yml` deploys on pushes to `main`.

### Required GitHub Actions secrets

In the GitHub repository, open **Settings → Secrets and variables → Actions → New repository secret** and add the following two values from **Supabase → Project Settings → API**.

| Secret name | Value | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase Project URL | Safe to expose to the browser when used with RLS. |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable/anon key | Use only the publishable client key. |

> Never add `SUPABASE_SERVICE_ROLE_KEY`, a database password, or any private server credential to Vite variables or GitHub Pages. GitHub Pages is a public static host, so only the Supabase browser client URL and publishable key may be included in the frontend build. Protect the data with Supabase Auth and Row Level Security policies.

### GitHub Pages setup

After pushing the repository to GitHub, open **Settings → Pages**, choose **GitHub Actions** as the source, and confirm that the repository’s default branch is `main`. The included workflow installs dependencies, injects the two GitHub Actions secrets during the build, uploads `dist/public`, and deploys the static site. The Vite configuration automatically uses relative asset paths in GitHub Actions so project-site URLs work correctly.

### Local development

Copy the variable names into a local `.env.local` file, fill in the values from Supabase, and keep that file untracked:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-publishable-key
```

Then run `pnpm install`, `pnpm check`, and `pnpm dev`. The app still opens in preview mode when these variables are absent. Before production use, create the `customers` and activity tables in Supabase, enable authentication, and add RLS policies that restrict access to the single Admin account.

### Alternative hosting

Manus provides built-in hosting and custom-domain support for this project. If you choose an external host instead of GitHub Pages, configure the same two `VITE_` variables in that host’s build environment and run `pnpm build`; external hosts may require framework-specific routing or asset-base configuration.
