# Routing Summary

Routing uses Next.js App Router with four active page routes: `/` for the portfolio grid, `/propaganda` for artist biography content, `/contact` for inquiries/newsletter conversion flow, and `/privacy-policy` for legal/privacy copy, all wrapped by a single root layout that contributes metadata and shared UI chrome.

Related
- [../summary.md](../summary.md)
- [../ui/header-navigation.md](../ui/header-navigation.md)
- [../ui/portfolio-grid.md](../ui/portfolio-grid.md)

```mermaid
graph LR
  Root["src/app/layout.tsx"] --> Home["src/app/page.tsx -> /"]
  Root --> Propaganda["src/app/propaganda/page.tsx -> /propaganda"]
  Root --> Contact["src/app/contact/page.tsx -> /contact"]
  Root --> Privacy["src/app/privacy-policy/page.tsx -> /privacy-policy"]
```

```ts
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/propaganda" },
  { label: "Contact", href: "/contact" },
];
```

Contracts
- Every route under `src/app/` is wrapped by `src/app/layout.tsx`.
- Header active-link state derives from `usePathname()` and exact path matching.

Invariants
- `src/app/page.tsx` remains the home route entrypoint.
- `/propaganda` content is route-level static JSX with no client state.
- `/contact` is a client route handling controlled submit/loading and toast feedback.
- `/privacy-policy` content is static legal copy rendered in route-level JSX.
- Navigation targets route paths, not in-page anchors.

Rationale
- Route-based navigation allows independent page composition for gallery, biography, and legal content.
- Keeping legal copy in a dedicated route keeps footer policy links simple and durable.

Lessons Learned
- Document nav intent as route links to prevent accidental reintroduction of anchor-based assumptions.
