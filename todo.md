# SmartFlow Myanmar authentication gate QA

- [ ] Verify whether an existing Supabase session is causing dashboard auto-entry
- [ ] Verify logout clears the client session and redirects to sign-in
- [ ] Verify a fresh browser load without a session shows sign-in first
- [ ] Verify authorized login transitions from sign-in to dashboard
- [ ] Fix auth gate only if fresh-session behavior is incorrect

# SmartFlow Myanmar admin allowlist update

- [x] Resolve the now-visible Supabase Auth user ID for `moykhine060@gmail.com` — UID `ff58ee6d-4ba8-40c0-a785-6be4e31b84bf` verified from Supabase Dashboard
- [ ] Insert the verified user ID into `public.admin_users` without duplicates
- [ ] Verify the allowlist row with a read-only query
- [ ] Recheck live Preview authorization after the user signs in again

# SmartFlow Myanmar remediation: invalid QA cleanup, email validation, production RLS test

- [ ] Confirm the invalid QA customer ID and exact identifying fields before deletion
- [ ] Delete only the invalid QA customer record and verify it is gone
- [ ] Add explicit email-format validation to the customer save handler
- [ ] Run TypeScript and production build checks
- [ ] Push and deploy the validation fix
- [ ] Extract the exact production public key from the deployed build without exposing it
- [ ] Run unauthenticated and authenticated RLS endpoint probes with safe read-only queries
- [ ] Record final remediation and security-test results

# SmartFlow Myanmar UI/Export/API security QA

- [ ] Test required-field and invalid-format validation on customer and follow-up forms
- [ ] Test safe error feedback for failed/blocked operations without exposing secrets
- [ ] Test customer CSV export download, filename, headers, escaping, and row contents
- [ ] Check whether Excel export is implemented or clearly communicated as unavailable
- [ ] Verify unauthenticated API/database reads are blocked by RLS
- [ ] Verify authenticated non-admin access is blocked by admin authorization policies
- [ ] Inspect frontend/API configuration for exposed private credentials or unsafe endpoints
- [ ] Record findings and recommended fixes without mutating production data

# SmartFlow Myanmar Live QA: authentication and persistence

- [x] Verify admin login with the authorized Supabase account
- [x] Verify logout clears the session and returns to the sign-in screen
- [x] Create one QA customer through the live UI
- [x] Create one QA follow-up linked to that customer through the live UI
- [x] Verify both records exist in Supabase with the expected fields
- [ ] Report whether QA records should be retained or deleted

# SmartFlow Myanmar Live configuration repair

- [ ] Verify GitHub repository secrets are available to the Pages workflow and production build
- [ ] Redeploy after correcting `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Confirm live site reaches the Supabase admin login instead of configuration-required screen

# SmartFlow Myanmar Supabase login debugging

- [x] Deployed build တွင် Supabase URL/key wiring ကို စစ်ဆေးရန် — build သည် variables မပါသော configuration-required screen ကို ပြနေသည်
- [x] GitHub Actions workflow secret mapping နှင့် Vite build env ကို စစ်ဆေးရန် — workflow mapping မှန်ကန်ပြီး secret values မရရှိသဖြင့် Vite env မထည့်နိုင်သေး
- [x] Supabase URL configuration၊ Auth provider နှင့် redirect settings ကို စစ်ဆေးရန် — Auth endpoint reachable; remaining action is GitHub secret presence/access
- [x] Fix push/rebuild ပြီး live login flow ကို စမ်းသပ်ရန် — Pages artifact/source/path fixed; live app now renders the new auth gate
- [ ] Login ပြဿနာဖြေရှင်းချက်နှင့် လိုအပ်သော user action ကို handoff ပြုလုပ်ရန် — user must verify/create repository secrets

# SmartFlow Myanmar GitHub repository upload

- [ ] `smartflowmyanmar-eng/smartflow` repository target ကို သတ်မှတ်ရန်
- [ ] React source၊ package files၊ workflow၊ README နှင့် assets အားလုံးကို upload set အဖြစ် စုစည်းရန်
- [ ] Existing root `index.html` နှင့် SmartFlow CRM build output မကိုက်ညီမှုကို စစ်ဆေးရန်
- [x] GitHub upload/push နှင့် Pages deployment status ကို စစ်ဆေးရန် — commit 5e4c49e; Actions and Pages completed successfully
- [x] Supabase GitHub Actions secrets နှင့် final deployment URL ကို handoff ပြုလုပ်ရန် — workflow mapping verified; Pages URL https://smartflowmyanmar-eng.github.io/smartflow/

# SmartFlow Myanmar GitHub deployment implementation

- [ ] New GitHub repository name/owner နှင့် deployment target ကို သတ်မှတ်ရန်
- [ ] `.env.example` ကို Supabase public variables နှင့် ပြည့်စုံအောင် update ရန်
- [ ] `.env*` secret files များကို gitignore ဖြင့် ကာကွယ်ရန်
- [ ] GitHub Actions build workflow နှင့် deployment configuration ထည့်ရန်
- [ ] README တွင် GitHub Secrets/Variables setup လမ်းညွှန်ရေးရန်
- [x] Build validation နှင့် deployment handoff ပြုလုပ်ရန် — pnpm check/build passed; live asset hash verified

# SmartFlow Myanmar bilingual implementation

- [ ] Uploaded SmartFlow Myanmar logo ကို project asset အဖြစ် ထည့်ရန်
- [ ] Custora wordmark၊ app title နှင့် page metadata ကို SmartFlow Myanmar သို့ ပြောင်းရန်
- [ ] SmartFlow logo ကို sidebar/header နှင့် favicon တွင် အသုံးပြုရန်


- [ ] English/Myanmar translation dictionary တည်ဆောက်ရန်
- [ ] Sidebar၊ topbar၊ dashboard headings နှင့် buttons များကို translation keys သို့ ပြောင်းရန်
- [ ] Customer form၊ detail drawer၊ status/tag labels နှင့် toast messages များကို နှစ်ဘာသာပြောင်းရန်
- [ ] Language switcher နှင့် localStorage persistence ထည့်ရန်
- [ ] Myanmar စာသားအတွက် typography၊ wrapping နှင့် responsive layout စစ်ရန်
- [ ] `pnpm check` နှင့် `pnpm build` ပြန်လည်စစ်ရန်
- [ ] Bilingual checkpoint အသစ် သိမ်းရန်

# SmartFlow CRM redesign and Supabase data integration

- [ ] လက်ရှိ dashboard UI၊ navigation နှင့် မလိုအပ်သော demo sections များကို audit လုပ်ရန်
- [ ] Customer၊ order၊ activity၊ follow-up နှင့် channel analytics data model ကို သတ်မှတ်ရန်
- [x] Supabase tables၊ indexes၊ RLS policies နှင့် seed မဟုတ်သော migration SQL ကို ပြင်ဆင်ရန် — plugin ဖြင့် project တွင် verify ပြီး
- [x] Admin-first bilingual UI ကို ပြန်လည်တည်ဆောက်ရန် — checkpoint f79b5acf
- [x] Customer/order CRUD နှင့် workflow status transitions ကို Supabase သို့ ချိတ်ရန် — App.tsx မှ live tables သို့ query/insert/update လုပ်နိုင်ပြီး
- [ ] Channel analytics နှင့် workflow analytics ကို database data အပေါ်တွက်ချက်ရန်
- [ ] Empty states၊ loading states၊ error handling နှင့် offline-safe behavior ကို စစ်ရန်
- [x] Desktop/mobile UI၊ TypeScript၊ production build နှင့် live deployment ကို validate လုပ်ရန် — build and Pages deployment passed
- [x] Redesigned checkpoint နှင့် Supabase setup instructions ကို handoff ပြုလုပ်ရန် — checkpoint f79b5acf

# Live GitHub Pages Supabase configuration repair

- [ ] GitHub Actions repository secrets များ တကယ်ရှိ/မရှိနှင့် build ထဲ inject ဖြစ်/မဖြစ်ကို ပြန်စစ်ရန်
- [ ] `VITE_SUPABASE_URL` နှင့် `VITE_SUPABASE_ANON_KEY` ကို repository secrets အဖြစ် မှန်ကန်စွာ set/update ရန်
- [x] Secret update ပြီးနောက် Pages workflow ကို redeploy လုပ်ရန် — workflow run 32328366071 succeeded
- [x] Live site တွင် configuration screen မဟုတ်ဘဲ Admin login screen ပြသမှုကို အတည်ပြုရန် — browser verified at Pages URL

- [x] Correct Supabase project URL နှင့် active publishable key ကို plugin ဖြင့် ရယူရန်
- [x] GitHub API permission 403 ကြောင့် repository secrets ကို user ၏ GitHub Settings UI မှ ထည့်ရန် — user confirmed secrets added

# Supabase schema extension and final live audit

- [ ] GitHub main branch latest commit ကို pull/clone လုပ်ပြီး local code နှင့် နှိုင်းယှဉ်ရန်
- [ ] လက်ရှိ Supabase tables၊ columns၊ RLS policies နှင့် row counts ကို စစ်ရန်
- [ ] Follow-up/notification/order detail လိုအပ်ချက်များအတွက် additive schema proposal ပြုလုပ်ရန်
- [ ] User data မဖန်တီးဘဲ migration နှင့် RLS policies ကို apply/verify လုပ်ရန်
- [ ] Live CRM login နှင့် CRUD flow ကို browser ဖြင့် စစ်ရန်
- [ ] User ပေးသော real test record ရှိမှသာ insert/update data test ပြုလုပ်ရန်

# Live CRM admin test and final feature audit

- [ ] Live CRM login ကို Admin အဖြစ် ပြုလုပ်ပြီး dashboard access စစ်ရန်
- [ ] `customers`၊ `orders` နှင့် follow-up workflow ကို UI မှ စစ်ရန်
- [ ] User-approved test records မရမချင်း test data မထည့်ရန်
- [ ] App flow မှ ထည့်သွင်းထားသော records များ Supabase တွင် persistence ဖြစ်/မဖြစ် verify လုပ်ရန်
- [ ] GitHub latest commit နှင့် remaining feature gaps ကို audit လုပ်ရန်
- [ ] လိုအပ်သော safe feature fixes များကို implement/build/deploy စစ်ရန်

# Live QA blocker: admin authorization RPC

- [ ] `is_smartflow_admin()` function permission denied error ကို diagnose လုပ်ရန်
- [ ] Function owner/search_path/grants နှင့် dependent RLS policies ကို ပြင်ရန်
- [ ] Live UI မှ QA customer save ကို ပြန်စမ်းပြီး Supabase persistence verify လုပ်ရန်
- [ ] Orders နှင့် follow-ups UI flow ကို ဆက်စမ်းရန်

## 3D Cinematic Modern-Tech Redesign

- [x] Prepare the supplied SmartFlow logo for the new brand treatment and favicon usage.
- [x] Generate and upload restrained cinematic background/accent assets without replacing real CRM data.
- [x] Rework global design tokens in `client/src/index.css` for blue-black layered surfaces, SmartFlow Signal Cyan, cinematic lighting, and accessible bilingual contrast.
- [x] Redesign the auth gate, command rail, utility header, KPI slabs, workflow panels, data tables, drawers, dialogs, and mobile layout while preserving existing behavior.
- [x] Add file-level style reminders to edited CSS/component/page files.
- [x] Run TypeScript check and production build.
- [x] Verify sign-in gate, language switch, Supabase loading/error/empty states, and responsive rendering in Preview; existing Supabase CRUD paths remain in the unchanged application logic.
- [x] Capture representative Preview screenshots; checkpoint and GitHub Pages sync remain as the final delivery step.

## Current Redesign Notes

- Chosen visual direction: Night Operations Ledger, interpreted as 3D cinematic modern-tech.
- Signature color: SmartFlow Signal Cyan `#12B8F4`.
- Do not add fabricated customers, orders, follow-ups, reviews, ratings, or testimonials.

## Live Logo Repair

- [x] Diagnose why `/manus-storage/...` logo URL fails on GitHub Pages: the legacy Pages root served that path as a 404.
- [x] Move the supplied logo into a GitHub Pages-safe tracked public asset path without exposing secrets.
- [x] Update all logo, favicon, and cinematic background references to relative tracked assets.
- [x] Run TypeScript and production build checks.
- [x] Push commits `216ebf7` and `008fc72` to GitHub; Pages workflow completed successfully and live logo/background assets return HTTP 200.
- [ ] Save a repair checkpoint and report the live URL status.

## Live Blank Screen Repair

- [x] Capture the live HTML/JS/CSS asset references and identify the runtime failure: the legacy root artifact used `/assets/...` absolute paths on a project-site URL.
- [x] Inspect browser/network evidence and Vite base/deployment output.
- [x] Repair the artifact by rebuilding with `GITHUB_ACTIONS=true`, producing project-relative JS/CSS paths without regressing the logo fix.
- [x] Run TypeScript and production build checks.
- [x] Redeploy GitHub Pages from commit `924cc19`; workflow completed successfully and live JS/CSS assets return HTTP 200.
- [ ] Save a repair checkpoint and report the fix.

## Phone Shop Management Upgrade

- [x] Define phone-shop vocabulary and workflows: products/SKUs, IMEI, stock movement, sales, payments, warranty, repairs, suppliers, expenses, and low-stock alerts.
- [x] Map phone-shop tables/RLS requirements and apply the non-destructive products/repairs migration to the connected Supabase project without fabricating production data.
- [ ] Replace the CRM-first overview with a visibly phone-shop-first home screen.
- [ ] Make POS Sale, Stock/IMEI, Warranty & Repairs, Suppliers, and Expenses first-class navigation items.
- [ ] Add clearly visible phone-shop quick actions, recent sales, low-stock alerts, repair due list, and gross-profit placeholders based only on real data.
- [ ] Add bilingual English/Myanmar labels for the new phone-shop screens and preserve admin-only access.
- [ ] Implement inventory/product management with IMEI-aware stock records, condition, warranty, supplier, and stock-status filters.
- [ ] Implement a phone-sale form with product/customer linkage, quantity, payment status, discount, cost, and profit fields.
- [ ] Implement warranty/repair follow-up tracking and supplier/expense summaries.
- [ ] Add empty, loading, validation, permission, and error states for every new workflow.
- [ ] Run TypeScript/build checks and verify visible changes at desktop and mobile widths.
- [ ] Save a visibly changed checkpoint and sync the phone-shop-first UI to GitHub Pages.

## Preview Auth and Live Version Repair

- [ ] Compare Preview source/version against the latest active project checkpoint and live GitHub Pages artifact.
- [ ] Diagnose why Preview login fails while Chrome can authenticate.
- [ ] Verify Supabase URL/key fallback, session persistence, admin allowlist check, and browser console/network errors.
- [ ] Ensure the phone-shop-first build is copied into the Pages root artifact and deployed from the latest source.
- [ ] Verify Preview login gate and authenticated phone-shop dashboard after the repair.
- [ ] Verify live GitHub Pages cache-busted URL shows the phone-shop-first dashboard.
- [ ] Save a checkpoint and report the exact environment status and any user action still required.
