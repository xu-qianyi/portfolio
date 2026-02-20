# [CHANGELOG.md](http://CHANGELOG.md)

All changes listed newest-first. One section per work session.
Format: `[YYYY-MM-DD · Session X · <commit-hash>]` — machine-readable date + session label + git commit hash(if any).

---

## [2026-02-19 · Session D · b67fd53] — Polish pass (spacing, typography, interactions)

### Changed

- **Hero layout** — grid: `minmax(0, 2fr) / minmax(0, 1fr)`, padding `64px 72px`, column-gap `16px`, `inline-grid` + `align-self: stretch`
- **Hero font** — replaced Geist body text with Crimson Pro Medium 48px / 52px line-height / 0.96px letter-spacing
- **Hero copy** — "Martta is a product designer who stands at the intersection of design, business, and engineering."
- **Project card text gap** — 4px → 2px between title and description
- **Nav pill padding** — `4px 12px` → `8px` all sides (Resume, About, Tools, ASK Martta)
- **ASK Martta hover radius** — no longer transitions; fixed at `4px` in both default and hover states
- **ASK Martta hover transition** — `200ms ease` → `300ms cubic-bezier(0.4, 0, 0.2, 1)` (smoother)
- **Image strip breakpoint** — custom CSS class replaced with Tailwind `min-[1350px]:grid-cols-3` to avoid Tailwind v4 layer conflicts; behavior unchanged (3-col ≥1350px, 1-col below)

### Added

- **Crimson Pro** — loaded via `next/font/google` (weight 500), exposed as `--font-crimson-pro` CSS variable

---

## [2026-02-19 · Session C · b67fd53] — Bug fixes (hover + slogan)

### Fixed

- **ASK Martta hover** — replaced CSS class approach (broken against inline styles) with React `useState`; hover now correctly shows `#ECF3F8` background, `border-radius: 4px`, `#1087E6` text/icon
- **Hero slogan** — updated to "Martta is a product designer who stands at the intersection of design, business, and engineering." (Crimson Pro Medium, 48px, line-height 52px, letter-spacing 0.96px)

### Added

- **Crimson Pro** — loaded via `next/font/google` (weight 500), exposed as `--font-crimson-pro` CSS variable

---

## [2026-02-19 · Session B · b67fd53] — Figma review sync

### Changed

- **Breakpoint** — 1200px → 1350px; project image strip switches from 3-col to 1-col below 1350px
- **ASK Martta button** — default: grey, no background (same as nav links); hover: `border-radius: 4px`, background `#ECF3F8`, text/icon `#1087E6`
- **Drawer animation** — fixed-duration ease → spring (`stiffness: 260`, `damping: 28`, `mass: 0.9`) for softer open/close feel
- **Disclaimer (Ask Martta)** — 12px `--color-muted` → Switzer 13px, weight 400, line-height 14px, `rgba(26,26,26,0.50)`

---

## [2026-02-19 · Session A · 287ac45] — Phase 1 build

### Changed

- **Logo size** — Navbar horse icon: 18×18 → 32×32px
- **ASK Martta icon** — replaced `✦` Unicode with `gemini-line.svg` (24×24, `currentColor`)
- **Hero font weight** — Geist weight 500 → 400 (Regular), matching Figma spec
- **Hero grid gap** — uniform `48px` → `columnGap: 32px` / `rowGap: 80px`; padding normalized to `72px` all sides
- **Project card text gap** — title/description gap: 8px → 4px; margin-top from image strip: 16px → 24px
- **Project image border** — `rgba(171,171,171,0.2)` → `rgba(204,209,218,0.2)` (cooler blue-gray per Figma)
- **Prompt chips** — background: white + `1px` border → `rgba(204,209,218,0.2)` fill, no border
- **Prompt chip copy** — updated to match Figma: "What is your design process?", "When will you be available?", "How do you vibe code?"
- **Ask Martta drawer** — changed from fixed overlay to **push sidebar**: main content column (`flex: 1`) shrinks; sidebar animates `width: 0 → 380px` via Framer Motion; no backdrop

### Removed

- JLL and PwC entries from `projects.json`

