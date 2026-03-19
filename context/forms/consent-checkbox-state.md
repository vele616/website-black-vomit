# Consent Checkbox State

## Scope
This file documents checkbox reset behavior for:
- `src/app/contact/page.tsx`
- `src/components/NewsletterForm.tsx`

## Current state behavior
- Contact form (`/contact`)
  - Consent is required to submit.
  - Consent resets to unchecked in `finally` after submit attempts (success or error).
  - Consent and related transient state reset on route changes.

- Newsletter form
  - Consent is required to submit.
  - Consent resets to unchecked after successful subscribe.
  - Consent and related transient state reset on route changes.

## Implementation notes
- Both components use controlled checkbox state (`checked` prop).
- Route-based resets are driven by `usePathname()` and `useEffect`.
- Newsletter email entry uses one `InputField` component.
- Autofill styles are managed in `InputField` (not duplicated in form-level classes) to prevent Chromium override conflicts.

See also: `../overview.md`, `../patterns.md`
