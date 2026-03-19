# Plan: Reset Consent Checkboxes on Submit and Route Change

## 1) Change summary
Ensure consent checkboxes used in the contact form and newsletter form return to unchecked after submit attempts and when the user navigates between pages.

## 2) Success criteria
- Contact form consent checkbox is unchecked immediately after a submit attempt completes (success or error).
- Newsletter consent checkbox is unchecked after successful submit.
- Contact and newsletter consent checkboxes are unchecked when route/path changes.
- No runtime or lint errors are introduced.

## 3) Constraints and non-goals
- In scope: client-side state-reset behavior for existing checkbox components and related form-state cleanup.
- Out of scope: API behavior changes, validation copy rewrites, or visual redesign.
- Follow existing React/Next.js patterns already used in this codebase.

## 4) Task stack
- [x] T01: `Implement checkbox reset behavior` (status:done)
  - Task ID: T01
  - Goal: Update contact and newsletter form logic so consent checkbox state reliably resets after submit flow and on route changes.
  - Boundaries (in/out of scope): In - `src/app/contact/page.tsx`, `src/components/NewsletterForm.tsx`, and directly related checkbox state handling. Out - unrelated form fields, API handlers, or UI restyling.
  - Done when: Both forms render with unchecked consent after route changes; contact consent also resets after submit attempt completes; newsletter consent resets after successful submit.
  - Verification notes (commands or checks): Run targeted lint/type check command(s) used in this repo and manually verify behavior through a local dev run.
  - Completed: 2026-03-19
  - Files changed: `src/app/contact/page.tsx`, `src/components/NewsletterForm.tsx`, `src/components/InputField.tsx`
  - Evidence: `npm run lint` (fails due to unrelated pre-existing issues in masonry/compose-refs and `.opencode`), `npm run build` (passes)
  - Notes: Follow-up in-scope fix removed conflicting newsletter-level autofill overrides and kept autofill normalization centralized in `InputField`.
  - Context sync impact: important change (root-edit required) because form interaction behavior changed.

- [ ] T02: `Validation and context sync` (status:todo)
  - Task ID: T02
  - Goal: Run light validation checks and synchronize `context/` files with code truth for this behavior update.
  - Boundaries (in/out of scope): In - task-level checks, plan status updates, context markdown updates. Out - new feature work.
  - Done when: Checks pass (or failures are documented), plan task statuses reflect reality, and relevant context files are updated.
  - Verification notes (commands or checks): Execute lint/tests/build as appropriate and record results.

## 5) Open questions
- None.
