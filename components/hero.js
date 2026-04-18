// <mag-hero compact bleed align="start"> — large landing hero.
import { Mag, define } from "./base.js";

class Hero extends Mag {
  static styles = `
    :host {
      display: block;
      padding: var(--mag-space-9) var(--mag-space-5);
      position: relative;
      overflow: hidden;
    }
    :host([compact]) { padding: var(--mag-space-8) var(--mag-space-5); }

    :host([bleed]) {
      background:
        radial-gradient(
          ellipse 80% 50% at 50% 0%,
          color-mix(in oklch, var(--mag-accent-soft) 80%, transparent),
          transparent 60%
        ),
        var(--mag-bg);
    }

    .inner {
      max-width: var(--mag-max-content);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--mag-space-5);
      text-align: center;
      align-items: center;
    }

    :host([align="start"]) .inner {
      text-align: left;
      align-items: flex-start;
    }

    ::slotted(mag-text[lead]) {
      max-width: 42rem;
    }

    /* Clean first-paint enter. No flash, no JS. */
    .inner {
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity var(--mag-dur-slow) var(--mag-ease-out),
        transform var(--mag-dur-slow) var(--mag-ease-out);
    }
    @starting-style {
      .inner { opacity: 0; transform: translateY(16px); }
    }
  `;
  static template = `<div class="inner"><slot></slot></div>`;
}

define("mag-hero", Hero);
