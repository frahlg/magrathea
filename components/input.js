// <mag-input type="email" placeholder="you@example.com" value="">
import { Mag, define } from "./base.js";

class Input extends Mag {
  static observedAttributes = [
    "type", "placeholder", "value", "disabled", "required", "name", "invalid",
  ];

  static styles = `
    :host {
      display: block;
      width: 100%;
    }

    input {
      all: unset;
      box-sizing: border-box;
      width: 100%;
      font-family: inherit;
      font-size: var(--mag-text-base);
      line-height: 1.4;
      color: var(--mag-ink);
      background: var(--mag-surface);
      padding: 0.7rem 0.9rem;
      border-radius: var(--mag-radius-sm);
      box-shadow: inset 0 0 0 1px var(--mag-border);
      transition:
        box-shadow var(--mag-dur) var(--mag-ease),
        background var(--mag-dur) var(--mag-ease);
    }
    input::placeholder { color: var(--mag-ink-subtle); }
    input:hover { box-shadow: inset 0 0 0 1px var(--mag-border-strong); }
    input:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 1px var(--mag-accent),
        0 0 0 3px color-mix(in oklch, var(--mag-accent) 25%, transparent);
    }

    :host([invalid]) input {
      box-shadow: inset 0 0 0 1px var(--mag-danger);
    }
    :host([invalid]) input:focus-visible {
      box-shadow:
        inset 0 0 0 1px var(--mag-danger),
        0 0 0 3px color-mix(in oklch, var(--mag-danger) 25%, transparent);
    }

    :host([disabled]) input {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  static template = `<input part="input">`;

  connectedCallback() {
    const el = this.shadowRoot.querySelector("input");
    this.#sync(el);
    el.addEventListener("input", (e) => {
      this.setAttribute("value", el.value);
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    });
    el.addEventListener("change", () => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }

  attributeChangedCallback() {
    const el = this.shadowRoot?.querySelector("input");
    if (el) this.#sync(el);
  }

  #sync(el) {
    const attrs = ["type", "placeholder", "value", "name"];
    for (const a of attrs) {
      if (this.hasAttribute(a)) el.setAttribute(a, this.getAttribute(a));
      else el.removeAttribute(a);
    }
    el.disabled = this.hasAttribute("disabled");
    el.required = this.hasAttribute("required");
  }

  get value() { return this.shadowRoot.querySelector("input").value; }
  set value(v) { this.setAttribute("value", v); }
  focus() { this.shadowRoot.querySelector("input").focus(); }
}

define("mag-input", Input);
