import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Einkaufsliste extends LitElement {
  static styles = css`
    button {
      border: none;
      padding: 2px 4px;
    }
  `;

  static properties = {
    listItems: {},
    id: {type: Number}
  };

  constructor() {
    super();
    this.listItems = [];
    this.id = 0;
  }

  render() {
    return html`
      <h1>Einkaufsliste</h1>
      <div id="ekl"> 
        <input id="ekl-I">
        <button @click=${this.addToList}>add</button> 
      </div>
      <ul id="ekl-UL">
        ${this.listItems.map( (item) => html`<li>${item.text} <button @click=${() => this.deleteItem(item.id)}>remove</button> </li>` )}
      </ul>
    `;
  }

  get input() {
    return this.renderRoot?.querySelector('#ekl-I') ?? null;
  }

  addToList(){
    if ( this.input.value !== "") {
      this.listItems.push({text: this.input.value, id: this.id});
      this.id = this.id + 1;
      this.input.value = "";
      this.requestUpdate();
    }
  }
  
  deleteItem(del){
    this.listItems = this.listItems.filter( (item) => {return item.id != del} );
  }

}
customElements.define('my-einkaufsliste', Einkaufsliste);