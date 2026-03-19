# Plan: Remove Footer Navigation

## 1) Change summary
Remove the navigation links/section from the site footer while keeping the rest of the footer content and layout intact.

## 2) Success criteria
- Footer no longer renders the navigation section on desktop or mobile.
- Remaining footer content still renders correctly without layout breakage.
- No runtime or lint errors are introduced.

## 3) Constraints and non-goals
- In scope: footer component changes required to remove navigation UI.
- Out of scope: header/navigation redesign, routing changes, or broader footer visual redesign.
- Follow existing project conventions and styling patterns.

## 4) Task stack
- [x] T01: `Remove footer navigation UI` (status:done)
  - Task ID: T01
  - Goal: Remove footer navigation markup/data usage so footer no longer displays nav links.
  - Boundaries (in/out of scope): In - footer component and directly related styling cleanup. Out - unrelated layout/theme changes.
  - Done when: Footer renders without navigation links and page layout remains stable across responsive breakpoints.
  - Verification notes (commands or checks): Run project lint and targeted build/dev check used in this repo.
  - Completed: 2026-03-18
  - Files changed: `src/components/Footer.tsx`
  - Evidence: `npm run lint` (fails due to pre-existing errors outside this task scope), `npm run build` (fails due to missing `RESEND_API_KEY` during `/api/newsletter` page data collection).
  - Context sync impact: important change (root-edit required) because user-visible footer structure changed.

- [ ] T02: `Validation and context sync` (status:todo)
  - Task ID: T02
  - Goal: Run light validation checks and synchronize `context/` with code truth for this change.
  - Boundaries (in/out of scope): In - task-level checks, plan status updates, context markdown updates. Out - new feature work.
  - Done when: Checks pass (or failures are documented), task status is updated, and context files reflect current state.
  - Verification notes (commands or checks): Execute lint/tests/build as appropriate and record results.

## 5) Open questions
- None.
