// <mag-toggle> — theme toggle with circle-out View Transition from click point.
// Writes [data-theme="light"|"dark"] on <html>.
import { Mag, define } from "./base.js";

class Toggle extends Mag {
  static styles = `
    :host { display: inline-flex; }

    button {
      all: unset;
      box-sizing: border-box;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: var(--mag-radius-pill);
      background: var(--mag-surface);
      box-shadow: inset 0 0 0 1px var(--mag-border);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--mag-ink);
      transition:
        background var(--mag-dur) var(--mag-ease),
        box-shadow var(--mag-dur) var(--mag-ease);
    }
    button:hover { background: var(--mag-surface-muted); }
    button:focus-visible {
      outline: 2px solid var(--mag-focus);
      outline-offset: 2px;
    }

    svg { width: 1rem; height: 1rem; transition: transform var(--mag-dur-slow) var(--mag-ease-spring); }
    button:active svg { transform: rotate(20deg) scale(0.9); }

    .sun, .moon {
      transition: opacity var(--mag-dur) var(--mag-ease);
    }
    :host(:not([dark])) .moon { opacity: 0; position: absolute; pointer-events: none; }
    :host([dark]) .sun { opacity: 0; position: absolute; pointer-events: none; }
  `;

  static template = `
    <button part="button" type="button" aria-label="Toggle theme">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <g class="sun">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </g>
        <g class="moon">
          <path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z"/>
        </g>
      </svg>
    </button>
  `;

  connectedCallback() {
    this.#sync();
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => this.#sync());
    this.shadowRoot.querySelector("button").addEventListener("click", (e) => this.#toggle(e));
  }

  #sync() {
    const theme = document.documentElement.dataset.theme
      || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    this.toggleAttribute("dark", theme === "dark");
  }

  #toggle(event) {
    const root = document.documentElement;
    const current = root.dataset.theme
      || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      this.toggleAttribute("dark", next === "dark");
    };

    if (!document.startViewTransition) { apply(); return; }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top  + rect.height / 2;
    const r = Math.hypot(
      Math.max(x, innerWidth  - x),
      Math.max(y, innerHeight - y),
    );

    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${r}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 450,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }
}

define("mag-toggle", Toggle);
