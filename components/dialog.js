// <mag-dialog id="x" title="Heading"> ... <mag-button slot="actions">Close</mag-button> </mag-dialog>
// Native <dialog>. @starting-style for clean open. Esc + backdrop click close.
import { Mag, define } from "./base.js";

class Dialog extends Mag {
  static observedAttributes = ["open", "title"];

  static styles = `
    :host { display: contents; }

    dialog {
      border: 0;
      background: var(--mag-surface);
      color: var(--mag-ink);
      border-radius: var(--mag-radius-lg);
      padding: var(--mag-space-6);
      box-shadow: var(--mag-shadow-xl);
      max-width: 30rem;
      width: calc(100% - var(--mag-space-5) * 2);
      font-family: inherit;
      view-transition-name: mag-dialog;
    }

    dialog::backdrop {
      background: color-mix(in oklch, black 45%, transparent);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }

    .title {
      font-size: var(--mag-text-xl);
      font-weight: var(--mag-weight-semi);
      letter-spacing: var(--mag-tracking-snug);
      margin: 0 0 var(--mag-space-3) 0;
      color: var(--mag-ink);
    }
    .body {
      color: var(--mag-ink-muted);
      margin-bottom: var(--mag-space-5);
      line-height: var(--mag-leading-normal);
    }
    .actions {
      display: flex;
      gap: var(--mag-space-2);
      justify-content: flex-end;
    }

    /* Clean enter — no flash. */
    dialog[open] {
      opacity: 1;
      transform: scale(1) translateY(0);
      transition:
        opacity  var(--mag-dur) var(--mag-ease),
        transform var(--mag-dur) var(--mag-ease),
        overlay  var(--mag-dur) allow-discrete,
        display  var(--mag-dur) allow-discrete;
    }
    @starting-style {
      dialog[open] {
        opacity: 0;
        transform: scale(0.96) translateY(8px);
      }
    }
    dialog[open]::backdrop {
      animation: mag-fade-in var(--mag-dur) var(--mag-ease);
    }
    @keyframes mag-fade-in {
      from { opacity: 0; }
    }
  `;

  static template = `
    <dialog part="dialog">
      <h2 class="title" part="title"></h2>
      <div class="body" part="body"><slot></slot></div>
      <div class="actions" part="actions"><slot name="actions"></slot></div>
    </dialog>
  `;

  connectedCallback() {
    this.#d = this.shadowRoot.querySelector("dialog");
    this.#t = this.shadowRoot.querySelector(".title");
    this.#sync();
    this.#d.addEventListener("close", () => this.removeAttribute("open"));
    this.#d.addEventListener("click", (e) => {
      if (e.target === this.#d) this.close();
    });
  }
  attributeChangedCallback() { this.#sync(); }

  #d; #t;
  #sync() {
    if (!this.#d) return;
    if (this.#t) this.#t.textContent = this.getAttribute("title") || "";
    const want = this.hasAttribute("open");
    if (want && !this.#d.open) this.#d.showModal();
    else if (!want && this.#d.open) this.#d.close();
  }

  open()  { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }
}

define("mag-dialog", Dialog);
