# Static Assets

Static media is served from `public/`, with artwork images in `public/images/`, social icons in `public/icons/`, and route/brand assets such as `aboutme.jpg`, `logo.png`, and `logo2.png`; data references these assets by absolute public paths.

Related
- [../data/artworks-catalog.md](../data/artworks-catalog.md)
- [../ui/portfolio-grid.md](../ui/portfolio-grid.md)
- [../routing/summary.md](../routing/summary.md)

```mermaid
graph TD
  Public["public/"] --> Images["public/images/*.jpg"]
  Public --> Icons["public/icons/*.svg"]
  Public --> Logo["public/logo.png"]
  Public --> Logo2["public/logo2.png"]
  Public --> About["public/aboutme.jpg"]
  Images --> Data["src/data/artworks.ts"]
  Icons --> Social["src/components/icons/*.tsx"]
  Logo --> AboutRoute
  About --> AboutRoute["src/app/about/page.tsx"]
```

```ts
{
  src: "/images/behind-the-walls.jpg",
  title: "Behind The Walls",
  aspectRatio: "portrait"
}
```

Contracts
- Asset paths used by `next/image` must map to files under `public/`.
- Social icon wrappers (`InstagramIcon`, `TwitterIcon`) read SVGs from `public/icons/`.

Invariants
- Artworks are `.jpg` files under `public/images/`.
- About route portrait uses `/aboutme.jpg`.
- About route also uses `/logo.png` above biography copy.
- Metadata icons in `src/app/layout.tsx` use `/logo2.png` as favicon/apple icon.
- There is no app-level `src/app/favicon.ico`; favicon comes from metadata icon paths.
- Unused default Next starter assets (`next.svg`, `vercel.svg`, etc.) still exist in `public/`.

Rationale
- Local static assets avoid external storage dependencies for the current deployment phase.

Lessons Learned
- Keep data and filename conventions synchronized to prevent broken gallery entries.
