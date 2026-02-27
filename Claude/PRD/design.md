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
--color-accent:    #003966   /* Interaction only: highlights, the Ask Martta button */
```

**Rules:**

- Accent appears on: the "In Their Eyes" text highlight and the ASK Martta button hover state only.
- Link hover color is `#1A1A1A` — not accent. Underline on hover is the only affordance for inline links.
- Accent never appears as: decorative backgrounds, section dividers, illustration color, nav hover states.
- When in doubt, use `--color-ink` at reduced opacity rather than reaching for a new color.

---

## 4. Typography

**Playfair Display** — Hero headline, navigation, Animal Garden footer text. Serif weight for editorial presence.
**Geist** — UI, body, card metadata, drawer. Anything the user reads as interface or content.

```
Hero text:            Playfair Display, 48px, weight 500, line-height 52px, letter-spacing 0.96px, color #1A1A1A
Project metadata:     Geist, 14px, weight 500, color rgba(26,26,26,0.5); dot separators between company · date · type
Project headline:     Playfair Display, 20px, weight 400, line-height 130%, color #1A1A1A
Section heading:      Geist, 1.25rem, weight 500, line-height 1.3
Body / narrative:     Geist, 1rem, weight 400, line-height 1.7
Caption / meta:       Geist, 0.875rem, weight 400, color --color-muted
Nav:                  Playfair Display, 18px, weight 500, color #1a1a1a, letter-spacing 0.32px; Resume/About/Tools hover: 50% opacity
Footer (Animal Garden): Playfair Display, 12px, italic, color #1A1A1A (mobile slightly smaller)
```

**Rules:**

- Never use bold weight for emphasis within body text. Use a new sentence instead.
- Never center-align body text. Left-aligned only.
- Heading hierarchy should be felt, not announced — avoid H1/H2/H3 visual jumps that feel like a document.

---

## 5. Spacing & Layout

**Philosophy:** When in doubt, add space. Padding should feel slightly more generous than necessary. The grid breathes.

```
Page horizontal pad:   24px on each side — no max-width cap, content fills the viewport width
Navbar padding:        16px 24px; height fit-content
Hero padding:          64px vertical, 24px horizontal; column-gap 16px; grid 2fr / 1fr
Project section pad:   24px horizontal, 80px bottom; 2-column masonry via CSS columns at lg (1024px+), 24px column-gap, 48px row-gap between cards
Footer padding:        16px vertical, 24px horizontal (desktop/tablet); 12px vertical, 16px horizontal (mobile)
Section gap:           5rem–7rem vertical
```

**Border color:** `rgba(26,26,26,0.08)` for footer (and any remaining dividers), not `#E5E5E5`.

**Breakpoint:** Tablet and below (<1024px): projects stack in a single column. From 1024px (lg): 2-column masonry.

**Rules:** Never crowd cards — reduce columns before reducing padding. Negative space is a design element; the hero's empty right column is intentional.

---

## 6. Animation & Interaction

**Philosophy:** Motion should feel slow and deliberate — like turning a page, not a notification ping.

```
Default duration:     400ms
Default ease:         cubic-bezier(0.4, 0, 0.2, 1)   /* Material "standard" — smooth deceleration */
Hover transitions:    300ms cubic-bezier(0.4, 0, 0.2, 1)
Drawer slide-in:      Spring (stiffness 260, damping 28, mass 0.9)
Drawer width:         360px; glass: rgba(249,249,251,0.72), backdrop-filter blur(12px), border-left rgba(255,255,255,0.5)
Profile card fade:    350ms ease, slight translateY(8px) → translateY(0)
```

**Rules:**

- Every animation must have a functional reason. "It looks cool" is not a reason.
- No entrance animations on page load. Content appears immediately — animation is reserved for interaction responses.
- Hover states on cards: subtle shadow lift + scale(1.015). Never scale more than 1.02.
- The Ask Martta drawer slides in from the right as a **push sidebar** — the main content column shrinks to make room. It does not overlay content. Width animates 0→360px.

---

## 7. Component Voice

**Project Cards (masonry layout):** Two-column masonry from lg (1024px); each card is a single cover image + two-row text block.

```
Layout:                CSS columns: 2 at lg+, column-gap 24px; break-inside avoid; <1024px → columns: 1 (vertical stack)
Card gap:              48px vertical between cards (margin-bottom)
Image:                 width 100%, aspect-ratio from data (varies per card), object-fit cover, border 1px solid rgba(204,209,218,0.2)
Metadata row:          Geist, 14px, weight 500, rgba(26,26,26,0.5); items separated by ·  dot dividers (4px circle, same color); 16px above
Headline:              Playfair Display, 20px, weight 400, line-height 130%, #1A1A1A; 4px below metadata
```

**Tools Cards:** Slightly more playful than project cards (vibe coding), still within grid discipline.

**"In Their Eyes" Testimonials:** Profile cards appear/disappear quietly — felt discovered, not announced.

**Ask Martta Drawer:** Push sidebar; all specs below.

```
Container:              width 360px; glass: rgba(249,249,251,0.72), backdrop-filter blur(12px), -webkit-backdrop-filter, isolation isolate, border-left 1px solid rgba(255,255,255,0.5)
Header:                 flex, 360×76px, padding 16px 24px, "Martta Cloned", border-bottom rgba(26,26,26,0.08)
Prompts:                text links + corner-down-left-line.svg, 6px gap, 6px vertical padding; color #717171, hover/focus #003966 + rgba(236,243,248,0.5) 16px row
User bubble:            max-width 270px, padding 12px, border-radius 4px 4px 0 4px, border 1px solid rgba(26,26,26,0.12), rgba(255,255,255,0.65), backdrop-filter blur(6px)
Assistant:              no bubble, no max-width; Geist 15px/400, line-height 160%, #1A1A1A
Message entrance:      opacity 0→1, translateY 8→0, 350ms easeOut
Send:                   arrow-up-line.svg; muted until input has content, then #1A1A1A
Input:                  padding 12px, gap 12px, border-radius 4px, rgba(255,255,255,0.65), backdrop-filter blur(6px); placeholder "Ask her anything"
Disclaimer:             Geist 13px, rgba(26,26,26,0.5), line-height 14px; 12px below input; section bottom 32px
Messages gap:           32px
```

**Navigation:** Sticky, unobtrusive. Logo + links + ASK button.

```
Logo:                  许谦益之印_红色.svg 28×28 + "Martta XU"; Playfair Display 18px, color #1a1a1a
Pill links:            Resume, About, Tools; padding 8px; Playfair Display 18px, #1a1a1a; hover 50% opacity
ASK Martta:            icon only, gemini-line.svg 20×20; default #1a1a1a; hover border-radius 4px, bg #ECF3F8, icon #003966; transition 300ms cubic-bezier(0.4,0,0.2,1); aria-label "Ask Martta"
```

**Hero inline links (company names):** Blend with body; underline on hover only. No accent.

```
Color:                  #1A1A1A
Hover:                  underline only
```

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
2. Log decision reason in `CHANGELOG.md`, not here. All codes should be in code block, not in text

