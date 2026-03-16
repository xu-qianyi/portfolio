# [CHANGELOG.md](http://CHANGELOG.md)

All changes listed newest-first. One section per work session. Do not include the changes made to **[design.md](http://design.md) and master PRD.md**  
Format: `[YYYY-MM-DD · Session X · <commit-hash>]` — machine-readable date + session label + git commit hash(if any).

---

## [2026-03-15 · Session P] — Footer polish + about page copy + navbar logo

### Changed

- **Footer background** — `#ffffff` → `#f8f8f8`
- **Footer time string** — removed "(Open to relocate)"; color `rgba(26,26,26,0.5)` → `#1a1a1a`
- **About page layout** — switched to `grid lg:grid-cols-2`; added responsive padding; added right-column nav links (Resume, Work, Extras) visible on sm+
- **About page copy** — merged Swing sentence into first paragraph; simplified "path" paragraph
- **Navbar logo** — added `yin.svg` icon (18×18) beside "Martta XU" text

---

## [2026-03-15 · Session O · 0ab7ffa] — About page build

### Added

- **`portfolio/src/app/about/page.tsx`** — About page. Text section (left 50% desktop, full width tablet/below) + placeholder photo strip (6 boxes, `height: 320px`). Page hugs content height — no forced full-viewport stretch.
- **`portfolio/src/components/CopyEmail.tsx`** — "let's talk" interactive element: CSS `:hover` tooltip below the link showing copy icon + "copy email"; on click copies `martta.xu@outlook.com`; tooltip switches to checkmark + "copied!" state. Pure CSS hover to avoid gap/flicker issues.
- **CSS classes in `globals.css`** — `.copy-email-wrapper`, `.copy-email-btn`, `.copy-email-tooltip`, `.copy-email-arrow`, `.copy-email-box`, `.about-headline`.

### Changed

- **`Shell.tsx`** — removed `minHeight: "100vh"` from both the outer wrapper and the inner flex div; pages now hug content height.
- **`globals.css`** — `.about-headline`: accent red (`#EC4523`) + dotted underline + faint orange background, static (no hover change needed).

### Docs

- **master PRD.md** — §4.2 About page fully rewritten to reflect what was built (replaced old "In Their Eyes / In Her Own Eyes" concept).

---

## [2026-03-15 · Session N · 55a6c37] — Hero nav links + footer social links + navbar simplification

### Added

- **`hero-nav-link` CSS class** (`globals.css`) — identical to `hero-company-link` but `::after` uses `content: attr(data-num)` to render numbered badges ("1"/"2"/"3") instead of `✦`.

### Changed

- **Navbar** — right pill links (Resume/About/Extras) removed; logo only remains.
- **Hero right column** — Resume/About/Extras added as `hero-nav-link` links (`data-num` 1/2/3); desktop: vertical stack, right-aligned; tablet (sm+): horizontal row below headline; mobile: hidden.
- **Footer text row** — layout changed from `flex-column` to `flex-row space-between`; CHANGELOG, LinkedIn, X added as `hero-nav-link` links on the right (`flex-col items-end`, gap 4px, top-aligned).
- **Hero padding** — desktop: `52px top / 64px bottom`; tablet: `28px top / 40px bottom`; default: `64px`. Row-gap reduced `80px → 40px`.

### Docs

- **design.md** — Nav spec updated (logo only); hero spacing updated; footer spec updated; hero link section rewritten to document both `hero-company-link` and `hero-nav-link`; accent color rules updated.
- **master PRD.md** — Navbar section updated (no pill links); hero description updated.

---

## [2026-03-15 · Session M · b5bc9ae] — Footer typography overhaul + live Boston clock + CatEars

### Changed

- **Footer font** — Playfair Display italic → Geist, 14px, weight 500 (matches project metadata style).
- **Footer line 1** — static copyright text replaced with a live Boston clock: `[h:mm am/pm] in Boston, MA (Open to relocate)`; updates every 60s via `setInterval` + `Intl.DateTimeFormat` with `timeZone: "America/New_York"`; color `rgba(26,26,26,0.5)`.
- **Footer line 2** — 😊 emoji replaced with inline animated `CatEars` SVG component (size 32, color `#1a1a1a`); two cat ears twitch independently on a 12s loop.
- **Footer line colors** — line 1: `rgba(26,26,26,0.5)`; line 2: `#1a1a1a` (was `#E04020`).
- **Footer text row gap** — `display: flex; flexDirection: column; gap: 0` to tighten the two lines.

### Docs

- **design.md** — Typography section updated: Playfair Display scope narrowed (hero headline, project headlines, nav); Geist scope expanded to include footer; footer spec rewritten.
- **master PRD.md** — Footer copy spec updated to reflect live clock, new colors, and CatEars SVG.

---

## [2026-03-15 · Session L] — Nav rename: Tools → Extras

### Changed

- **Nav item rename** — "Tools" → "Extras"; `id`, `label`, and `href` updated in `Navbar.tsx` (`/tools` → `/extras`).

### Docs

- **master PRD.md** — sitemap, navbar spec, and section 4.3 heading updated to "Extras" / `/extras`.
- **design.md** — nav typography line and pill links spec updated to "Extras".

---

## [2026-03-14 · Session K · f832c42] — Hero copy update + footer/garden bug fixes

### Changed

- **Hero copy** — updated headline per PRD: added "And in the curating - knowing where to linger, and where to let go."; current role sentence changed to "Right now I'm at Datalign✦, building in wealth management."; "Previously:..." moved to new line via `<br />`.
- **Datalign inline link** — `<a href="#">` replaced with `<span className="hero-company-link">` since no external URL exists yet; avoids page-scroll-to-top and accessibility confusion.
- **Shell footer layout** — `AnimalGardenFooter` moved out of the main flex column into a `position: fixed` wrapper at the bottom; main content uses `marginBottom: footerH` (measured via `ResizeObserver`) to create the scroll-reveal effect.

### Fixed

- **SSR hydration flash** — `AnimalGardenFooter` now calls `setVw(window.innerWidth)` immediately on mount (before attaching resize listener), preventing a mobile/desktop layout mismatch on first render.
- **Garden width stale read** — replaced `offsetWidth` snapshot inside a `[vw]` effect with a persistent `ResizeObserver` on `gardenRef`; eliminates stale-width bug and reacts correctly to CSS-driven resizes.
- **wobblePlant re-render** — wrapped in `useCallback([], [])` to stabilize the function reference passed as `onMouseEnter` to 14 flower elements.

---

## [2026-03-03 · Session J] — Stability hardening (runtime, assets, footer perf)

### Changed

- **Runtime baseline** — standardized project runtime on Node 22 (`.nvmrc` + `package.json` `engines.node`) to reduce environment drift and engine warnings.
- **Dependency alignment** — aligned `eslint-config-next` with installed Next major and aligned React type packages with React 18 runtime.
- **Project preview source** — removed remote placeholder dependency for `datalign2`; switched to local `/public/images/preview/website-placeholder.svg` for deterministic loading.
- **Footer mouse tracking** — removed per-mousemove React state updates for the wand cursor; switched cursor positioning to ref-based DOM updates to avoid high-frequency re-renders while preserving cat chase behavior.

### Removed

- **Duplicate Lottie asset** — deleted `Nars-playful 2.json` from `public/images/preview`.

### Fixed

- **Build gate** — resolved lint-blocking unused parameter in `useMarttaChat` placeholder reply helper.

### Docs

- **master PRD.md** — synced Home project grid data contract and tech stack notes with current implementation.

---

## [2026-03-03 · Session I] — Project industry field + accent color update

### Added

- **`industry` field** — added to all entries in `projects.json`; rendered in `ProjectCard` meta row after company name (order: company · industry · date · type). Values: `FinTech` (Datalign ×2, ARK7), `User Research` (LookLook/NARS; `type` updated from "User research…" to "Consumer research, concept testing").

### Changed

- **Accent color** — `#003966` → `#EC4523`; `--color-accent` updated in `globals.css`.
- **Hero company link hover** — hardcoded hex values replaced with `var(--color-accent)` for asterisk and hover text/underline.

### Docs

- **design.md** — accent value, accent rules, project metadata order, hero inline link spec all updated.

---

## [2026-03-01 · Session H · 71168c1] — Shell, nav, footer alignment + docs sync

### Removed

- **Ask Martta drawer** — `AskMarttaDrawer` component deleted; AI button and drawer open/close logic removed from `Shell.tsx` and `Navbar.tsx`. Resume, About, Tools remain.

### Changed

- **Horizontal padding** — Nav, main content, and footer use 72px left/right consistently (`Navbar` 12px 72px; home hero and project section 72px; `AnimalGardenFooter` text row 16px 72px / 12px 72px mobile).
- **Navbar logo** — Logo image removed; "Martta XU" text only, Geist 14px.
- **Footer text** — Both lines use `#1a1a1a`; second line `margin: 0`, `paddingTop: 0`.
- **Footer garden alignment** — Garden content band aligned with footer text via layout offset (`gardenX` mapping 6%–94% of width); no padding wrapper. First element aligns with footer text.

---

## [2026-02-27 · Session G] — Fufu sleep behavior + asset wiring

### Changed

- **Cat A (Fufu) sleep trigger** — instead of requiring the wand to leave the garden, Fufu now switches to a sleep GIF whenever she reaches the cat bed area, defined as a small zone around the bed rather than a single pixel-perfect point.
- **Sleep GIF asset path** — wired `catA_sleep1(r).gif` through `/public/footer` so the "sleep on bed" animation loads correctly in the footer garden.

---

## [2026-02-27 · Session F] — Animal Garden footer

### Added

- **Animal Garden footer** — replaced simple text/LinkedIn footer with an animated pixel garden featuring Fufu (Cat A), Cat B, a bunny, chicks, and flowers. Garden appears on tablet/desktop only; mobile keeps text-only footer.

### Changed

- **Footer copy** — updated to Playfair Display lines: `© 2026 brewed by Martta + Cursor + Claude Code` and `Fufu wants to play with you 🥺` (desktop/tablet) or `Come to play with my cat - Fufu on desktop` (mobile).
- **Cat A size** — increased to 52×52px on desktop and 48×48px on tablet for clearer presence, while keeping other garden asset sizes as originally specced.

---

## [2026-02-20] — Navigation, accent, drawer header + PRD sync

### Changed

- **Accent color** — `#1087E6` → `#003966` everywhere (ASK Martta hover, prompt link hover); `--color-accent` and design spec updated
- **Nav logo** — `horse.svg` (32×32) → `许谦益之印_红色.svg` (28×28)
- **Nav typography** — Switzer 16px → Playfair Display 18px; color `#1a1a1a`; Resume/About/Tools hover: 50% opacity (implemented via React state for reliable hover)
- **ASK Martta button** — text removed, icon only; `gemini-line.svg` 24×24 → 20×20; `aria-label="Ask Martta"`
- **Ask Martta drawer header** — height 80px → 76px, `padding: 20px 24px` unchanged

### Docs

- **design.md** — accent `#003966`; Nav spec (Playfair Display 18px, logo seal 28×28, pill hover 50% opacity, ASK icon-only 20×20); drawer header 380×76px
- **master PRD.md** — Navbar bullets updated to match (logo asset, typography, ASK icon-only)

---

## [2026-02-19 · Session E] — Chat drawer refinements + docs sync

### Changed

- **Project title font** — Switzer 16px → Playfair Display 20px weight 500; title/description gap 2px → 0
- **Prompt chips → text links** — replaced pill chips with text-link prompts; icon `corner-down-left-line.svg` at 6px gap; 6px vertical clickable area; color `#717171`, hover/focus `#003966` + `rgba(236,243,248,0.5)` 16px row highlight
- **Chat message animation** — messages enter with opacity 0→1, translateY 8→0, 350ms easeOut (Framer Motion)
- **Intro message** — updated to "Hi! I'm Martta's AI assistant…"; prompts updated to "Tell me about yourself.", "What is your favorite thing in the world?", "What is your design process?"
- **User bubble border** — added `1px solid rgba(26,26,26,0.12)`; no border-top on input area separator
- **Message gap** — 24px → 32px between messages; bottom section padding 24px → 32px
- **Chat text** — font-size 16px → 15px; line-height 150% → 160%
- **Send button** — icon switched to `arrow-up-line.svg`; muted until user types, then `#1A1A1A`
- **Disclaimer** — "AI can make mistakes and hallucinate. For anything important, please verify directly with Martta."; 12px gap below input
- `**useMarttaChat` hook** — chat logic extracted from drawer into `src/hooks/useMarttaChat.ts` for clean API integration later

### Fixed

- **Close button hover** — `#003966` hover effect was incorrectly applying to ×; scoped to prompt text links only
- **Input border-radius** — all four corners now `4px` (previously top-left was 0)
- **Prompt hover background height** — fixed to 16px using absolute positioning

### Docs

- **design.md** — updated project title spec (Playfair Display 20px, gap 0), prompt color spec, chat animation spec; kept at 150 lines
- **master PRD.md** — removed embedded design specs (navbar CSS, hero typography) → redirected to `design.md`; updated intro message and default prompt copy to match code

---

## [2026-02-19 · Session D · b67fd53] — Polish pass (spacing, typography, interactions)

### Changed

- **Hero layout** — grid: `minmax(0, 2fr) / minmax(0, 1fr)`, padding `64px 72px`, column-gap `16px`, `inline-grid` + `align-self: stretch`
- **Hero font** — replaced Geist body text with Playfair Display Medium 48px / 52px line-height / 0.96px letter-spacing
- **Hero copy** — "Martta is a product designer who stands at the intersection of design, business, and engineering."
- **Project card text gap** — 4px → 2px between title and description
- **Nav pill padding** — `4px 12px` → `8px` all sides (Resume, About, Tools, ASK Martta)
- **ASK Martta hover radius** — no longer transitions; fixed at `4px` in both default and hover states
- **ASK Martta hover transition** — `200ms ease` → `300ms cubic-bezier(0.4, 0, 0.2, 1)` (smoother)
- **Image strip breakpoint** — custom CSS class replaced with Tailwind `min-[1350px]:grid-cols-3` to avoid Tailwind v4 layer conflicts; behavior unchanged (3-col ≥1350px, 1-col below)

### Added

- **Playfair Display** — loaded via `next/font/google` (weight 500), exposed as `--font-playfair-display` CSS variable

---

## [2026-02-19 · Session C · b67fd53] — Bug fixes (hover + slogan)

### Fixed

- **ASK Martta hover** — replaced CSS class approach (broken against inline styles) with React `useState`; hover now correctly shows `#ECF3F8` background, `border-radius: 4px`, `#003966` text/icon
- **Hero slogan** — updated to "Martta is a product designer who stands at the intersection of design, business, and engineering." (Playfair Display Medium, 48px, line-height 52px, letter-spacing 0.96px)

### Added

- **Playfair Display** — loaded via `next/font/google` (weight 500), exposed as `--font-playfair-display` CSS variable

---

## [2026-02-19 · Session B · b67fd53] — Figma review sync

### Changed

- **Breakpoint** — 1200px → 1350px; project image strip switches from 3-col to 1-col below 1350px
- **ASK Martta button** — default: grey, no background (same as nav links); hover: `border-radius: 4px`, background `#ECF3F8`, text/icon `#003966`
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

