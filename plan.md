# Project Plan - BV Dizajn Website

## Current Snapshot

- Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- Current UI: fixed header, placeholder `WIP` main content, footer with social icons.
- Current routes: single homepage (`src/app/page.tsx`).
- Key gap: navigation links target sections that are not fully implemented yet.

## Project Goals

1. Replace placeholder homepage content with complete branded sections.
2. Align desktop/mobile navigation with real in-page anchors.
3. Improve usability and accessibility on mobile and desktop.
4. Prepare for production deployment with clean lint/build checks.

## Scope

### In Scope

- Homepage sections: `about`, `portfolio`, `contact`.
- Header navigation alignment and typo cleanup.
- Footer links wired to real destinations.
- Basic SEO metadata and social preview readiness.
- Responsive and accessibility pass.

### Out of Scope (for this phase)

- CMS integration.
- Multi-page architecture.
- Authentication or user accounts.
- Backend content management.

## Execution Plan

### Phase 1 - Content Structure

- Create section scaffolding in `src/app/page.tsx`.
- Add section IDs to match header links.
- Add spacing offsets so fixed header does not cover anchor targets.

### Phase 2 - Navigation and Footer Hardening

- Fix navigation labels and href consistency (`portfolio` spelling and target mapping).
- Ensure mobile menu closes on link click and interaction remains smooth.
- Replace footer `#` placeholders with actual social/contact links.

### Phase 3 - Visual Polish

- Refine spacing rhythm, typography hierarchy, and color usage.
- Validate contrast and focus states.
- Ensure layout quality across common breakpoints.

### Phase 4 - Quality Gate

- Run `npm run lint` and resolve all issues.
- Run `npm run build` and verify a clean production build.
- Perform manual QA for anchor navigation, mobile menu behavior, and footer links.

## Acceptance Criteria

- Homepage has real, complete sections replacing `WIP`.
- Header links navigate to valid sections on desktop and mobile.
- Footer links point to real destinations.
- Site works cleanly on mobile and desktop with no major visual breakage.
- Lint and build pass.

## Risks and Mitigations

- Missing final copy or assets -> use structured placeholders with clear replacement markers.
- Anchor jump overlap due to fixed header -> enforce section offset strategy.
- Styling drift during iteration -> keep design tokens centralized in `src/app/globals.css`.

## Immediate Next Task

- Implement Phase 1 by replacing `WIP` with section scaffolding and valid IDs.
