# Franky Franchise

> The operational health score for franchise operators. Know what's coming.

Franky runs an ~8-minute diagnostic, scores four operating pillars — **Hiring, Sales, Vendors, Operations** — and rolls them into one **Franky Health Score** (think *credit score for franchise operations*), then hands the operator a short, clear action plan.

## Pages

| Page | File | Description |
|------|------|-------------|
| **Marketing** | `index.html` | Landing page with hero, four-pillar features, score explainer, CTA, footer |
| **Dashboard** | `dashboard.html` | App view with score ring, pillar bars, stats, action plan |

## Tech stack

- **HTML/CSS/JS** — No build tools
- **React 18** via CDN (UMD) + Babel standalone for JSX
- **Lucide** icons via CDN
- **Design tokens** from the Franky Franchise Design System (`tokens/`, `base.css`, `styles.css`)
- **Component library** — pre-built React components in `ds-bundle.js` (Button, Badge, Card, Avatar, Input, Tag, ScoreRing, PillarBar, Stat)

## Running locally

Open `index.html` in a browser, or serve it with any static file server:

```bash
npx serve .
```

## Design system

The visual foundations live in `tokens/`:

- `fonts.css` — Google Fonts: Zilla Slab, Hanken Grotesk, IBM Plex Mono
- `colors.css` — Brand, neutral, score, and semantic color tokens
- `typography.css` — Type scale, weights, line heights, tracking
- `spacing.css` — Spacing, radii, shadows, motion, layout, z-index

Brand colors:
- **Franky Red** `#C0241F` — primary CTA & identity
- **Badge Gold** `#DBA42F` — warm secondary accent
- **Sunny Yellow** `#F4C84A` — highlight / mascot color
- **Cream** `#F3EFE3` — page background (never stark white)
- **Navy Ink** `#20242F` — text & dark surfaces

## License

© 2026 Franky Franchise, Inc.
