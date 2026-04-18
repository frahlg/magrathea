# Magrathea

> *"Magrathea — a planet whose primary industry was the manufacture of other planets."*
> — The Hitchhiker's Guide to the Galaxy

A design system for building world-class things, by Slartibartfast's standards. Zero dependencies. Zero build step. Zero npm. Just web standards.

---

## The whole install

```html
<link rel="stylesheet" href="tokens.css">
<script type="module" src="components/index.js"></script>
```

That's it. No `package.json`. No `node_modules`. No lockfile. No bundler. No transpiler.

## The whole usage

```html
<mag-hero bleed>
  <mag-badge tone="accent" dot>New</mag-badge>
  <mag-heading display>Build beautiful things.</mag-heading>
  <mag-text lead>Without the build step.</mag-text>
  <mag-button size="lg">Get started</mag-button>
</mag-hero>
```

Works in plain HTML, React, Svelte, Astro — anywhere the browser renders HTML.

## Run the showcase

Because ES modules require an HTTP origin, you need any static server. Pick one:

```bash
# Python (comes with macOS)
python3 -m http.server 8000

# Deno (single binary, no node_modules)
deno run --allow-net --allow-read jsr:@std/http/file-server

# Bun
bunx serve .

# Node
npx serve .
```

Then open http://localhost:8000. That's the whole dev loop. Save a file, refresh.

---

## What's in the box

**Tokens** — [`tokens.css`](./tokens.css) — one file of CSS custom properties:
- Color (OKLCH, light + dark)
- Typography (fluid scale, system font stack)
- Spacing (4px base, modular)
- Radii, shadows, motion curves, z-layers

**Components** — [`components/`](./components) — 19 web components, **~8 kB gzipped total**:

| Layout | Typography | Form | Surface | Overlay | Flourish |
|---|---|---|---|---|---|
| `<mag-stack>` | `<mag-heading>` | `<mag-button>` | `<mag-card>` | `<mag-dialog>` | `<mag-fit>` |
| `<mag-row>` | `<mag-text>` | `<mag-input>` | `<mag-hero>` | `<mag-menu>` | |
| `<mag-grid>` | `<mag-eyebrow>` | `<mag-field>` | `<mag-section>` | `<mag-tabs>` | |
| `<mag-divider>` | | `<mag-badge>` | | `<mag-toggle>` | |

**Modern browser features baked in:**
- `light-dark()` — one-line theme tokens
- `@starting-style` — flash-free enter animations
- View Transitions — theme toggle circle-out, tab switches, dialog open
- Popover API + `transition-behavior: allow-discrete` — menus animate without JS
- `animation-timeline: view()` — scroll-driven reveals via `data-reveal`

`<mag-fit>` is a canvas-measured fit-to-width heading, in the spirit of
[pretext](https://github.com/chenglou/pretext) — binary-search the largest
font size that fits the container, with zero DOM reflow during measurement.

Each component is a single `.js` file, ~40–100 lines, with styles scoped via Shadow DOM. No cascade pain, no class soup. Configure with HTML attributes.

---

## Philosophy

**Physics before code.** The browser already knows how to paint, layout, measure text, handle focus, process events, animate at 120fps. Every abstraction on top is a layer that can break, go out of date, or disappear when its company pivots. Magrathea is what's left when you remove everything that isn't the browser.

**Attributes over classes.** You never write `class="btn btn-primary btn-lg"`. You write `<mag-button tone="primary" size="lg">`. The component owns its styling; you compose with semantic attributes.

**CSS lives inside components.** Consumers never write a stylesheet for the design system. Tokens are the only CSS file you touch — and only if you want to customize.

**Web components are forever.** They're a W3C standard shipped in every browser since 2018. No framework can deprecate them. No CEO can sunset them. Magrathea will work in 2040.

---

## Tokens, briefly

All tokens are CSS custom properties prefixed `--mag-*`. Override any of them anywhere:

```css
:root {
  --mag-accent: oklch(65% 0.15 160);  /* nordic emerald instead of amber */
  --mag-radius-md: 4px;                /* sharper corners */
  --mag-font-sans: "Geist", system-ui; /* brand font */
}
```

Dark mode is automatic via `light-dark()` + `prefers-color-scheme`. Set `data-theme="light"` or `"dark"` on `<html>` to force a mode (or use `<mag-toggle>` — it does the circle-out View Transition for you).

---

## Extending

Want a new component? Copy one:

```js
import { Mag, define } from "./base.js";

class MyThing extends Mag {
  static styles = `
    :host { display: block; color: var(--mag-accent); }
    :host([loud]) { font-size: var(--mag-text-3xl); }
  `;
  static template = `<slot></slot>`;
}
define("mag-my-thing", MyThing);
```

8 lines. That's a component.

---

## File tree

```
magrathea/
├── tokens.css            CSS custom properties via light-dark()
├── components/
│   ├── base.js           Shared base class (~20 lines)
│   ├── index.js          Import-all entrypoint
│   ├── stack.js  row.js  grid.js  divider.js
│   ├── heading.js  text.js  eyebrow.js
│   ├── button.js  input.js  field.js  badge.js
│   ├── card.js  hero.js  section.js
│   ├── dialog.js  tabs.js  menu.js  toggle.js
│   └── fit.js            Canvas-measured, pretext-flavored
├── index.html            Showcase (editorial manifesto)
└── README.md             You are here
```

---

*So long, and thanks for all the fish.*
