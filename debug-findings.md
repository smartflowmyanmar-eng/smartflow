# SmartFlow Supabase login debug findings

Date: 2026-08-20

The Supabase Auth endpoint `https://wkahfwfpmifcdxycajtu.supabase.co/auth/v1/settings` is reachable from the browser. Without an API key it returns the expected JSON message `No API key found in request`, so the hostname is live and network reachability is not the primary problem.

The current GitHub Pages URL `https://smartflowmyanmar-eng.github.io/smartflow/` is not rendering the local/repository App.tsx that was inspected. It renders a different dark “SmartFlow Myanmar console” login with canvas id `flow-canvas`, labels `အီးမေးလ်` and `စကားဝှက်`, button id `auth-submit`, and an account-switch button. The current repository main branch App.tsx is the Paper Ledger dashboard and has no `signInWithPassword` or login form before this fix. This indicates the live Pages artifact is stale or is being built from a different source/output than the repository file currently checked out.

The repository workflow maps `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` into the `pnpm build` step and uploads `dist/public`, which matches the Vite output directory. Local `pnpm check` and `pnpm build` pass after adding the new auth gate.

Next action: commit and push the auth-gated Paper Ledger app, confirm the Pages workflow run is for the pushed commit, then refresh the live URL. If the old dark login remains, inspect GitHub Pages source/branch and workflow deployment artifact selection because the live site is not serving this repository's current App.tsx.
