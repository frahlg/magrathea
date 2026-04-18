// <mag-menu label="Options">
//   <button>Edit</button>
//   <button>Delete</button>
// </mag-menu>
// Native Popover API. Positioned in the top layer — coordinates via JS
// on open (reliable across all browsers, incl. Firefox without anchor-positioning).
import { Mag, define } from "./base.js";

let uid = 0;

class Menu extends Mag {
  static observedAttributes = ["label"];

  static styles = `
    :host { display: inline-block; position: relative; }

    .trigger {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--mag-space-2);
      padding: 0.5rem 0.85rem;
      font-family: inherit;
      font-size: var(--mag-text-sm);
      font-weight: var(--mag-weight-medium);
      color: var(--mag-ink);
      background: var(--mag-surface);
      box-shadow: inset 0 0 0 1px var(--mag-border);
      border-radius: var(--mag-radius-sm);
      transition: background var(--mag-dur) var(--mag-ease);
    }
    .trigger:hover { background: var(--mag-surface-muted); }
    .trigger:focus-visible {
      outline: 2px solid var(--mag-focus);
      outline-offset: 2px;
    }
    .caret { transition: transform var(--mag-dur) var(--mag-ease); }
    .trigger[aria-expanded="true"] .caret { transform: rotate(180deg); }

    /* The popover lives in the top layer. Fixed positioning + JS coords
       on open is the reliable path across browsers. */
    .menu {
      position: fixed;
      top: 0;
      left: 0;
      inset: auto;
      min-width: 12rem;
      background: var(--mag-surface);
      color: var(--mag-ink);
      box-shadow: var(--mag-shadow-lg), inset 0 0 0 1px var(--mag-border);
      border: 0;
      border-radius: var(--mag-radius-sm);
      padding: var(--mag-space-1);
      margin: 0;
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity   var(--mag-dur) var(--mag-ease),
        transform var(--mag-dur) var(--mag-ease),
        overlay   var(--mag-dur) allow-discrete,
        display   var(--mag-dur) allow-discrete;
    }
    @starting-style {
      .menu:popover-open {
        opacity: 0;
        transform: translateY(-6px);
      }
    }
    .menu:not(:popover-open) {
      opacity: 0;
      transform: translateY(-6px);
    }

    ::slotted(button),
    ::slotted(a) {
      display: block;
      width: 100%;
      padding: 0.5rem 0.75rem;
      background: none;
      border: 0;
      color: var(--mag-ink);
      font: inherit;
      font-size: var(--mag-text-sm);
      cursor: pointer;
      border-radius: var(--mag-radius-xs);
      text-align: left;
      text-decoration: none;
    }
    ::slotted(button:hover),
    ::slotted(a:hover) { background: var(--mag-surface-muted); }
    ::slotted(hr) {
      border: 0;
      height: 1px;
      background: var(--mag-border-subtle);
      margin: var(--mag-space-1) 0;
    }
  `;

  constructor() {
    super();
    const id = `mag-menu-${++uid}`;
    this.shadowRoot.innerHTML = `
      <button class="trigger" part="trigger" type="button"
              popovertarget="${id}" popovertargetaction="toggle"
              aria-haspopup="menu" aria-expanded="false">
        <slot name="label"><span class="label-text"></span></slot>
        <svg class="caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="menu" id="${id}" popover role="menu" part="menu">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    this.#syncLabel();
    const btn  = this.shadowRoot.querySelector(".trigger");
    const menu = this.shadowRoot.querySelector(".menu");

    menu.addEventListener("toggle", (e) => {
      const open = e.newState === "open";
      btn.setAttribute("aria-expanded", String(open));
      if (open) {
        this.#position();
        addEventListener("scroll", this.#dismiss, { passive: true, capture: true });
        addEventListener("resize", this.#dismiss, { passive: true });
      } else {
        removeEventListener("scroll", this.#dismiss, { capture: true });
        removeEventListener("resize", this.#dismiss);
      }
    });

    // Slotted item click closes the menu. (The outer delegation handler in
    // index.html still runs first, updating the label and toasting.)
    menu.addEventListener("click", (e) => {
      if (e.target.closest("button, a")) menu.hidePopover();
    });
  }

  attributeChangedCallback() { this.#syncLabel(); }

  #dismiss = () => {
    this.shadowRoot.querySelector(".menu")?.hidePopover();
  };

  #position() {
    const trigger = this.shadowRoot.querySelector(".trigger");
    const menu    = this.shadowRoot.querySelector(".menu");
    const r = trigger.getBoundingClientRect();

    // Default below-left of the trigger. Flip to above if there's no room.
    const menuH = menu.offsetHeight || 160;
    const below = r.bottom + 4 + menuH <= innerHeight;
    const top   = below ? r.bottom + 4 : Math.max(8, r.top - menuH - 4);

    // Default left-aligned. Flip to right-aligned if clipped.
    const menuW = menu.offsetWidth || Math.max(r.width, 192);
    let left = r.left;
    if (left + menuW > innerWidth - 8) left = Math.max(8, r.right - menuW);

    menu.style.top  = `${top}px`;
    menu.style.left = `${left}px`;
    menu.style.minWidth = `${Math.max(r.width, 192)}px`;
  }

  #syncLabel() {
    const span = this.shadowRoot.querySelector(".label-text");
    if (span) span.textContent = this.getAttribute("label") || "Menu";
  }
}

define("mag-menu", Menu);
