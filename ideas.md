# SmartFlow Myanmar — 3D Cinematic Modern-Tech CRM

## Design Directions

### Theme Name: Night Operations Ledger
A deep operational command center with cyan signal lines, layered glass panels, and restrained cinematic depth. It makes everyday CRM work feel like a precise automation control room.

**Probability:** 0.07

### Theme Name: Arctic Data Prism
A brighter ice-blue interface with translucent prism surfaces, cool white space, and high-clarity data cards. It emphasizes trust, clean analysis, and a premium SaaS feel.

**Probability:** 0.04

### Theme Name: Midnight Orbital Console
A deep-space control console with orbital rings, electric blue highlights, and large radial data moments. It feels immersive and technological, but remains focused on admin productivity.

**Probability:** 0.02

## Chosen Approach: Night Operations Ledger

### Design Movement
A cinematic interface design blending glassmorphism, industrial dashboard graphics, and restrained sci-fi control-room language. It is an operations workspace first: data, ownership, and next action remain more important than decoration.

### Core Principles
1. Every screen should answer three questions quickly: what is happening, who needs attention, and what should happen next.
2. Create depth through layered surfaces, soft volumetric lighting, inset shadows, and translucent panels rather than flat cards.
3. SmartFlow Signal Cyan marks workflow movement, green confirms progress, amber signals attention, and rose indicates risk or cancellation.
4. Bilingual copy remains concise and legible, with English labels available for operational terms where Myanmar translation can become ambiguous.
5. Real Supabase records are the product surface; missing records must produce clear empty states rather than invented examples.

### Color Philosophy
Midnight blue-black reduces glare during long admin sessions and gives the data hierarchy room to breathe. SmartFlow Signal Cyan is the navigational light that communicates connected workflow. Cool steel and soft white carry neutral data, green confirms healthy progress, amber marks follow-up attention, and coral-rose identifies destructive or cancelled states. Cinematic gradients and glows are limited to atmospheric depth and state emphasis, never used as generic decoration.

**Signature Brand Color:** SmartFlow Signal Cyan — `#12B8F4`.

### Layout Paradigm
A persistent left command rail anchors navigation and brand identity. The main area is a wide operational stage with a sticky utility header, asymmetric KPI slabs, workflow progression, searchable tables, and right-side customer detail drawers. On small screens, the rail becomes a compact top command bar and the workspace stacks vertically. The overview is a command center; Customers, Orders, and Follow-up Queue remain focused task views.

### Signature Elements
1. A cyan orbital trace motif derived from the SmartFlow arrow-loop, used as a subtle background contour and active-state accent.
2. Frosted glass data slabs with a thin cyan edge light, inner shadow, and slight depth offset.
3. A cinematic signal horizon with restrained ambient movement behind the workspace.
4. A connected-state indicator communicates live Supabase synchronization.

### Interaction Philosophy
Navigation should be immediate and low-friction, like operating a reliable instrument. Search and status filters narrow records in place. Editing happens in a modal close to the relevant workflow, while drawers preserve list context. Every successful database mutation produces a concise bilingual toast, and every loading or error state remains visible and understandable.

### Animation
Use 160–260ms ease-out transitions for navigation, table hover, drawer entrance, modal entrance, buttons, and toasts. Cards may rise 2px and brighten their edge light on hover. Use transform and opacity only for movement. The ambient background may drift slowly only when reduced motion is not enabled. Never animate data values excessively or use an always-on intense glow.

### Typography System
Use Space Grotesk for English headings and navigation labels, DM Sans for interface and body copy, IBM Plex Mono for labels, counts, IDs, and timestamps, and Noto Sans Myanmar for Myanmar text. Headlines are compact and operational; body copy is short enough for scanning. Metrics use tabular numerals and clear hierarchy rather than oversized decoration.

### Brand Essence
SmartFlow Myanmar is a private admin workspace for keeping customer conversations, orders, and follow-ups moving in one place with dependable workflow visibility. Personality: **focused, cinematic, dependable**.

### Brand Voice
Headlines are direct and action-oriented. CTAs name the operation instead of using generic filler. Microcopy explains whether data is loading, missing, connected, saved, or blocked.

Example lines: “Keep every customer signal in motion.” / “Save follow-up / နောက်ဆက်တွဲကို သိမ်းမည်”.

### Wordmark & Logo
Use the supplied SmartFlow Myanmar logo in the auth gate and persistent command rail. Where space is limited, use the arrow-loop symbol as a compact mark with a cyan edge treatment; never replace the supplied wordmark with default text-only branding.

### Asset Plan
Use the supplied logo as the only primary brand asset. Prepare a transparent logo treatment for the header and favicon where possible. Generate a small set of non-repeating cinematic abstract assets: one low-key signal-horizon background, one abstract glass-orbit accent, and one dark operational texture. These support the auth gate and dashboard atmosphere without competing with data clarity.

## Phone Shop Management Expansion

### Business vocabulary

The CRM will use phone-shop terms rather than generic sales terms: **Devices**, **IMEI/SKU**, **stock on hand**, **stock movement**, **sales**, **payments**, **gross margin**, **warranty**, **repairs**, **suppliers**, **expenses**, and **follow-ups**. Existing customers, orders, activities, and follow-ups remain the source of truth for already deployed workflows.

### Core workflows

1. **Dashboard:** revenue today, units sold, low-stock devices, pending payments, warranty/repair queue, and a compact sales trend.
2. **Inventory:** product catalog with brand, model, storage, color, condition, cost price, selling price, quantity, reorder threshold, and optional IMEI-specific units.
3. **Sales:** customer-linked sale with one or more devices, payment method/status, discount, delivery status, profit estimate, and receipt-ready detail.
4. **Warranty & Repairs:** warranty end date, repair intake, issue, status, technician/note, customer contact, and reminder date.
5. **Suppliers & Expenses:** supplier contacts, purchase references, expense categories, amount, date, and notes.

### UI direction

Use the supplied reference as a **mobile-dashboard composition reference**, not as a pixel-for-pixel clone: compact top utility bar, persistent side rail on desktop, bottom navigation/quick actions on mobile, card-based KPI hierarchy, restrained white/soft-gray content surfaces, and cobalt/cyan SmartFlow signal accents. Keep the existing cinematic navy authentication gate, then make the authenticated shop console cleaner and more operationally dense than the login screen. Avoid fabricated inventory, sales, reviews, ratings, or testimonials; empty states must clearly say when Supabase data has not been added.

## Style Decisions

- Keep SmartFlow Myanmar branding and the supplied logo; do not substitute the legacy Custora name or logo.
- Prefer dark, low-glare admin surfaces with layered cinematic depth over flat decorative marketing layouts.
- Remove fabricated demo customer/order/activity records from the UI.
- Keep Overview concise; use dedicated Customers, Orders, and Follow-up Queue views for detailed work.
- Treat Supabase errors, empty tables, loading states, and admin authorization as first-class product states.
- Every edited CSS/component/page file begins with a short file-specific reminder of the chosen visual philosophy.
- Avoid purple gradients, excessive rounded cards, generic centered layouts, and unreadable decorative effects.
- Auth gate rule: the supplied SmartFlow Myanmar logo or arrow-loop mark must visibly anchor the first impression rather than read as a small incidental icon.
- Signature motif rule: every primary screen should include one recognizable SmartFlow cyan orbital or ledger trace motif, used subtly but visibly.
- Typography rule: Myanmar copy leads for local clarity, while English operational labels use Space Grotesk or IBM Plex Mono for a precise console voice.
