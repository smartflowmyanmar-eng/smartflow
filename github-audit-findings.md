# GitHub audit findings — 2026-08-20

Repository: https://github.com/smartflowmyanmar-eng/smartflow
Live Pages: https://smartflowmyanmar-eng.github.io/smartflow/

The GitHub repository's latest main commit is `47fc802` (Fix relative asset paths for GitHub Pages). GitHub Actions runs for that commit completed successfully, including the custom build/deploy workflow and `pages-build-deployment`. GitHub Pages is configured in legacy mode from `main` root (`source.branch=main`, `source.path=/`) and reports built status.

The GitHub workflow maps `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from repository secrets during `pnpm build`, uploads `dist/public`, and deploys with the Pages action. The GitHub CLI can inspect workflows and runs, but listing Actions secrets returned HTTP 403 because the current GitHub integration lacks that endpoint permission; secret values were not exposed.

The local project checkpoint `f79b5acf` contains the redesigned admin console and `supabase/schema.sql`, but the GitHub repository is still at `47fc802` and does not contain the latest redesign. The next repair is to copy the verified local redesign files into a GitHub clone, run check/build, commit, push to `main`, and verify the resulting Actions and Pages deployment. Supabase plugin verification found project `ytmfxqgrsmbozfplxovl`, tables `admin_users`, `customers`, `orders`, and `activities` with RLS enabled; all public tables were empty before the Admin user was added. Admin user `myokhine060@gmail.com` was added to `public.admin_users` with UUID `6abcf998-49ab-4c30-bb75-57d5aed153e6`.
