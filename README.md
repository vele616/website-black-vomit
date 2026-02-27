# BV Dizajn Website

This repository contains the current website shell for BV Dizajn, built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Current State

- Single route (`src/app/page.tsx`) with placeholder `WIP` content.
- Fixed responsive header (`src/components/Header.tsx`) with desktop links and mobile toggle menu.
- Footer (`src/components/Footer.tsx`) with social icons and copyright line.
- Global styles and design tokens defined in `src/app/globals.css`.

## Project Structure

```text
src/
  app/
    layout.tsx      # metadata, fonts, global CSS import
    page.tsx        # route composition (Header/Main/Footer)
    globals.css     # Tailwind v4 tokens and global variables
  components/
    Header.tsx      # responsive nav + mobile menu state
    Footer.tsx      # social links and copyright
lib/
  utils.ts          # cn() helper for class merging
lode/
  ...               # AI-maintained project memory
```

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Scripts

- `npm run dev` - start local development server.
- `npm run build` - production build.
- `npm run start` - run production server.
- `npm run lint` - run ESLint.

## Documentation Source of Truth

Project memory is maintained in `lode/` and reflects the current system state (not a changelog). Start with:

- `lode/lode-map.md`
- `lode/summary.md`
- `lode/practices.md`
