// <mag-row gap="md" align="center" justify="between" wrap> — horizontal flex layout.
import { Mag, define } from "./base.js";

class Row extends Mag {
  static styles = `
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--mag-space-4);
      flex-wrap: nowrap;
    }

    :host([gap="0"])   { gap: 0; }
    :host([gap="xs"])  { gap: var(--mag-space-1); }
    :host([gap="sm"])  { gap: var(--mag-space-2); }
    :host([gap="md"])  { gap: var(--mag-space-4); }
    :host([gap="lg"])  { gap: var(--mag-space-5); }
    :host([gap="xl"])  { gap: var(--mag-space-7); }

    :host([align="start"])    { align-items: flex-start; }
    :host([align="center"])   { align-items: center; }
    :host([align="end"])      { align-items: flex-end; }
    :host([align="stretch"])  { align-items: stretch; }
    :host([align="baseline"]) { align-items: baseline; }

    :host([justify="start"])   { justify-content: flex-start; }
    :host([justify="center"])  { justify-content: center; }
    :host([justify="end"])     { justify-content: flex-end; }
    :host([justify="between"]) { justify-content: space-between; }
    :host([justify="around"])  { justify-content: space-around; }

    :host([wrap]) { flex-wrap: wrap; }
  `;
  static template = `<slot></slot>`;
}

define("mag-row", Row);
