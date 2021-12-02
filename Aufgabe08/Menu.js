import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Menu extends LitElement {
  static styles = css`
    .menuWrapper {
      display: flex;
      gap: 5px;
      text-align: center;
    }
    .menuWrapperV {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
    }
    .button {
      border: thin solid var(--text-color);
      padding: 8px;
      width: 80%;
      text-align: center;
    }
    .button:hover {
      background-color: var(--third-bkg-color);
    }
    h1 {
      text-align: center;
    }
  `;

  static properties = {
    alignment: {type: String},
    content: {type: String},
    title: {type: String}
  };

  constructor() {
    super();
    this.alignment = "Horizontal";
    this.content = "vier,fuenf,sechs";
    this.title = this.title || "Hallo Welt (:";
  }

  render() {

    if (this.alignment === "Horizontal") {
      return html`
        <h1>${this.title}</h1>
        <div class="menuWrapper">
          ${this.content.split(',').map((item) => html`<div class="button">${item} </div>` )}
        </div>
      `;
    }

    if (this.alignment === "Vertical") {
      return html`
        <h1>${this.title}</h1>
        <div class="menuWrapperV">
          ${this.content.split(',').map((item) => html`<div class="button">${item} </div>` )}
        </div>
      `;
    }
  }

}
customElements.define('my-menu', Menu);