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
