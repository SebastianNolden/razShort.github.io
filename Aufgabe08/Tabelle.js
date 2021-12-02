import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Tabelle extends LitElement {
  static styles = css`
    .tableWrapper {
      display: grid;
      width: auto;
      height: auto;
      grid-template-columns: 30px repeat(5, 1fr);
      grid-template-rows: auto;
      padding: 4px;
    }
    
    .tableForm {
      width: auto;
      border: thin solid var(--text-color);
    }
    
    .tablecontent {
      text-align: center;
    }
    
    .tablecolumn {
      background-color: var(--second-bkg-color);
      color: var(--text-color);
      outline: none;
    }
  `;

  static properties = {
    columns: {}
  };

  constructor() {
    super();
    this.columns = {};
    this.addEventListener('click', () => {this.clicked()})
  }

  render() {
    return html`
      <div class="tableWrapper">
        <div class="tablecontent tableForm"></div>
        <div class="tablecontent tableForm">1</div>
        <div class="tablecontent tableForm">2</div>
        <div class="tablecontent tableForm">3</div>
        <div class="tablecontent tableForm">4</div>
        <div class="tablecontent tableForm">5</div>

        <div class="tablecontent tableForm">A</div>
        <input type="text" class="tablecolumn tableForm" id="A1">
        <input type="text" class="tablecolumn tableForm" id="A2">
        <input type="text" class="tablecolumn tableForm" id="A3">
        <input type="text" class="tablecolumn tableForm" id="A4">
        <input type="text" class="tablecolumn tableForm" id="A5">

        <div class="tablecontent tableForm">B</div>
        <input type="text" class="tablecolumn tableForm" id="B1">
        <input type="text" class="tablecolumn tableForm" id="B2">
        <input type="text" class="tablecolumn tableForm" id="B3">
        <input type="text" class="tablecolumn tableForm" id="B4">
        <input type="text" class="tablecolumn tableForm" id="B5">

        <div class="tablecontent tableForm">C</div>
        <input type="text" class="tablecolumn tableForm" id="C1">
        <input type="text" class="tablecolumn tableForm" id="C2">
        <input type="text" class="tablecolumn tableForm" id="C3">
        <input type="text" class="tablecolumn tableForm" id="C4">
        <input type="text" class="tablecolumn tableForm" id="C5">

        <div class="tablecontent tableForm">D</div>
        <input type="text" class="tablecolumn tableForm" id="D1">
        <input type="text" class="tablecolumn tableForm" id="D2">
        <input type="text" class="tablecolumn tableForm" id="D3">
        <input type="text" class="tablecolumn tableForm" id="D4">
        <input type="text" class="tablecolumn tableForm" id="D5">

        <div class="tablecontent tableForm">E</div>
        <input type="text" class="tablecolumn tableForm" id="E1">
        <input type="text" class="tablecolumn tableForm" id="E2">
        <input type="text" class="tablecolumn tableForm" id="E3">
        <input type="text" class="tablecolumn tableForm" id="E4">
        <input type="text" class="tablecolumn tableForm" id="E5">

      </div>
    `;
  }

  clicked(){
    this.columns = this.renderRoot?.querySelectorAll('.tablecolumn');
    for(let c of this.columns){
      c.addEventListener('focusout', (e) => {this.parse(e)});
    }
  }

  parse(e){
    if (e.target.value === "") {
      return;
    }

    let input = e.target.value;
    let values = [];

    if (input.search("=") === -1) {
      return;
    }
    
    if (input.search("SUM") !== -1 || input.search("SUB") !== -1 || input.search("MUL") !== -1 || input.search("DIV") !== -1) {
      values = input.substring(input.indexOf("(") + 1, input.indexOf(")")).split(",")

      let func = input.substring(1, 4);
      func = this.GetFunction(func);

      e.target.value = func(parseInt(this.renderRoot?.getElementById(values[0]).value), parseInt(this.renderRoot?.getElementById(values[1]).value));
    }

  }

  GetFunction(name){
    switch(name){
      case "SUM": return this._add(); break;
      case "SUB": return this._sub(); break;
      case "MUL": return this._mul(); break;
      case "DIV": return this._div(); break;
    }
  }

  _add(){
    return function(a,b){
      return a + b;
    };
  }

  sub(){
    return function(a,b){
      return a - b;
    };
  }

  _mul(){
    return function(a,b){
      return a * b;
    };
  }

  _div(){
    return function(a,b){
      return a / b;
    };
  }

}
customElements.define('my-tabelle', Tabelle);