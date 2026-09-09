# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working directory

The actual project lives in `Portfolio-Website/` (this directory) — the parent `My-Portfolio/` folder is just a wrapper and is not itself a git repo.

## Commands

Run from `Portfolio-Website/`:

```bash
npm install       # install deps
npm run dev       # vite dev server (--host, so it's reachable on LAN)
npm run build     # tsc -b (project-reference type check) && vite build
npm run lint      # eslint .
npm run preview   # preview a production build
```

There is no test runner configured (no test script in package.json). `test.js` at the project root is a disconnected scratch file, not part of any suite — don't treat it as an example of the project's testing conventions.

## Architecture

Single-page React 18 + TypeScript + Vite portfolio site. No router — the page is one scroll-driven flow of sections.

**Mount flow**: `main.tsx` → `App.tsx` → `LoadingProvider` (context) → lazy-loaded `MainContainer`, which renders the sections in order: `Cursor`, `Navbar`, `SocialIcons`, then inside a `#smooth-wrapper`/`#smooth-content` pair: `Landing`, `About`, `WhatIDo`, `Career`, `Work`, lazy `TechStack`, `Contact`.

**Loading sequence** (this is the trickiest part of the app to reason about):
1. `LoadingProvider` renders `Loading.tsx` full-screen until `isLoading` flips false.
2. `MainContainer` calls `setProgress` (defined in `Loading.tsx`) which fakes a progress percentage over time and resolves via `progress.loaded()`.
3. On resolve, `MainContainer` calls `setCharTimeline` + `setAllTimeline` (`components/utils/GsapScroll.ts`) to register the scroll-triggered GSAP timelines for the page.
4. `Loading.tsx` itself, once `percent >= 100`, transitions its own UI and then dynamically imports `components/utils/initialFX.ts` to run the landing-text entrance animation and hand control to the page (`setIsLoading(false)`).

**Animation stack**:
- GSAP + `ScrollTrigger` drive nearly all scroll-tied animation (`components/utils/GsapScroll.ts` for section transitions, `Work.tsx` for the horizontal pinned project scroller via `@gsap/react`'s `useGSAP`).
- `@studio-freight/lenis` (`components/utils/smoothScroll.ts`) provides the smooth-scroll physics and is synced into GSAP's ticker; `ScrollTrigger.update` is wired to Lenis's `scroll` event. `Navbar.tsx` uses `getLenis()` to smooth-scroll to in-page anchors instead of native anchor jumps.
- Text-splitting is hand-rolled (`components/utils/splitTextHelper.ts` wraps chars/words in spans) rather than using GSAP's paid `SplitText` plugin. `components/utils/splitText.ts` applies the scroll-reveal animation to any `.para`/`.title` element and is re-run on window resize (debounced in `MainContainer`).
- The custom cursor (`Cursor.tsx`) runs its own rAF loop and reacts globally to any element with a `data-cursor="icons"` (magnetic/expand effect) or `data-cursor="disable"` (hide custom cursor, e.g. over links) attribute — check for these attributes when adding new interactive elements.

**3D**: The site previously had a Three.js character model driven by bone-name arrays (`src/data/boneData.ts`) and camera/character params in `GsapScroll.ts`. That's been replaced by a CSS avatar (see the comment at the top of `GsapScroll.ts`) — `boneData.ts` and the character params are now dead code kept for reference. The only live 3D is `TechStack.tsx`: a `@react-three/fiber` + `@react-three/rapier` physics scene of floating tech-icon spheres, lazy-loaded and only "activated" (physics running) while in viewport via `IntersectionObserver`, for performance.

**Legacy code in-file**: Several files (`Navbar.tsx`, `initialFX.ts`, `splitText.ts`) keep their previous implementation commented out above the live one (e.g. the old `ScrollSmoother`/paid-`SplitText`-based versions before the Lenis/hand-rolled-split rewrite). When editing these files, make sure you're modifying the active (uncommented) code path, not the commented-out legacy version.

**Styling**: plain per-component CSS under `src/components/styles/` (no CSS modules, no Tailwind). Each component imports its own stylesheet.

**Content**: Project/work data (`Work.tsx`) and bio copy (`About.tsx`, `Contact.tsx`) are hardcoded inline in JSX/TS, not pulled from a CMS or data file.

## TypeScript config

Two project references: `tsconfig.app.json` (src, strict mode, `noUnusedLocals`/`noUnusedParameters` on, bundler module resolution) and `tsconfig.node.json` (Vite config). `npm run build` type-checks both via `tsc -b` before `vite build`.
