// <mag-text lead tone="muted" size="sm" weight="medium" mono> — body text.
import { Mag, define } from "./base.js";

class Text extends Mag {
  static styles = `
    :host {
      display: block;
      font-size: var(--mag-text-base);
      line-height: var(--mag-leading-normal);
      color: var(--mag-ink);
      margin: 0;
      text-wrap: pretty;
    }

    :host([lead]) {
      font-size: var(--mag-text-xl);
      line-height: var(--mag-leading-relaxed);
      color: var(--mag-ink-muted);
      max-width: var(--mag-max-prose);
    }

    :host([size="xs"]) { font-size: var(--mag-text-xs); }
    :host([size="sm"]) { font-size: var(--mag-text-sm); }
    :host([size="lg"]) { font-size: var(--mag-text-lg); }
    :host([size="xl"]) { font-size: var(--mag-text-xl); }

    :host([tone="muted"])  { color: var(--mag-ink-muted); }
    :host([tone="subtle"]) { color: var(--mag-ink-subtle); }
    :host([tone="accent"]) { color: var(--mag-accent); }
    :host([tone="danger"]) { color: var(--mag-danger); }

    :host([weight="medium"]) { font-weight: var(--mag-weight-medium); }
    :host([weight="semi"])   { font-weight: var(--mag-weight-semi); }
    :host([weight="bold"])   { font-weight: var(--mag-weight-bold); }

    :host([mono]) { font-family: var(--mag-font-mono); }
  `;
  static template = `<slot></slot>`;
}

define("mag-text", Text);
