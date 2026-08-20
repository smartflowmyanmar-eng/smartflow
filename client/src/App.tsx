// SmartFlow Myanmar design reminder: Paper Ledger direction — warm ivory, ink navy, terracotta signal, editorial sidebar, tactile but data-first.
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Toaster, toast } from "sonner";
import { Search, Plus, Users, UserRound, Archive, PanelLeft, X, Pencil, MoreHorizontal, CalendarDays, Tag, StickyNote, Activity, ChevronRight, SlidersHorizontal, LogOut, Check, Sparkles, Mail, LockKeyhole, LoaderCircle } from "lucide-react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import "./index.css";

type Status = "lead" | "active" | "inactive" | "archived";
type Customer = { id: string; full_name: string; phone: string; email: string; company: string; status: Status; source: string; notes: string; tags: string[]; last_touch: string; created_at: string; };

type ActivityItem = { id: string; customer_id: string; type: "note" | "call" | "meeting" | "email"; title: string; description: string; activity_at: string; };

const demoCustomers: Customer[] = [
  { id: "CUS-1048", full_name: "Thiri Wai", phone: "09 777 120 443", email: "thiri@northstar.mm", company: "Northstar Foods", status: "active", source: "Referral", notes: "Prefers updates in the afternoon.", tags: ["VIP", "follow-up"], last_touch: "Today, 10:24 AM", created_at: "2026-08-20" },
  { id: "CUS-1047", full_name: "Kyaw Zin Oo", phone: "09 421 883 201", email: "kyaw@kzo.studio", company: "KZO Studio", status: "lead", source: "Website", notes: "Interested in an annual plan.", tags: ["new"], last_touch: "Yesterday, 4:12 PM", created_at: "2026-08-19" },
  { id: "CUS-1046", full_name: "Hnin Ei Phyu", phone: "09 505 219 870", email: "hninei@lotus.mm", company: "Lotus Living", status: "active", source: "Instagram", notes: "Send the updated catalogue next week.", tags: ["follow-up"], last_touch: "Aug 18, 2:30 PM", created_at: "2026-08-18" },
  { id: "CUS-1045", full_name: "Zaw Min Htet", phone: "09 968 774 103", email: "zaw@canvascollective.mm", company: "Canvas Collective", status: "inactive", source: "Event", notes: "Last conversation was about a partnership.", tags: ["re-engage"], last_touch: "Aug 14, 9:05 AM", created_at: "2026-08-14" },
  { id: "CUS-1044", full_name: "Su Myat Noe", phone: "09 421 031 662", email: "su@thegoodroom.mm", company: "The Good Room", status: "active", source: "Referral", notes: "Main contact for the design team.", tags: ["VIP"], last_touch: "Aug 12, 11:18 AM", created_at: "2026-08-12" },
];
const demoActivities: ActivityItem[] = [
  { id: "a1", customer_id: "CUS-1048", type: "call", title: "Discovery call completed", description: "Discussed the new customer care workflow and next steps.", activity_at: "Today, 10:24 AM" },
  { id: "a2", customer_id: "CUS-1048", type: "note", title: "Added a preference note", description: "Prefers updates in the afternoon.", activity_at: "Yesterday, 4:12 PM" },
  { id: "a3", customer_id: "CUS-1048", type: "email", title: "Follow-up email sent", description: "Shared the revised onboarding overview.", activity_at: "Aug 17, 9:30 AM" },
];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const supabase: SupabaseClient | null = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const statusMeta: Record<Status, { label: string; color: string; bg: string }> = {
  lead: { label: "Lead", color: "#A66B20", bg: "#FFF3DB" },
  active: { label: "Active", color: "#3C7A5B", bg: "#E6F3EA" },
  inactive: { label: "Inactive", color: "#6B7280", bg: "#EFF1F3" },
  archived: { label: "Archived", color: "#8B5E55", bg: "#F5E8E4" },
};

function DashboardApp({ onSignOut }: { onSignOut: () => Promise<void> }) {
  const [customers, setCustomers] = useState<Customer[]>(demoCustomers);
  const [activities, setActivities] = useState<ActivityItem[]>(demoActivities);
  const [selected, setSelected] = useState<Customer | null>(demoCustomers[0]);
  const [view, setView] = useState<"overview" | "customers" | "followups">(() => window.location.pathname.includes("follow") ? "followups" : window.location.pathname.includes("customer") ? "customers" : "overview");
  const [language, setLanguage] = useState<"en" | "my">(() => (localStorage.getItem("smartflow-language") as "en" | "my") || "en");
  const t = (en: string, my: string) => language === "my" ? my : en;
  function toggleLanguage() { const next = language === "en" ? "my" : "en"; setLanguage(next); localStorage.setItem("smartflow-language", next); }
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => { if (supabase) loadCustomers(); }, []);

  async function loadCustomers() {
    if (!supabase) return;
    setSyncing(true);
    const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
    if (!error && data?.length) setCustomers(data.map((c) => ({ ...c, tags: c.tags ?? [], last_touch: c.last_touch ?? "No activity yet" })));
    if (error) toast.error("Could not load Supabase records. Showing local preview data.");
    setSyncing(false);
  }

  const filtered = useMemo(() => customers.filter((c) => {
    const haystack = `${c.full_name} ${c.email} ${c.phone} ${c.company} ${c.tags.join(" ")}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesFollowup = view !== "followups" || c.tags.includes("follow-up");
    return matchesQuery && matchesStatus && matchesFollowup;
  }), [customers, query, statusFilter, view]);

  const counts = useMemo(() => ({ total: customers.filter(c => c.status !== "archived").length, active: customers.filter(c => c.status === "active").length, leads: customers.filter(c => c.status === "lead").length, followups: customers.filter(c => c.tags.includes("follow-up")).length }), [customers]);

  function openCustomer(customer: Customer) { setSelected(customer); setDrawerOpen(true); }
  function openNew() { setEditing(null); setShowForm(true); }
  function openEdit(customer: Customer) { setEditing(customer); setShowForm(true); }
  async function saveCustomer(input: Omit<Customer, "id" | "created_at" | "last_touch">) {
    const optimistic: Customer = editing ? { ...editing, ...input } : { ...input, id: `CUS-${1050 + customers.length}`, created_at: new Date().toISOString(), last_touch: "Just now" };
    setCustomers((prev) => editing ? prev.map(c => c.id === editing.id ? optimistic : c) : [optimistic, ...prev]);
    setSelected(optimistic); setShowForm(false); toast.success(editing ? "Customer record updated" : "Customer added to your ledger");
    if (supabase) {
      const payload = { full_name: input.full_name, phone: input.phone, email: input.email, company: input.company, status: input.status, source: input.source, notes: input.notes, tags: input.tags, updated_at: new Date().toISOString() };
      const result = editing ? await supabase.from("customers").update(payload).eq("id", editing.id) : await supabase.from("customers").insert(payload);
      if (result.error) toast.error("Preview saved, but Supabase needs its schema or credentials configured.");
      else loadCustomers();
    }
  }
  async function archiveCustomer(customer: Customer) {
    const next = { ...customer, status: "archived" as Status };
    setCustomers(prev => prev.map(c => c.id === customer.id ? next : c)); setSelected(next); toast.success("Customer archived");
    if (supabase) await supabase.from("customers").update({ status: "archived", archived_at: new Date().toISOString() }).eq("id", customer.id);
  }
  function addActivity(item: Omit<ActivityItem, "id" | "activity_at">) { setActivities(prev => [{ ...item, id: `a${Date.now()}`, activity_at: "Just now" }, ...prev]); toast.success("Activity added to the timeline"); }

  return <div className={`app-shell ${view}`}>
    <Toaster position="bottom-right" toastOptions={{ className: "toast-paper" }} />
    <aside className={`sidebar ${drawerOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><img src="/manus-storage/smartflow-myanmar-logo_9b099b42.png" alt="SmartFlow Myanmar logo" /><div><strong>SmartFlow</strong><span>Myanmar · customer ledger</span></div></div>
      <div className="nav-label">{t("Workspace", "လုပ်ငန်းခွင်")}</div>
      <nav>
        <button className={view === "overview" ? "nav-item active" : "nav-item"} onClick={() => { setView("overview"); setDrawerOpen(false); }}><Sparkles size={17} /> {t("Overview", "အနှစ်ချုပ်")}</button>
        <button className={view === "customers" ? "nav-item active" : "nav-item"} onClick={() => { setView("customers"); setDrawerOpen(false); }}><Users size={17} /> {t("Customers", "ဖောက်သည်များ")} <span>{counts.total}</span></button>
        <button className={view === "followups" ? "nav-item active" : "nav-item"} onClick={() => { setView("followups"); setDrawerOpen(false); }}><CalendarDays size={17} /> {t("Follow-ups", "နောက်ဆက်တွဲများ")} <span>{counts.followups}</span></button>
      </nav>
      <div className="nav-label nav-label-lower">{t("Library", "စာကြည့်တိုက်")}</div>
      <nav><button className="nav-item muted" onClick={() => toast.info("Tag management will be available in the next pass.")}><Tag size={17} /> {t("Tags", "တံဆိပ်များ")}</button><button className="nav-item muted" onClick={() => toast.info("Export is planned for the next pass.")}><Archive size={17} /> {t("Archive", "သိမ်းဆည်းထားသည်များ")}</button></nav>
      <div className="sidebar-foot"><div className="profile-avatar">M</div><div><strong>Myo Khaing</strong><span>Administrator</span></div><button className="icon-ghost" aria-label="Log out" onClick={() => void onSignOut()}><LogOut size={16} /></button></div>
    </aside>
    <div className="mobile-scrim" onClick={() => setDrawerOpen(false)} />
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setDrawerOpen(true)} aria-label="Open navigation"><PanelLeft size={19} /></button><div className="breadcrumb"><span>SmartFlow Myanmar</span><ChevronRight size={14} /><strong>{view === "overview" ? "Overview" : view === "followups" ? "Follow-ups" : "Customers"}</strong></div><div className="topbar-actions"><button className="language-switcher" onClick={toggleLanguage} aria-label="Change language">{language === "en" ? "မြန်မာ" : "English"}</button><div className="sync-status"><span className={syncing ? "sync-dot syncing" : "sync-dot"} /> {supabase ? (syncing ? "Syncing" : "Connected") : "Preview mode"}</div><button className="button-primary" onClick={openNew}><Plus size={17} /> {t("Add customer", "ဖောက်သည်ထည့်ရန်")}</button></div></header>
      <div className="content-wrap">
        <section className="intro"><div><p className="eyebrow">{t("Wednesday, August 20, 2026", "ဗုဒ္ဓဟူးနေ့၊ ဩဂုတ် ၂၀၊ ၂၀၂၆")} <span className="registration-mark">✦</span></p><h1>{view === "overview" ? "Keep the people behind the pipeline in view." : view === "followups" ? "The relationships worth returning to." : "Your customer ledger."}</h1><p className="intro-copy">{t("A calm place to remember context, make the next touch, and keep good relationships moving.", "ဆက်သွယ်မှုအကြောင်းအရာများကို မှတ်သားပြီး နောက်တစ်ကြိမ် ဆက်သွယ်ရန် စီမံနိုင်သော နေရာတစ်ခု။")}</p></div><div className="intro-art"><img src="/manus-storage/custora-hero_f1b64c99.jpg" alt="Abstract connected customer cards" /></div></section>
        {view === "overview" && <section className="stats-grid"><Stat label="Customers" value={counts.total} note="active records" icon={<Users size={18} />} /><Stat label="Active" value={counts.active} note="relationships in motion" icon={<Activity size={18} />} accent="sage" /><Stat label="Follow-up" value={counts.followups} note="need a next touch" icon={<CalendarDays size={18} />} accent="clay" /><Stat label="New leads" value={counts.leads} note="waiting to be known" icon={<Sparkles size={18} />} accent="gold" /></section>}
        <section className="workspace-grid"><div className="ledger-panel"><div className="section-head"><div><p className="eyebrow">{view === "followups" ? "Open loops" : "Customer index"}</p><h2>{view === "overview" ? "Recent customers" : view === "followups" ? "Follow-up list" : "All customers"}</h2></div><button className="icon-button" onClick={() => toast.info("Advanced filters are coming soon.")} aria-label="Open filters"><SlidersHorizontal size={17} /></button></div><div className="toolbar"><div className="search-field"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t("Search by name, company, or tag", "အမည်၊ ကုမ္ပဏီ သို့မဟုတ် တံဆိပ်ဖြင့် ရှာရန်")} /></div><select value={statusFilter} onChange={e => setStatusFilter(e.target.value as Status | "all")} aria-label="Filter by status"><option value="all">All statuses</option>{Object.entries(statusMeta).map(([key, meta]) => <option key={key} value={key}>{meta.label}</option>)}</select></div><div className="customer-list">{filtered.slice(0, view === "overview" ? 5 : 20).map(customer => <CustomerRow key={customer.id} customer={customer} selected={selected?.id === customer.id} onClick={() => openCustomer(customer)} />)}{!filtered.length && <div className="empty-state"><UserRound size={26} /><h3>No records here yet.</h3><p>Try another search or add the first customer to your ledger.</p><button className="button-secondary" onClick={openNew}>Add a customer</button></div>}</div>{view === "overview" && <button className="view-all" onClick={() => setView("customers")}>View all customers <ChevronRight size={15} /></button>}</div><aside className="side-panel"><div className="section-head"><div><p className="eyebrow">Next touch</p><h2>Care queue</h2></div><span className="tiny-count">{counts.followups}</span></div><div className="care-list">{customers.filter(c => c.tags.includes("follow-up")).map(c => <button key={c.id} className="care-item" onClick={() => openCustomer(c)}><span className="care-line" /><span><strong>{c.full_name}</strong><small>{c.company}</small></span><ChevronRight size={15} /></button>)}</div><div className="side-note"><StickyNote size={16} /><p>Good follow-up starts with remembered context.</p></div></aside></section>
      </div>
    </main>
    {selected && drawerOpen && <CustomerDrawer customer={selected} activities={activities.filter(a => a.customer_id === selected.id)} onClose={() => setDrawerOpen(false)} onEdit={() => openEdit(selected)} onArchive={() => archiveCustomer(selected)} onAddActivity={addActivity} />}
    {showForm && <CustomerForm initial={editing} onClose={() => setShowForm(false)} onSave={saveCustomer} />}
  </div>;
}

function App() { return <AuthGate />; }

function AuthGate() {
  const [session, setSession] = useState<import("@supabase/supabase-js").Session | null>(null);
  const [checking, setChecking] = useState(Boolean(supabase));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [language, setLanguage] = useState<"en" | "my">(() => (localStorage.getItem("smartflow-language") as "en" | "my") || "en");
  const [errorMessage, setErrorMessage] = useState("");
  const t = (en: string, my: string) => language === "my" ? my : en;

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => { if (mounted) { setSession(data.session); setChecking(false); } });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => { if (mounted) setSession(nextSession); });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) { setErrorMessage(t("Supabase is not configured in this build.", "ဤ build တွင် Supabase မသတ်မှတ်ရသေးပါ။")); return; }
    setSubmitting(true); setErrorMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      const message = error.message.toLowerCase().includes("fetch") ? t("Supabase could not be reached. Check the deployment environment variables.", "Supabase server သို့ မရောက်နိုင်ပါ။ deployment environment variables များကို စစ်ဆေးပါ။") : error.message;
      setErrorMessage(message);
    }
    setSubmitting(false);
  }

  async function signOut() { if (supabase) await supabase.auth.signOut(); setSession(null); }
  function toggleLanguage() { const next = language === "en" ? "my" : "en"; setLanguage(next); localStorage.setItem("smartflow-language", next); }

  if (!supabase) return <div className="auth-shell"><div className="auth-card"><img src="/manus-storage/smartflow-myanmar-logo_9b099b42.png" alt="SmartFlow Myanmar logo" /><p className="eyebrow">Configuration required</p><h1>{t("Connect the ledger before signing in.", "ဝင်ရောက်မီ ledger ကို ချိတ်ဆက်ပါ။")}</h1><p>{t("This deployment was built without the Supabase URL and publishable key. Add the two VITE_SUPABASE secrets in GitHub, then redeploy.", "ဤ deployment ကို Supabase URL နှင့် publishable key မပါဘဲ build လုပ်ထားပါသည်။ GitHub တွင် VITE_SUPABASE secret နှစ်ခုထည့်ပြီး ပြန် deploy လုပ်ပါ။")}</p></div></div>;
  if (checking) return <div className="auth-shell"><div className="auth-card auth-loading"><LoaderCircle className="spin" size={22} /> {t("Checking your admin session…", "Admin session ကို စစ်ဆေးနေပါသည်…")}</div></div>;
  if (session) return <DashboardApp onSignOut={signOut} />;

  return <div className="auth-shell"><div className="auth-card"><div className="auth-brand"><img src="/manus-storage/smartflow-myanmar-logo_9b099b42.png" alt="SmartFlow Myanmar logo" /><div><strong>SmartFlow</strong><span>Myanmar · admin ledger</span></div><button className="language-switcher" onClick={toggleLanguage}>{language === "en" ? "မြန်မာ" : "English"}</button></div><p className="eyebrow">{t("Private workspace", "သီးသန့်လုပ်ငန်းခွင်")}</p><h1>{t("The customer ledger, kept close.", "ဖောက်သည်မှတ်တမ်းကို လုံခြုံစွာ စီမံပါ။")}</h1><p className="auth-copy">{t("Sign in with the Supabase Admin account to manage customers, activities, and follow-ups.", "ဖောက်သည်များ၊ လုပ်ဆောင်ချက်များနှင့် နောက်ဆက်တွဲများကို စီမံရန် Supabase Admin account ဖြင့် ဝင်ရောက်ပါ။")}</p><form onSubmit={signIn} className="auth-form"><label><span>{t("Admin email", "Admin အီးမေးလ်")}</span><div className="auth-input"><Mail size={16} /><input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" /></div></label><label><span>{t("Password", "စကားဝှက်")}</span><div className="auth-input"><LockKeyhole size={16} /><input type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></div></label>{errorMessage && <div className="auth-error" role="alert">{errorMessage}</div>}<button className="button-primary auth-submit" disabled={submitting}>{submitting ? <><LoaderCircle className="spin" size={16} /> {t("Signing in…", "ဝင်ရောက်နေပါသည်…")}</> : t("Sign in as administrator", "Administrator အဖြစ် ဝင်ရောက်ရန်")}</button></form><p className="auth-footnote">{t("Admin access only · SmartFlow Myanmar", "Admin သီးသန့် · SmartFlow Myanmar")}</p></div></div>;
}

function Stat({ label, value, note, icon, accent = "navy" }: { label: string; value: number; note: string; icon: ReactNode; accent?: string }) { return <div className={`stat-card ${accent}`}><div className="stat-icon">{icon}</div><p>{label}</p><strong>{value}</strong><span>{note}</span></div>; }
function CustomerRow({ customer, selected, onClick }: { customer: Customer; selected: boolean; onClick: () => void }) { const meta = statusMeta[customer.status]; return <button className={`customer-row ${selected ? "selected" : ""}`} onClick={onClick}><div className="customer-initials">{customer.full_name.split(" ").map(x => x[0]).join("").slice(0, 2)}</div><div className="customer-main"><strong>{customer.full_name}</strong><span>{customer.company || customer.email}</span></div><div className="customer-tags">{customer.tags.slice(0, 2).map(t => <span key={t} className="tag-pill">{t}</span>)}</div><span className="status-pill" style={{ color: meta.color, background: meta.bg }}>{meta.label}</span><div className="last-touch"><small>Last touch</small><span>{customer.last_touch}</span></div><ChevronRight className="row-chevron" size={16} /></button>; }
function CustomerDrawer({ customer, activities, onClose, onEdit, onArchive, onAddActivity }: { customer: Customer; activities: ActivityItem[]; onClose: () => void; onEdit: () => void; onArchive: () => void; onAddActivity: (item: Omit<ActivityItem, "id" | "activity_at">) => void }) { const [activity, setActivity] = useState(""); return <><div className="drawer-scrim" onClick={onClose} /><aside className="detail-drawer"><div className="drawer-head"><span className="eyebrow">Customer record</span><button className="icon-ghost" onClick={onClose} aria-label="Close"><X size={18} /></button></div><div className="detail-hero"><div className="large-avatar">{customer.full_name.split(" ").map(x => x[0]).join("").slice(0, 2)}</div><div><h2>{customer.full_name}</h2><p>{customer.company || "Independent customer"}</p></div><button className="icon-button" onClick={onEdit} aria-label="Edit customer"><Pencil size={16} /></button></div><div className="detail-actions"><button className="button-primary small" onClick={onEdit}><Pencil size={15} /> Edit record</button><button className="button-secondary small" onClick={onArchive}><Archive size={15} /> Archive</button></div><div className="detail-section"><p className="eyebrow">Contact</p><div className="contact-lines"><span>{customer.email || "No email"}</span><span>{customer.phone || "No phone"}</span><span>{customer.source} source</span></div></div><div className="detail-section"><p className="eyebrow">Notes</p><p className="detail-note">{customer.notes || "No notes added yet."}</p></div><div className="detail-section"><div className="section-head compact"><p className="eyebrow">Activity timeline</p><span className="tiny-count">{activities.length}</span></div><div className="activity-add"><input value={activity} onChange={e => setActivity(e.target.value)} placeholder="Add a quick note…" onKeyDown={e => { if (e.key === "Enter" && activity.trim()) { onAddActivity({ customer_id: customer.id, type: "note", title: "Quick note", description: activity.trim() }); setActivity(""); } }} /><button onClick={() => { if (activity.trim()) { onAddActivity({ customer_id: customer.id, type: "note", title: "Quick note", description: activity.trim() }); setActivity(""); } }}><Plus size={16} /></button></div><div className="timeline">{activities.map(item => <div className="timeline-item" key={item.id}><span className={`timeline-dot ${item.type}`} /><div><strong>{item.title}</strong><p>{item.description}</p><small>{item.activity_at}</small></div></div>)}</div></div></aside></>; }
function CustomerForm({ initial, onClose, onSave }: { initial: Customer | null; onClose: () => void; onSave: (input: Omit<Customer, "id" | "created_at" | "last_touch">) => void }) { const [form, setForm] = useState({ full_name: initial?.full_name ?? "", phone: initial?.phone ?? "", email: initial?.email ?? "", company: initial?.company ?? "", status: initial?.status ?? "lead" as Status, source: initial?.source ?? "Website", notes: initial?.notes ?? "", tags: initial?.tags ?? [] as string[] }); const [tagInput, setTagInput] = useState(""); function update(key: string, value: string) { setForm(prev => ({ ...prev, [key]: value })); } return <><div className="modal-scrim" onClick={onClose} /><section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="customer-form-title"><div className="modal-head"><div><p className="eyebrow">{initial ? "Edit record" : "New record"}</p><h2 id="customer-form-title">{initial ? "Update the customer context." : "Add a customer while the context is fresh."}</h2></div><button className="icon-ghost" onClick={onClose} aria-label="Close"><X size={18} /></button></div><div className="form-grid"><label>Full name<input value={form.full_name} onChange={e => update("full_name", e.target.value)} placeholder="e.g. Thiri Wai" /></label><label>Company<input value={form.company} onChange={e => update("company", e.target.value)} placeholder="Company or project" /></label><label>Phone<input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="09 …" /></label><label>Email<input value={form.email} onChange={e => update("email", e.target.value)} placeholder="name@company.com" type="email" /></label><label>Status<select value={form.status} onChange={e => update("status", e.target.value)}>{Object.entries(statusMeta).map(([key, meta]) => <option value={key} key={key}>{meta.label}</option>)}</select></label><label>Source<select value={form.source} onChange={e => update("source", e.target.value)}><option>Website</option><option>Referral</option><option>Instagram</option><option>Event</option><option>Other</option></select></label><label className="full">Tags<div className="tag-editor"><div className="tag-list">{form.tags.map(t => <span className="tag-pill" key={t}>{t}<button type="button" onClick={() => setForm(prev => ({ ...prev, tags: prev.tags.filter(x => x !== t) }))}>×</button></span>)}</div><input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && tagInput.trim()) { e.preventDefault(); setForm(prev => ({ ...prev, tags: Array.from(new Set([...prev.tags, tagInput.trim()])) })); setTagInput(""); } }} placeholder="Type a tag and press Enter" /></div></label><label className="full">Notes<textarea value={form.notes} onChange={e => update("notes", e.target.value)} placeholder="Keep the useful context here…" rows={4} /></label></div><div className="modal-foot"><button className="button-secondary" onClick={onClose}>Cancel</button><button className="button-primary" onClick={() => form.full_name.trim() ? onSave(form) : toast.error("Add a name before saving")}>{initial ? <Check size={16} /> : <Plus size={16} />} {initial ? "Save changes" : "Add customer"}</button></div></section></>; }

export default App;
