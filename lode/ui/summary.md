# UI Summary

The UI is a dark-themed portfolio experience with persistent header/footer chrome, a masonry artwork grid on `/`, an artist biography section on `/propaganda`, and a legal copy page on `/privacy-policy`; navigation is route-based (not in-page anchors), social/contact entry points are icon-only links reused across header and footer, and artwork preview uses `yet-another-react-lightbox` for swipe-friendly fullscreen browsing.

Related
- [../summary.md](../summary.md)
- [../terminology.md](../terminology.md)
- [../practices.md](../practices.md)
- [header-navigation.md](header-navigation.md)
- [portfolio-grid.md](portfolio-grid.md)
- [lightbox.md](lightbox.md)
- [contact-page.md](contact-page.md)
- [newsletter-form.md](newsletter-form.md)
- [about-page.md](about-page.md)
- [privacy-policy-page.md](privacy-policy-page.md)

```mermaid
graph TD
  Layout["src/app/layout.tsx"] --> Header["src/components/Header.tsx"]
  Layout --> Footer["src/components/Footer.tsx"]
  Home["src/app/page.tsx"] --> PortfolioGrid["src/components/PortfolioGrid.tsx"]
  About["src/app/propaganda/page.tsx"] --> AboutImage["/aboutme.webp"]
  Contact["src/app/contact/page.tsx"] --> ContactForm["contact form + submit CTA"]
  Privacy["src/app/privacy-policy/page.tsx"] --> LegalCopy["Policy sections 1-6"]
  Header --> DesktopNav["md:flex route links"]
  Header --> MobileNav["md:hidden toggle + overlay nav"]
```

```tsx
<button
  className="group relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card"
  onClick={() => setSelectedArtwork(artwork)}
>
  <Image src={artwork.src} alt={artwork.alt} fill className="object-cover" />
</button>
```

Invariants
- Header and footer render on all routes because they are mounted in root layout.
- Desktop nav links are visible from `md` and up; mobile nav is a toggleable fixed panel.
- Home route always renders artwork cards via `artworks.map(...)`.
- Contact route renders a two-column layout with direct email link and consent-gated form submit.
- Artwork click opens `yet-another-react-lightbox` with looped previous/next navigation and touch swipe support.
- Footer renders a centered top stack on a shared `max-w-md` rail (social icons first with extra spacing, then newsletter), plus a bottom row where copyright stays centered and the privacy policy link is anchored to the right at the same vertical level; the stack-to-bottom-row spacing matches the social-to-newsletter spacing rhythm, and footer vertical padding is `py-8`.
