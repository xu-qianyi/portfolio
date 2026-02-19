# CHANGELOG.md

## Unreleased

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
