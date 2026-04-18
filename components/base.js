// Magrathea — base class for web components.
// ~20 lines. No framework. No dependencies.

export class Mag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const C = this.constructor;
    if (C.styles && !C._sheet) {
      C._sheet = new CSSStyleSheet();
      C._sheet.replaceSync(C.styles);
    }
    if (C._sheet) this.shadowRoot.adoptedStyleSheets = [C._sheet];
    if (C.template) this.shadowRoot.innerHTML = C.template;
  }
}

export const define = (name, cls) => {
  if (!customElements.get(name)) customElements.define(name, cls);
};
