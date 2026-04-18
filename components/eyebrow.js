// <mag-eyebrow> — small uppercase label, sits above a heading.
import { Mag, define } from "./base.js";

class Eyebrow extends Mag {
  static styles = `
    :host {
      display: block;
      font-size: var(--mag-text-xs);
      font-weight: var(--mag-weight-medium);
      letter-spacing: var(--mag-tracking-wider);
      text-transform: uppercase;
      color: var(--mag-ink-muted);
      margin: 0;
    }
    :host([tone="accent"]) { color: var(--mag-accent-ink); }
  `;
  static template = `<slot></slot>`;
}

define("mag-eyebrow", Eyebrow);
