# SmartFlow Myanmar — Design Direction

## Current Product Direction

The product name is **SmartFlow Myanmar**. The interface is an admin-only bilingual customer and order console connected to Supabase. The redesign intentionally replaces the previous decorative dashboard with a focused operations workspace: fewer decorative charts, more actionable records, clear states, and real database-backed empty states.

## Chosen Approach: Night Operations Ledger

### Design Movement
A restrained operations-console interpretation of editorial data design: midnight ink surfaces, structured record panels, compact mono metadata, and bright workflow signals. It is designed for an administrator who needs to see the next action quickly rather than browse a marketing dashboard.

### Core Principles
1. Every screen should answer three questions quickly: what is happening, who needs attention, and what should happen next.
2. Real Supabase records are the product surface; missing records must produce clear empty states rather than invented examples.
3. Cyan marks workflow movement, green confirms progress, amber signals attention, and rose indicates risk or cancellation.
4. Bilingual copy remains concise and legible, with English labels available for operational terms where Myanmar translation can become ambiguous.

### Color Philosophy
Midnight navy reduces glare during long admin sessions and gives the data hierarchy room to breathe. Cyan is the ownable SmartFlow signal for connected workflow, green is reserved for completed or healthy states, amber is reserved for follow-up attention, and rose is reserved for destructive or cancelled states. No gradients are used as decoration; any glow is limited to subtle state emphasis.

### Layout Paradigm
A persistent left workspace rail anchors navigation. The main area is a wide operational canvas with a sticky utility header, asymmetric analytics panels, workflow progression, searchable tables, and right-side customer detail drawers. The overview is a command center; Customers, Orders, and Follow-up Queue are focused task views.

### Signature Elements
1. A cyan connected-state indicator communicates live Supabase synchronization.
2. Compact status badges and horizontal bars make workflow distribution scannable.
3. Right-side customer drawers preserve list context while exposing contact details, notes, and activity history.

### Interaction Philosophy
Navigation should be immediate and low-friction. Search and status filters narrow records in place. Editing happens in a modal close to the relevant workflow, while archive and future integrations provide an explicit notice until their confirmation rules are implemented. Every successful database mutation produces a concise toast.

### Animation
Use 160–240ms ease-out transitions for navigation, table hover, drawer entrance, and modal entrance. Keep loading and synchronization states visible but restrained. Never animate data values excessively. Respect prefers-reduced-motion.

### Typography System
Use Space Grotesk for headings, DM Sans for UI and body copy, IBM Plex Mono for labels, counts, IDs, and timestamps, and Noto Sans Myanmar for Myanmar text. Headlines are compact and operational; body copy is short enough for scanning.

### Brand Essence
SmartFlow Myanmar is a private admin workspace for keeping customer conversations, orders, and follow-ups moving in one place. Personality: **focused, dependable, connected**.

### Brand Voice
Headlines are direct and action-oriented. CTAs name the operation instead of using generic filler. Microcopy explains whether data is loading, missing, or connected.

Example lines: “A clear view of every customer move.” / “Move every order forward.”

### Wordmark & Logo
Use the supplied SmartFlow Myanmar logo in the auth gate and persistent sidebar. The wordmark must not be replaced with a default text-only brand treatment.

### Signature Brand Color
SmartFlow Cyan — `#09C8ED`, used for active navigation, connected-state indicators, workflow movement, and the primary action.

## Style Decisions

- Keep SmartFlow Myanmar branding; do not substitute the legacy Custora name or logo.
- Prefer dark, low-glare admin surfaces over decorative marketing layouts.
- Remove fabricated demo customer/order/activity records from the UI.
- Keep Overview concise; use dedicated Customers, Orders, and Follow-up Queue views for detailed work.
- Treat Supabase errors, empty tables, and loading states as first-class product states.
