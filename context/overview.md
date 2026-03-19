# Overview

`website-petra` is a Next.js App Router site with client-rendered marketing pages,
a contact form (`/contact`), and a reusable newsletter subscription form.

## Current behavior highlights
- Contact form consent is required before submit and is reset after each submit attempt.
- Newsletter consent is required before submit and is reset after successful subscribe.
- Route changes reset consent checkbox state for both contact and newsletter forms.

See also: `context/forms/consent-checkbox-state.md`
