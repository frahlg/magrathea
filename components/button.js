// <mag-button tone="primary|secondary|ghost|danger" size="sm|md|lg" disabled>
import { Mag, define } from "./base.js";

class Button extends Mag {
  static observedAttributes = ["disabled", "type"];

  static styles = `
    :host {
      display: inline-flex;
      vertical-align: middle;
    }
    :host([block]) { display: flex; width: 100%; }
    :host([block]) button { width: 100%; }

    button {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--mag-space-2);
      font-family: inherit;
      font-size: var(--mag-text-base);
      font-weight: var(--mag-weight-medium);
      line-height: 1;
      padding: 0.75rem 1.15rem;
      border-radius: var(--mag-radius-sm);
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      background: var(--mag-accent);
      color: var(--mag-accent-ink);
      transition:
        background var(--mag-dur) var(--mag-ease),
        color      var(--mag-dur) var(--mag-ease),
        transform  var(--mag-dur-fast) var(--mag-ease),
        box-shadow var(--mag-dur) var(--mag-ease);
    }
    button:hover  { background: var(--mag-accent-hover); }
    button:active { transform: scale(0.98); }
    button:focus-visible {
      outline: 2px solid var(--mag-focus);
      outline-offset: 2px;
    }

    :host([tone="secondary"]) button {
      background: var(--mag-surface);
      color: var(--mag-ink);
      box-shadow: inset 0 0 0 1px var(--mag-border);
    }
    :host([tone="secondary"]) button:hover {
      background: var(--mag-surface-muted);
      box-shadow: inset 0 0 0 1px var(--mag-border-strong);
    }

    :host([tone="ghost"]) button {
      background: transparent;
      color: var(--mag-ink);
    }
    :host([tone="ghost"]) button:hover {
      background: var(--mag-surface-muted);
    }

    :host([tone="danger"]) button {
      background: var(--mag-danger);
      color: #fff;
    }
    :host([tone="danger"]) button:hover {
      background: color-mix(in oklch, var(--mag-danger), black 12%);
    }

    :host([size="sm"]) button {
      font-size: var(--mag-text-sm);
      padding: 0.5rem 0.85rem;
      border-radius: var(--mag-radius-xs);
    }
    :host([size="lg"]) button {
      font-size: var(--mag-text-lg);
      padding: 0.95rem 1.5rem;
      border-radius: var(--mag-radius-md);
    }

    :host([disabled]) button,
    :host([disabled]) button:hover {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      background: var(--mag-accent);
    }
  `;
  static template = `<button part="button"><slot></slot></button>`;

  connectedCallback() {
    const btn = this.shadowRoot.querySelector("button");
    btn.disabled = this.hasAttribute("disabled");
    if (this.hasAttribute("type")) btn.type = this.getAttribute("type");
  }

  attributeChangedCallback(name, _old, val) {
    const btn = this.shadowRoot?.querySelector("button");
    if (!btn) return;
    if (name === "disabled") btn.disabled = val !== null;
    if (name === "type" && val) btn.type = val;
  }
}

define("mag-button", Button);
