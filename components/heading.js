// <mag-heading level="1" display tone="muted"> — semantic heading.
import { Mag, define } from "./base.js";

class Heading extends Mag {
  static observedAttributes = ["level"];

  static styles = `
    :host {
      display: block;
      font-weight: var(--mag-weight-semi);
      line-height: var(--mag-leading-snug);
      letter-spacing: var(--mag-tracking-snug);
      color: var(--mag-ink);
      text-wrap: balance;
      margin: 0;
    }

    :host([level="1"]) { font-size: var(--mag-text-5xl); }
    :host([level="2"]) { font-size: var(--mag-text-4xl); }
    :host([level="3"]) { font-size: var(--mag-text-3xl); }
    :host([level="4"]) { font-size: var(--mag-text-2xl); }
    :host([level="5"]) { font-size: var(--mag-text-xl);  }
    :host([level="6"]) { font-size: var(--mag-text-lg);  }

    :host([display]) {
      font-size: var(--mag-text-6xl);
      font-weight: var(--mag-weight-bold);
      line-height: var(--mag-leading-tight);
      letter-spacing: var(--mag-tracking-tight);
    }

    :host([tone="muted"])  { color: var(--mag-ink-muted); }
    :host([tone="accent"]) { color: var(--mag-accent); }
  `;
  static template = `<slot></slot>`;

  connectedCallback() {
    this.setAttribute("role", "heading");
    if (!this.hasAttribute("level")) this.setAttribute("level", "2");
    this.setAttribute("aria-level", this.getAttribute("level"));
  }

  attributeChangedCallback(name, _old, val) {
    if (name === "level" && val) this.setAttribute("aria-level", val);
  }
}

define("mag-heading", Heading);
