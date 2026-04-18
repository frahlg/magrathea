// <mag-stack gap="md" align="stretch"> — vertical flex layout.
import { Mag, define } from "./base.js";

class Stack extends Mag {
  static styles = `
    :host { display: flex; flex-direction: column; gap: var(--mag-space-4); }

    :host([gap="0"])   { gap: 0; }
    :host([gap="xs"])  { gap: var(--mag-space-1); }
    :host([gap="sm"])  { gap: var(--mag-space-2); }
    :host([gap="md"])  { gap: var(--mag-space-4); }
    :host([gap="lg"])  { gap: var(--mag-space-5); }
    :host([gap="xl"])  { gap: var(--mag-space-7); }
    :host([gap="2xl"]) { gap: var(--mag-space-8); }
    :host([gap="3xl"]) { gap: var(--mag-space-9); }

    :host([align="start"])   { align-items: flex-start; }
    :host([align="center"])  { align-items: center; }
    :host([align="end"])     { align-items: flex-end; }
    :host([align="stretch"]) { align-items: stretch; }
  `;
  static template = `<slot></slot>`;
}

define("mag-stack", Stack);
