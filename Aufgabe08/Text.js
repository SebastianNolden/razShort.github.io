import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Text extends LitElement {
  static styles = css``;

  static properties = {
    text: {type: String},
    title: {type: String}
  };

  constructor() {
    super();
    this.text = this.text || "";
    this.title = this.title || "";
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <span>${this.text}</span>
    `;
  }


}
customElements.define('my-text', Text);