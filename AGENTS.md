# AGENTS.md

This file records project-specific guidance for AI coding agents working on Zatsucard.

## Product Context

Zatsucard is a small static web app for generating 480x720 card images from CSV data. It is a practical tool, not a marketing site. Keep the first screen focused on the actual workflow: CSV input, card appearance controls, preview, and export.

## UI Direction

- Use a restrained shadcn-like tone: neutral background, white surfaces, thin borders, low-radius corners, subtle shadows, compact typography, and quiet interaction states.
- Prefer pane-based structure inspired by Sociomedia SHIG: separate source/settings from the main object preview. Keep the card preview as the primary work area.
- Treat CSV data, card appearance, preview, and export as concrete objects/actions. Avoid vague feature explanations.
- Avoid "AI-generated" visual tropes: oversized hero sections, decorative gradients, floating blobs, emoji icons, busy cards, loud accent colors, and generic marketing copy.
- Keep text short and task-oriented. Do not add visible instructional prose unless it directly helps the workflow.
- Use familiar controls: file input/drop target for CSV, color inputs for swatches, range sliders for font sizes, buttons for reset/export/download.
- Preserve responsive usability. On narrow screens, controls should stack without horizontal overflow or clipped button text.

## CSS And Implementation

- Plain CSS is preferred for this project. Keep styles in `styles.css` unless there is a clear reason to split files.
- `design-tokens.css` is stored for reference, but `index.html` currently relies on `styles.css` only.
- Do not introduce a build step unless the app genuinely needs it; GitHub Pages serves the static files directly from `main`.
- Keep JavaScript modular in the existing `js/` files and avoid broad rewrites of card generation logic when changing UI.
- Avoid inline styles in generated DOM. Prefer CSS classes so future UI passes stay coherent.
- Escape CSV-derived values before inserting them into HTML.

## Release Notes For Agents

- Commit changes to `main` and push to `origin` to trigger GitHub Pages.
- Public URL: `https://kaigemap.github.io/zatsucard/`
- GitHub Pages/CDN may serve stale HTML for several minutes after deployment.
