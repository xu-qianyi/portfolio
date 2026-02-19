# PRD.md — Martta Xu Portfolio (2026)

_Version: 2.1_
_Last updated: February 2026_
_Author: Martta Xu_

> For all visual and interaction decisions, refer to `design.md`.

---

## 1. Product Vision

**Primary goal:** Convert hiring managers and recruiters into interview offers — by showing the quality of the work, not just the résumé.

**Core identity:** "I design access."

**Development philosophy:** Vibe First. The frontend must feel right before any backend or AI logic is connected.

---

## 2. Sitemap

```
/               Home — work overview
/about          About — who Martta is, in two voices
/tools          Tools — vibe coding showcase
```

---

## 3. Global Shell

**Navbar (sticky)**

Layout: `display: flex; justify-content: space-between; align-items: center; align-self: stretch;`

- Logo: `horse.svg` icon mark (32×32) + "Martta XU" text → `/`
- Resume → external PDF (Google Drive, new tab)
- About → `/about`
- Tools → `/tools`
- ✦ ASK Martta → opens the Ask Martta drawer (primary action, right-aligned)

**Footer**

- Left: © 2026 Martta Xu
- Right: LinkedIn → external, new tab

---

## 4. Pages

### 4.1 Home (`/`)

**Wireframes:** `images/UI reference`

**Hero**
The entry point. Two-column layout: the headline occupies the left column; the right column is intentional negative space. Body-sized and editorial — intentionally understated, not a large display headline.

Headline:

> "I design access. I studied complicated things because I believe they should be easier for everyone. Previously made wealth management approachable at Datalign, fractional real estate intuitive at ARK7, and built strategy at Sanofi, JLL, and PwC — always asking: why does this have to be so hard to use?"

Company names link to their official sites (new tab). Link color is `#1A1A1A` — not the accent color. Underline on hover is the only interaction affordance.

**Project Grid**
The work. Thumbnail-first layout. Each project is a full-width vertical block, stacked vertically.

Each block contains:

1. **Image strip** — 3 project screenshots side-by-side
2. **Project name**
3. **One-line description**, 4px below the name

Data sourced from `src/data/projects.json`. Each entry requires: `id`, `title`, `description`, `images` (array of 3 URLs).

---

### 4.2 About (`/about`)

Two distinct sections, two distinct voices.

**A. "In Their Eyes" — Social proof through others' words**

A list of testimonials from colleagues and collaborators. The interaction: hovering a quote highlights a key phrase and surfaces a profile card (name, role, photo) that appears left or right of the text — alternating as the user reads down the page. The effect should feel discovered, not announced.

Reference aesthetic: YC "In Founders' Words" (ycombinator.com).

Data sourced from `src/data/testimonials.json`.

**B. "In Her Own Eyes" — Personal narrative**

A first-person essay in Martta's own voice. Prose only. No bullet points, no headers. This section answers: who is she beyond the work?

---

### 4.3 Tools (`/tools`)

Demonstrates vibe-coding capability — real tools Martta has built. Each card shows a live preview (image or GIF), title, short description, tech stack, and a "Click to play" action.

Data sourced from `src/data/tools.json`.

---

### 4.4 Ask Martta (Global Drawer)

An AI assistant accessible from anywhere via the navbar. The goal is to help recruiters and hiring managers understand Martta more deeply — beyond what a résumé or case study can convey. It speaks in first person, as Martta.

**Reference:** RacheLLM on rachelchen.tech

---

**UI & Behavior**

- Slides in from the right as a **push sidebar**. The main content column shrinks to accommodate it — the sidebar does not overlay content.
- Closeable via × button, clicking outside, or pressing `Escape`.
- Accessible: focus moves into drawer on open, returns to trigger on close.
- On first open, shows a brief intro and 3 default prompt chips. Once a conversation starts, chips disappear.
- Input placeholder: "Ask her anything".

**Intro message (on first open):**

> "Hi, I'm Martta AI. Ask me anything about my work, process, or background — I'm here to help you figure out if we'd be a good fit."

**Default prompt chips:**

1. What is your design process?
2. When will you be available?
3. How do you vibe code?

---

**Voice & Tone**

- First person, as Martta. "I believe…", "In my experience…", "At ARK7, I…"
- Confident but not rehearsed. Thoughtful, not corporate.
- Matches the writing style in `design.md §8` — short sentences, no buzzwords.
- Never says "As an AI…" or breaks the persona.

---

**Knowledge Base**
Ask Martta is grounded in a single source-of-truth file: `src/data/martta-knowledge.md`

This file contains everything the AI is allowed to know and say:

| Section         | Content                                            |
| --------------- | -------------------------------------------------- |
| Resume          | Work history, roles, companies, dates              |
| Projects        | Problem, process, outcome for each case study      |
| Tools           | What was built, why, what tech was used            |
| Personal story  | Background, career path, motivations               |
| Design opinions | Her point of view on craft, process, accessibility |
| FAQs            | Pre-written answers to common recruiter questions  |

This file is the only thing that needs updating when Martta's story evolves. The AI prompt references it as context on every request.

---

**Out-of-scope handling**
If asked something outside the knowledge base (salary expectations, confidential work, personal contact details), Ask Martta deflects gracefully and redirects:

> "That's not something I can speak to here — but feel free to reach out to Martta directly on LinkedIn."

It never fabricates, never guesses, and never breaks character.

**Disclaimer (persistent, below the chat input):**

> "Martta AI can make mistakes and occasionally hallucinate. For anything important, please verify directly with Martta."

Styled in `--color-muted`, small type. Always visible — not a one-time dismissible banner.

---

**Phases**

**Phase 1 (UI shell):** Drawer animation, intro message, default prompt chips, chat bubble layout. No API.

**Phase 4 (Live):** Connect to Claude API via Vercel AI SDK. System prompt references `martta-knowledge.md` as full context. Streaming responses enabled for a natural feel.

---

### 4.5 404 Page

A custom not-found page. Should feel intentional, not broken — consistent with the site's visual identity.

**Content:** A short, dry line in Martta's voice (e.g. "This page doesn't exist. But good design should be easy to find.") + a single link back to `/`.

**No elaborate illustration or animation.** Restraint applies here too.

---

## 5. Content Notes

⚠️ All project descriptions, essay copy, and testimonials are placeholder. Use Lorem Ipsum freely during the build — do not wait for final copy to unblock UI work.

---

## 6. Technical Stack

|           |                                                                                             |
| --------- | ------------------------------------------------------------------------------------------- |
| Framework | Next.js 14+ (App Router)                                                                    |
| Styling   | Tailwind CSS                                                                                |
| Animation | Framer Motion                                                                               |
| Fonts     | Switzer (UI), Geist Sans (body)                                                             |
| Viewport  | Tablet + desktop + mobile. A simplified, graceful mobile layout. Large breakpoint = 1200px. |

---

## 7. Development Phases

**Phase 1 — The Canvas**
Project setup. Global shell (Navbar, Footer). Design tokens and fonts configured.

**Phase 2 — The Look**
Static layouts for all three pages. Placeholder images and copy throughout.

**Phase 3 — The Vibe**
Interactions: "In Their Eyes" hover + profile cards, project and tool card hovers, Ask Martta drawer open/close animation.

**Phase 4 — The Brain**
Real assets and copy replace placeholders. Ask Martta connected to Claude API via Vercel AI SDK. Integrate Vercel Analytics.
