# Summary

`website-petra` is a Next.js 16 App Router portfolio site where `src/app/layout.tsx` provides global metadata, font variables, shared chrome (`Header`, `Footer`, `Toaster`), and global styles (including `yet-another-react-lightbox` CSS), while `src/app/page.tsx` renders the masonry-based `PortfolioGrid`, `/propaganda` provides artist context content, `/contact` provides an inquiry form flow, and `/privacy-policy` serves legal/privacy copy linked from the global footer.

Related
- [Terminology](terminology.md)
- [Practices](practices.md)
- [Current Plan](plans/current-plan.md)
- [UI Summary](ui/summary.md)

```mermaid
graph TD
  Layout["src/app/layout.tsx"] --> Header["src/components/Header.tsx"]
  Layout --> Page["src/app/page.tsx"]
  Layout --> Footer["src/components/Footer.tsx"]
  Page --> PortfolioGrid["src/components/PortfolioGrid.tsx"]
  Layout --> Contact["src/app/contact/page.tsx"]
  Layout --> Privacy["src/app/privacy-policy/page.tsx"]
  Layout --> Globals["src/app/globals.css"]
```

```tsx
export default function Home() {
  return <PortfolioGrid />;
}
```

Invariants
- App routing uses App Router files under `src/app/`.
- Root metadata title is `Black Vomit`; favicon and apple-touch metadata icons both point to `/favicon.ico`.
- Shared chrome composition happens in `src/app/layout.tsx`, while route files render route-specific content.
- Header is fixed to the top and controls mobile navigation open/close state locally.
- Home route is the artwork portfolio grid with a full-screen lightbox experience.
- `src/app/propaganda/page.tsx` provides static artist biography + imagery content.
- `src/app/contact/page.tsx` handles contact form submission and feedback toasts.
- Footer renders social icon links, a privacy-policy route link, and a 2026 copyright line on every route.
