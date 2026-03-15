# Peer Review Triage Task

Another reviewer has provided the findings below. You are the Tech Lead. Your job is NOT to blindly accept them. You must critically evaluate each finding, categorize it, and decide on the action.

## 1. Triage Rules

For every issue reported in the findings, you must classify it into exactly one of these categories:

- **[VALID]:** This is a real bug or necessary improvement. You must provide the exact code fix.
- **[ALREADY FIXED]:** The code already handles this, or it's no longer relevant.
- **[FALSE POSITIVE]:** The reviewer misunderstood the architecture, context, or React patterns. Explain why the reviewer is wrong.
- **[LOW PRIORITY]:** Valid, but not worth blocking the current progress. Convert to a TODO.

## 2. Findings from Peer Review

### Looks Good

- **Shell.tsx** — Clean ResizeObserver pattern with proper cleanup via `ro.disconnect()`. Footer reveal-on-scroll via `marginBottom` + `position: fixed` is solid.
- **AnimalGardenFooter.tsx** — rAF chase loop correctly stored in ref and cleaned up on unmount. Wobble/bunny timers all cleaned up in the unmount effect at line 134–140. `useCallback` correctly applied to click handlers with stable deps.
- **page.tsx** — Hero text update matches PRD. Datalign link correctly uses `hero-company-link` class for ✦ treatment.
- **globals.css** — `::after` pseudo-element for ✦ is positioned well with `absolute` + `right: -0.85em` to avoid layout shift.

---

### Issues Found

**[MEDIUM]** [page.tsx:110](vscode-webview://0t5nl5b0tqebovebo19h65tm1e4f5h4kd3hcnf6sob0ib00s5a1i/portfolio/src/app/page.tsx#L110) — Datalign `href="#"` will scroll to page top on click and add `#` to URL.  
Fix: Use `href="#"` with an `onClick={e => e.preventDefault()}`, or better yet, remove `href` and use `<span className="hero-company-link">` if there's no real destination. Alternatively, once a real URL exists, replace it.

**[MEDIUM]** [AnimalGardenFooter.tsx:121-125](vscode-webview://0t5nl5b0tqebovebo19h65tm1e4f5h4kd3hcnf6sob0ib00s5a1i/portfolio/src/components/AnimalGardenFooter.tsx#L121-L125) — `setVw` is called on resize but the initial value is hardcoded to `1200` (line 115). On SSR/hydration, `isMobile`/`isTablet` will be wrong until the first resize event. This causes a hydration flash (garden visible → hidden, or vice versa).  
Fix: Add `setVw(window.innerWidth)` inside the effect body before attaching the listener:

```tsx
useEffect(() => {
  setVw(window.innerWidth);
  const onResize = () => setVw(window.innerWidth);
  ...

```

**[MEDIUM]** [AnimalGardenFooter.tsx:128-131](vscode-webview://0t5nl5b0tqebovebo19h65tm1e4f5h4kd3hcnf6sob0ib00s5a1i/portfolio/src/components/AnimalGardenFooter.tsx#L128-L131) — `gardenWidth` is read from `gardenRef.current.offsetWidth` inside an effect that depends on `[vw]`, but on first mount `vw` is `1200` (the hardcoded default), so the effect runs once with possibly stale DOM width. Also, `offsetWidth` doesn't react to CSS transitions — a ResizeObserver (like Shell already uses) would be more reliable.

**[LOW]** [AnimalGardenFooter.tsx:241-250](vscode-webview://0t5nl5b0tqebovebo19h65tm1e4f5h4kd3hcnf6sob0ib00s5a1i/portfolio/src/components/AnimalGardenFooter.tsx#L241-L250) — `wobblePlant` is not wrapped in `useCallback` and is recreated every render. It captures `wobbleTimers` ref so it's functionally stable, but since it's passed as `onMouseEnter` to 14 flower divs, it causes those divs to receive a new prop each render.

**[LOW]** [AnimalGardenFooter.tsx:255-256](vscode-webview://0t5nl5b0tqebovebo19h65tm1e4f5h4kd3hcnf6sob0ib00s5a1i/portfolio/src/components/AnimalGardenFooter.tsx#L255-L256) — Chinese comments (`视为"在床上"的范围`) mixed with otherwise all-English codebase. Not a bug, just inconsistent.

---

### Edge Case Matrix

1. **Mobile SSR hydration mismatch** — Initial `vw=1200` renders the garden on the server; a 375px phone hydrates without it → React hydration warning + layout flash.
2. **Rapid tab-switching / unmount during rAF** — If the component unmounts mid-rAF, `setCatAPos` etc. fire on an unmounted component. React 18+ suppresses this warning, but it's still a wasted update. Could guard with an `isMounted` ref.
3. **Datalign link** `href="#"` — Screen readers announce it as a link, keyboard users can tab to it, but clicking scrolls to top with no destination. Confusing UX for accessibility users.

## 3. Output Format

### Triage Decisions

**Finding 1:** [Brief summary of the finding]

**Classification:** [VALID / ALREADY FIXED / FALSE POSITIVE / LOW PRIORITY]

**Lead Decision:** [If VALID, write the code to fix it. If FALSE POSITIVE, write the technical rebuttal.]

*(Repeat for all findings)*

### Execution Plan

- List the exact files that need to be modified based ONLY on the [VALID] findings.
- Provide the final, merged code snippets required to apply these fixes.

