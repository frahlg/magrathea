// <mag-card pad="md|sm|lg|xl" flat raised interactive tone="accent|sunken">
import { Mag, define } from "./base.js";

class Card extends Mag {
  static styles = `
    :host {
      display: block;
      background: var(--mag-surface);
      border-radius: var(--mag-radius-md);
      padding: var(--mag-space-5);
      box-shadow: var(--mag-shadow-sm);
      border: 1px solid var(--mag-border-subtle);
      transition:
        box-shadow var(--mag-dur) var(--mag-ease),
        transform  var(--mag-dur) var(--mag-ease),
        border-color var(--mag-dur) var(--mag-ease);
    }
    :host([pad="sm"]) { padding: var(--mag-space-4); }
    :host([pad="lg"]) { padding: var(--mag-space-7); }
    :host([pad="xl"]) { padding: var(--mag-space-8); }

    :host([flat])   { box-shadow: none; }
    :host([raised]) { box-shadow: var(--mag-shadow-md); }

    :host([interactive]) { cursor: pointer; }
    :host([interactive]:hover) {
      box-shadow: var(--mag-shadow-md);
      transform: translateY(-2px);
      border-color: var(--mag-border);
    }

    :host([tone="accent"]) {
      background: var(--mag-accent-soft);
      border-color: transparent;
    }
    :host([tone="sunken"]) {
      background: var(--mag-bg-sunken);
      box-shadow: none;
    }
    :host([tone="ink"]) {
      /* Stable dark bg — doesn't use --mag-ink so the override below is safe. */
      background: oklch(16% 0.01 85);
      border-color: transparent;
      box-shadow: none;
      /* Flip the ink token chain inside this surface so all slotted text adapts. */
      --mag-ink:           oklch(96% 0.006 85);
      --mag-ink-muted:     oklch(72% 0.01  85);
      --mag-ink-subtle:    oklch(55% 0.01  85);
      --mag-surface:       color-mix(in oklch, white 6%,  transparent);
      --mag-surface-muted: color-mix(in oklch, white 10%, transparent);
      --mag-border:        color-mix(in oklch, white 18%, transparent);
      --mag-border-subtle: color-mix(in oklch, white 10%, transparent);
      color: var(--mag-ink);
    }
  `;
  static template = `<slot></slot>`;
}

define("mag-card", Card);
