# design.md — Martta Xu Portfolio

*Last updated: February 2026*
*Keep this file under 150 lines. When updating, refine — don't just add.*

---

## 1. Design Identity

**One sentence:** Quiet confidence. The site steps back so the work steps forward.

**Three words:** Precise. Considered. Uncluttered.

**The hiring manager should leave thinking:** "She has taste." Not "wow, flashy" — taste. The kind that comes from knowing what to leave out.

---

## 2. What This Site Is Not

These are hard constraints. If a decision pushes toward any of these, it's the wrong decision.

- **Not a creative agency site.** No oversized cursors, no scroll-jacking, no text that explodes on entrance. Restraint is the point.
- **Not a resume dump.** Text exists to give context to work, not replace it. If a section is becoming a wall of words, cut it.
- **Not decoration-first.** Animation and interaction exist to aid comprehension or signal craft — never to entertain.
- **Not dark mode.** White is the canvas. The work provides the color.

---

## 3. Color

**Palette philosophy:** Black and white with a single accent. The accent is the only color that carries meaning — use it sparingly so it always lands.

```
--color-ink:       #1A1A1A   /* Primary text, borders */
--color-surface:   #FFFFFF   /* Page background */
--color-subtle:    #F5F5F5   /* Card backgrounds, subtle dividers */
--color-muted:     #999999   /* Captions, meta text, footer */
--color-accent:    #0072E5   /* Interaction only: highlights, the Ask Martta button */
```

**Rules:**

- Accent appears on: the "In Their Eyes" text highlight and the Ask Martta button only.
- Link hover color is `#1A1A1A` — not accent. Underline on hover is the only affordance for inline links.
- Accent never appears as: decorative backgrounds, section dividers, illustration color, nav hover states.
- When in doubt, use `--color-ink` at reduced opacity rather than reaching for a new color.

---

## 4. Typography

**Switzer** — UI, headlines, navigation, card titles, footer. Anything the user reads as interface.
**Geist Sans** — Body prose, captions. Anything the user reads as content.

```
Hero text:            Geist, 16px, weight 400, color #1A1A1A, letter-spacing 0.32px
Project title:        Switzer, 16px, weight 500, color #1A1A1A
Project description:  Switzer, 16px, weight 400, color rgba(26,26,26,0.5)
Section heading:      Switzer, 1.25rem, weight 500, line-height 1.3
Body / narrative:     Geist, 1rem, weight 400, line-height 1.7
Caption / meta:       Geist, 0.875rem, weight 400, color --color-muted
Nav:                  Switzer, 16px, weight 500, color rgba(26,26,26,0.5), letter-spacing 0.32px
Footer:               Switzer, 16px, weight 500, color rgba(26,26,26,0.5)
```

**Rules:**

- Never use bold weight for emphasis within body text. Use a new sentence instead.
- Never center-align body text. Left-aligned only.
- Heading hierarchy should be felt, not announced — avoid H1/H2/H3 visual jumps that feel like a document.

---

## 5. Spacing & Layout

**Philosophy:** When in doubt, add space. Padding should feel slightly more generous than necessary. The grid breathes.

```
Page horizontal pad:   72px on each side — no max-width cap, content fills the viewport width
Navbar padding:        20px 72px
Hero padding:          72px horizontal
Project section pad:   72px horizontal, 80px bottom; 60px gap between projects; 24px gap between images
Footer padding:        32px vertical, 72px horizontal
Section gap:           5rem–7rem vertical
```

**Border color:** `rgba(26,26,26,0.1)` for footer and nav borders (not `#E5E5E5`).

**Breakpoint:** 1200px. Below it: single column, graceful mobile layout.

**Rules:** Never crowd cards — reduce columns before reducing padding. Negative space is a design element; the hero's empty right column is intentional.

---

## 6. Animation & Interaction

**Philosophy:** Motion should feel slow and deliberate — like turning a page, not a notification ping.

```
Default duration:     400ms
Default ease:         cubic-bezier(0.4, 0, 0.2, 1)   /* Material "standard" — smooth deceleration */
Hover transitions:    200ms ease
Drawer slide-in:      450ms cubic-bezier(0.32, 0.72, 0, 1)
Drawer width:         380px; background: #f9f9fb
Profile card fade:    350ms ease, slight translateY(8px) → translateY(0)
```

**Rules:**

- Every animation must have a functional reason. "It looks cool" is not a reason.
- No entrance animations on page load. Content appears immediately — animation is reserved for interaction responses.
- Hover states on cards: subtle shadow lift + scale(1.015). Never scale more than 1.02.
- The Ask Martta drawer slides in from the right as a **push sidebar** — the main content column shrinks to make room. It does not overlay content. Width animates 0→380px.

---

## 7. Component Voice

**Project Cards (thumbnail-first layout):** Each project is a full-width vertical block. Top: a horizontal strip of 3 screenshot images (height 339px, gap 24px between images, border `1px solid rgba(204,209,218,0.2)`). Below the images (24px margin-top): project name (Switzer, 16px, weight 500, `#1A1A1A`) then a one-line description (Switzer, 16px, weight 400, `rgba(26,26,26,0.5)`), with 4px between them. Projects stack vertically with 60px gap. No hairline borders between projects.

**Tools Cards:** Slightly more playful than project cards (this is where "vibe coding" lives), but still contained within the grid's discipline.

**"In Their Eyes" Testimonials:** The interaction is the feature. Profile cards appear and disappear quietly — they should feel discovered, not announced.

**Ask Martta Drawer:** Functional and calm. Background: `#f9f9fb`. Width: 380px. Chat bubbles are minimal. Prompt chips are pill-shaped with `border-radius: 0 4px 4px 4px` (no top-left rounding) and Switzer Regular 16px. Placeholder: "Ask her anything". This is a tool, not a personality showcase.

**Navigation:** Invisible until needed. Sticky but unobtrusive — it should never compete with the work below it. Logo: `horse.svg` icon mark (32×32, `currentColor`) + "Martta XU" text. ASK Martta button uses `gemini-line.svg` (24×24). Nav links use pill-shaped containers: `px-12px py-4px rounded-full`.

**Hero inline links (company names):** Color `#1A1A1A` — blends with body text. Underline on hover is the only interaction affordance. No accent color.

---

## 8. Writing Style (for AI-generated or placeholder copy)

- Short sentences. Never more than 25 words.
- No adjective stacking. One strong word beats three weak ones.
- First person where appropriate ("I design access") — direct, not performative.
- No buzzwords: no "passionate," "innovative," "leverage," "synergy."
- Descriptions of work answer: *what was the problem, what changed because of the design* — not what tools were used.

---

## 9. How to Update This File

When a design decision is made during development, update this file as follows:

1. **Refine, don't append.** If a new rule makes an old one redundant, replace it.
2. **Keep it under 150 lines.** If it grows past that, something needs to be cut or merged.
3. **Log the decision reason in `CHANGELOG.md`**, not here. This file is principles, not history.

Good update prompt for AI: *"We just decided [X]. Update design.md to reflect this, remove anything now redundant, and keep the file under 150 lines."*