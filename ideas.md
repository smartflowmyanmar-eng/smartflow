# Custora — Design Direction

## Three Directions Considered

### Theme Name: Paper Ledger
Very brief intro: A warm editorial CRM that feels like a carefully kept customer notebook, with paper surfaces, ink typography, and an understated terracotta signal. It makes customer care feel personal and organized.
Probability: 0.03

### Theme Name: Quiet Utility
Very brief intro: A restrained monochrome operations tool with precise grids, compact tables, and a single human accent color. It prioritizes calm focus over visual noise.
Probability: 0.07

### Theme Name: Signal Garden
Very brief intro: A soft organic interface where customer relationships are represented as connected pathways, using sage, clay, and ink. It adds warmth without becoming playful or decorative.
Probability: 0.02

## Chosen Approach: Paper Ledger

### Design Movement
Contemporary Swiss editorial design crossed with analog archival stationery: strong typographic hierarchy, asymmetric composition, visible rhythm, and tactile surfaces that feel like a premium customer notebook rather than a generic SaaS dashboard.

### Core Principles
1. Every screen should feel skimmable in three seconds, with one strong title, one primary action, and a clear data rhythm.
2. Warmth comes from material, typography, and microcopy—not from decoration or excessive color.
3. The interface should make customer care feel deliberate: keep context visible, reduce hidden states, and surface follow-up work.
4. Use asymmetry and editorial alignment to create character while preserving operational clarity.

### Color Philosophy
Warm ivory is the page, ink navy is the trusted record, terracotta is the human signal for action, and sage is the quiet confirmation color. Terracotta is reserved for moments that deserve attention—add, follow up, selected states—so it remains ownable and meaningful. The palette should feel like paper, ink, and a well-used red pencil.

### Layout Paradigm
A left archival rail anchors navigation like a notebook spine. The main workspace uses a two-column editorial composition: a wide customer ledger and a narrower follow-up column. Detail surfaces slide in from the right rather than replacing context, keeping the customer list visible as a source of orientation.

### Signature Elements
1. Archival index tabs and small registration marks around section headers.
2. A terracotta “care line” that appears beside follow-up items and selected customer states.
3. A subtle ruled-paper texture and monospaced metadata labels for dates, tags, and record IDs.

### Interaction Philosophy
Interactions should feel like handling a physical record: selection is immediate and visible, edits happen close to the data, and destructive actions require a clear pause. Every save should produce a short, quiet confirmation. Search and filters should feel like narrowing a filing cabinet, not opening a new page.

### Animation
Use 160–220ms ease-out transitions for hover, selection, and filter changes. Use a 260ms right-to-left drawer entrance for customer detail. Stagger dashboard cards by 40ms on first entry. Never animate keyboard-triggered actions or essential state changes. Respect `prefers-reduced-motion` by removing non-essential transforms.

### Typography System
Use Fraunces for display headlines and section titles, DM Sans for body/UI text, and IBM Plex Mono for metadata, tags, timestamps, and customer IDs. Headlines should be compact and slightly expressive; body copy should remain highly legible. Use sentence case rather than all-caps except for tiny metadata labels.

### Brand Essence
Custora is a calm customer notebook for solo operators who want every relationship to stay visible, remembered, and actionable. Personality: **observant, warm, exacting**.

### Brand Voice
Headlines sound like a thoughtful colleague; CTAs are direct and human; microcopy explains what happens next without jargon.
Example lines: “Keep the people behind the pipeline in view.” / “Add a customer while the context is fresh.”

### Wordmark & Logo
The mark is a pair of offset archival tabs forming an interlocking connection motif. The wordmark uses a custom-feeling serif display treatment with a slight optical gap between “cus” and “tora” to echo an index tab. Never render the brand as a default system wordmark.

### Signature Brand Color
Terracotta Signal — `#C7654A`, a warm clay red that feels like a human annotation in an otherwise quiet record.

## Style Decisions

- Use warm ivory backgrounds, ink navy text, terracotta actions, and sage confirmations.
- Prefer editorial asymmetry over generic centered dashboard grids.
- Use generated Custora mark and abstract archive artwork as the visual identity; keep product screens data-first.
- Avoid purple gradients, excessive rounded cards, and generic Inter-first styling.
