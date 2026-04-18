// <mag-field label="Email" hint="Never shared." error="Invalid email">
//   <mag-input type="email"></mag-input>
// </mag-field>
import { Mag, define } from "./base.js";

class Field extends Mag {
  static observedAttributes = ["label", "hint", "error"];

  static styles = `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--mag-space-2);
    }
    .label {
      font-size: var(--mag-text-sm);
      font-weight: var(--mag-weight-medium);
      color: var(--mag-ink);
    }
    .msg {
      font-size: var(--mag-text-xs);
      color: var(--mag-ink-muted);
      line-height: var(--mag-leading-normal);
    }
    :host([error]) .msg { color: var(--mag-danger); }
    [hidden] { display: none; }
  `;
  static template = `
    <span class="label" part="label" hidden></span>
    <slot></slot>
    <span class="msg" part="msg" hidden></span>
  `;

  connectedCallback() { this.#update(); }
  attributeChangedCallback() { this.#update(); }

  #update() {
    const root = this.shadowRoot;
    if (!root) return;
    const label = root.querySelector(".label");
    const msg = root.querySelector(".msg");
    const l = this.getAttribute("label");
    const err = this.getAttribute("error");
    const hint = this.getAttribute("hint");

    label.textContent = l || "";
    label.hidden = !l;
    msg.textContent = err || hint || "";
    msg.hidden = !(err || hint);

    const input = this.querySelector("mag-input, input, textarea");
    if (input) input.toggleAttribute("invalid", !!err);
  }
}

define("mag-field", Field);
