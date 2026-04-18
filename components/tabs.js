// <mag-tabs value="a">
//   <button data-tab="a">Tab A</button>
//   <button data-tab="b">Tab B</button>
//   <div data-panel="a">Content A</div>
//   <div data-panel="b">Content B</div>
// </mag-tabs>
// Panels swap via view-transition when supported.
import { Mag, define } from "./base.js";

class Tabs extends Mag {
  static observedAttributes = ["value"];

  static styles = `
    :host { display: block; }

    .list {
      display: flex;
      gap: var(--mag-space-5);
      border-bottom: 1px solid var(--mag-border-subtle);
      margin-bottom: var(--mag-space-5);
      position: relative;
    }

    ::slotted(button[data-tab]) {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
      padding: var(--mag-space-3) 0;
      font-family: inherit;
      font-size: var(--mag-text-sm);
      font-weight: var(--mag-weight-medium);
      color: var(--mag-ink-muted);
      transition: color var(--mag-dur) var(--mag-ease);
      margin-bottom: -1px;
      border-bottom: 2px solid transparent;
    }
    ::slotted(button[data-tab]:hover) { color: var(--mag-ink); }
    ::slotted(button[data-tab][aria-selected="true"]) {
      color: var(--mag-ink);
      border-bottom-color: var(--mag-accent);
      view-transition-name: mag-tab-active;
    }
    ::slotted(button[data-tab]:focus-visible) {
      outline: 2px solid var(--mag-focus);
      outline-offset: 4px;
      border-radius: 2px;
    }

    ::slotted([data-panel]) {
      animation: mag-tab-in var(--mag-dur) var(--mag-ease);
    }
    @keyframes mag-tab-in {
      from { opacity: 0; transform: translateY(4px); }
    }
  `;

  static template = `
    <div class="list" role="tablist">
      <slot name="tab"></slot>
    </div>
    <slot name="panel"></slot>
  `;

  connectedCallback() {
    for (const el of this.children) {
      if (el.hasAttribute("data-tab"))   { el.slot = "tab";   el.setAttribute("role", "tab"); }
      if (el.hasAttribute("data-panel")) { el.slot = "panel"; el.setAttribute("role", "tabpanel"); }
    }
    const value = this.getAttribute("value")
      || this.querySelector("[data-tab]")?.dataset.tab;
    this.#select(value);

    this.addEventListener("click", (e) => {
      const t = e.target.closest("[data-tab]");
      if (!t) return;
      if (document.startViewTransition) {
        document.startViewTransition(() => this.#select(t.dataset.tab));
      } else {
        this.#select(t.dataset.tab);
      }
    });
  }

  attributeChangedCallback(_n, _o, val) { this.#select(val); }

  #select(value) {
    if (!value) return;
    if (this.getAttribute("value") !== value) this.setAttribute("value", value);
    for (const t of this.querySelectorAll("[data-tab]")) {
      t.setAttribute("aria-selected", String(t.dataset.tab === value));
      t.tabIndex = t.dataset.tab === value ? 0 : -1;
    }
    for (const p of this.querySelectorAll("[data-panel]")) {
      p.hidden = p.dataset.panel !== value;
    }
  }
}

define("mag-tabs", Tabs);
