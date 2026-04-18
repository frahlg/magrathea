// <mag-section tone="sunken|accent" narrow compact> — content section.
import { Mag, define } from "./base.js";

class Section extends Mag {
  static styles = `
    :host {
      display: block;
      padding: var(--mag-space-8) var(--mag-space-5);
    }
    :host([compact]) { padding: var(--mag-space-7) var(--mag-space-5); }
    :host([flush])   { padding: 0 var(--mag-space-5); }

    :host([tone="sunken"]) { background: var(--mag-bg-sunken); }
    :host([tone="accent"]) { background: var(--mag-accent-soft); }
    :host([tone="ink"]) {
      background: oklch(15% 0.01 85);
      --mag-ink:           oklch(96% 0.006 85);
      --mag-ink-muted:     oklch(72% 0.01  85);
      --mag-ink-subtle:    oklch(55% 0.01  85);
      --mag-surface:       color-mix(in oklch, white 6%,  transparent);
      --mag-surface-muted: color-mix(in oklch, white 10%, transparent);
      --mag-border:        color-mix(in oklch, white 18%, transparent);
      --mag-border-subtle: color-mix(in oklch, white 10%, transparent);
      color: var(--mag-ink);
    }

    .inner {
      max-width: var(--mag-max-content);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--mag-space-6);
    }
    :host([narrow]) .inner { max-width: var(--mag-max-prose); }
  `;
  static template = `<div class="inner"><slot></slot></div>`;
}

define("mag-section", Section);
