# Architecture

## Application shape
- Framework: Next.js App Router (`src/app/`) with React client components for interactive forms.
- Shared UI primitives live in `src/components/ui/` and feature components in `src/components/`.
- Form submissions call internal API routes (`/api/send`, `/api/newsletter`) using `fetch` from client components.

## Form state handling
- Contact form state is owned in `src/app/contact/page.tsx`.
- Newsletter form state is owned in `src/components/NewsletterForm.tsx` (rendered across pages).
- Consent checkbox state resets on route transitions to avoid stale checked state after page swaps.

See also: `context/forms/consent-checkbox-state.md`
