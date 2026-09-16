# Komal Ata — Portfolio (React + Tailwind)

A Vite + React + Tailwind CSS build of the portfolio site, matching the HTML prototype:
lavender-to-violet palette, Fraunces + IBM Plex Sans type, a calligraphic wordmark, a
3-column selected-work grid, process, experience, about/skills, a design-system
showcase, and a contact footer.

## Opening in VS Code

1. Unzip and open the `komal-portfolio` folder in VS Code (`code komal-portfolio` or File → Open Folder).
2. VS Code will prompt you to install the recommended extensions (Tailwind CSS IntelliSense, ESLint, Prettier, React snippets) — accept that prompt for autocomplete on Tailwind classes and consistent formatting.
3. Open a terminal inside VS Code (`` Ctrl+` ``) and run the setup below.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

`npm run build` outputs a static site to `dist/` — upload that folder anywhere
(Netlify, Vercel, GitHub Pages, etc.).

## Project structure

```
src/
  components/     One file per section (Nav, Hero, Work, Process, Experience, About, DesignSystem, Footer)
  data/           Project and experience content, kept separate from markup
  App.jsx         Composes all sections
  index.css       Tailwind directives + a couple of custom keyframes
tailwind.config.js  Color and font tokens matching the design (paper, violet, lilac, etc.)
```

## Content notes

- **Experience dates**: the source CV's layout made a few company/date pairings
  (Groupshop, Botsify, PIA) genuinely ambiguous to extract — double-check
  `src/data/experience.js` against the real dates before publishing.
- **Project visuals** (`src/components/ProjectVisual.jsx`) are abstract placeholder
  mockups, not real screenshots. Swap them for actual project images before this
  goes out to anyone.
