// <mag-badge tone="accent|success|danger|neutral" dot>
import { Mag, define } from "./base.js";

class Badge extends Mag {
  static styles = `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--mag-space-1);
      padding: 0.22rem 0.6rem;
      font-size: var(--mag-text-xs);
      font-weight: var(--mag-weight-medium);
      line-height: 1.3;
      border-radius: var(--mag-radius-pill);
      background: var(--mag-surface-muted);
      color: var(--mag-ink-muted);
      white-space: nowrap;
    }

    :host([tone="accent"]) {
      background: var(--mag-accent-soft);
      color: var(--mag-accent-ink);
    }
    :host([tone="success"]) {
      background: color-mix(in oklch, var(--mag-success) 14%, var(--mag-bg));
      color: var(--mag-success);
    }
    :host([tone="danger"]) {
      background: color-mix(in oklch, var(--mag-danger) 14%, var(--mag-bg));
      color: var(--mag-danger);
    }

    :host([dot])::before {
      content: "";
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
    }
  `;
  static template = `<slot></slot>`;
}

define("mag-badge", Badge);
