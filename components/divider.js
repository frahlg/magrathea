// <mag-divider> / <mag-divider vertical> — subtle rule.
import { Mag, define } from "./base.js";

class Divider extends Mag {
  static styles = `
    :host {
      display: block;
      height: 1px;
      background: var(--mag-border-subtle);
      margin-block: var(--mag-space-5);
      border: 0;
    }
    :host([strong]) { background: var(--mag-border); }
    :host([vertical]) {
      height: auto;
      width: 1px;
      align-self: stretch;
      margin: 0;
    }
  `;
  static template = ``;
}

define("mag-divider", Divider);
