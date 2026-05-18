# RoboParadigm Website Build Plan

Build a multi-page deeptech-style marketing site for RoboParadigm based on the handoff doc. Positioning: serious full-stack robotics & AI automation lab — not a student project page.

## Sitemap (separate routes for SEO/SSR)

- `/` — Home (hero, what we do, capabilities, project highlights, why us, CTA)
- `/about` — Who we are, vision, mission, what makes us different
- `/architecture` — 5-Layer Robotics Intelligence Stack (AI Decision, Control, Hardware Interface, Power, Physical Structure)
- `/projects` — 7-DOF arm, ServoPilot, Mobile Manipulator, Agentic Pipeline, OMX wrist-roll, Robot Learning
- `/technology` — Full-stack tech layers (ROS 2, MoveIt, Nav2, perception, learning, embedded)
- `/research` — Research directions & ongoing work
- `/learning` — Programs for students/interns
- `/collaborations` — Partner / collab copy
- `/contact` — Email, location, CTAs

Shared header (nav + logo) and footer (links, contact, tagline) via `__root.tsx`.

## Design Direction

Deeptech robotics lab aesthetic:
- Dark-dominant theme with a sharp accent (electric cyan or amber)
- Mono/technical type pair (e.g. Space Grotesk display + Inter body, JetBrains Mono for tags)
- Grid/blueprint motifs, subtle scanlines, layered cards with status badges
- Project cards with status badges (Demo Ready, In Development, Research Track) and tech tags
- 5-layer architecture rendered as a vertical stack diagram with per-layer detail cards
- Restrained motion: fade/slide on scroll, hover lifts

Before building I'll ask the user to pick a palette + typography direction.

## Content

All copy lifted from the handoff PDF (hero, capabilities table, 5 layers with functions/tech/inputs/outputs, project tables, tech stack table, SEO keywords woven into meta).

## Technical

- TanStack Start file-based routes under `src/routes/`
- Each route gets its own `head()` with unique title + meta (SEO keywords from doc)
- Design tokens in `src/styles.css` (oklch), semantic Tailwind utilities only
- Reusable components: `Header`, `Footer`, `SectionHeading`, `ProjectCard`, `LayerCard`, `CapabilityCard`, `CTASection`
- Generated hero/architecture illustrations via imagegen (robotic arm, layer stack visualization)
- No backend needed (contact = mailto). Can add Lovable Cloud later if a contact form is wanted.

## Out of scope (for now)

- Working contact form backend
- CMS / blog
- Auth
