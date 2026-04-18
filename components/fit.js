// <mag-fit max="8rem" min="1rem">Big title</mag-fit>
// Canvas-measured fit-to-width text. Pretext-style: measures via
// canvas.measureText() so it triggers zero DOM reflow during layout.
import { Mag, define } from "./base.js";

const ctx = document.createElement("canvas").getContext("2d");

const toPx = (val, fallback) => {
  if (!val) return fallback;
  if (val.endsWith("rem")) return parseFloat(val) * 16;
  if (val.endsWith("px"))  return parseFloat(val);
  return parseFloat(val) || fallback;
};

class Fit extends Mag {
  static styles = `
    :host {
      display: block;
      line-height: var(--mag-leading-tight);
      letter-spacing: var(--mag-tracking-tight);
      font-weight: var(--mag-weight-bold);
      color: var(--mag-ink);
      text-wrap: balance;
    }
  `;
  static template = `<slot></slot>`;

  connectedCallback() {
    this.#fit();
    this.#ro = new ResizeObserver(() => this.#fit());
    this.#ro.observe(this);
    this.#mo = new MutationObserver(() => this.#fit());
    this.#mo.observe(this, { childList: true, characterData: true, subtree: true });
  }
  disconnectedCallback() {
    this.#ro?.disconnect();
    this.#mo?.disconnect();
  }

  #ro; #mo;

  #fit() {
    const text = (this.textContent || "").trim();
    const width = this.offsetWidth;
    if (!text || !width) return;

    const cs = getComputedStyle(this);
    const family = cs.fontFamily;
    const weight = cs.fontWeight || "700";
    const max = toPx(this.getAttribute("max"), 160);
    const min = toPx(this.getAttribute("min"), 12);

    // Binary search for the largest font size that fits, measured via canvas.
    let lo = min, hi = max;
    for (let i = 0; i < 14; i++) {
      const size = (lo + hi) / 2;
      ctx.font = `${weight} ${size}px ${family}`;
      const w = ctx.measureText(text).width;
      if (w <= width * 0.98) lo = size;
      else hi = size;
    }
    this.style.fontSize = `${lo}px`;
  }
}

define("mag-fit", Fit);
