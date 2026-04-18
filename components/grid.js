// <mag-grid cols="3" gap="md" min="16rem"> — responsive grid layout.
// Defaults to auto-fit with 16rem min column width.
import { Mag, define } from "./base.js";

class Grid extends Mag {
  static observedAttributes = ["min"];

  static styles = `
    :host {
      display: grid;
      gap: var(--mag-space-4);
      grid-template-columns: repeat(auto-fit, minmax(var(--mag-grid-min, 16rem), 1fr));
    }

    :host([gap="xs"]) { gap: var(--mag-space-1); }
    :host([gap="sm"]) { gap: var(--mag-space-2); }
    :host([gap="md"]) { gap: var(--mag-space-4); }
    :host([gap="lg"]) { gap: var(--mag-space-5); }
    :host([gap="xl"]) { gap: var(--mag-space-7); }

    :host([cols="2"]) { grid-template-columns: repeat(2, 1fr); }
    :host([cols="3"]) { grid-template-columns: repeat(3, 1fr); }
    :host([cols="4"]) { grid-template-columns: repeat(4, 1fr); }
    :host([cols="6"]) { grid-template-columns: repeat(6, 1fr); }

    @media (max-width: 48rem) {
      :host([cols]) { grid-template-columns: 1fr; }
    }
  `;
  static template = `<slot></slot>`;

  attributeChangedCallback(name, _old, val) {
    if (name === "min" && val) this.style.setProperty("--mag-grid-min", val);
  }
}

define("mag-grid", Grid);
