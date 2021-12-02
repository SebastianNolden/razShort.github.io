import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Rednerliste extends LitElement {
  static styles = css`
    button {
      border: none;
      padding: 2px 4px;
    }
  `;

  static properties = {
    listItems: {},
    id: {type: Number},
    delay: {type: Number},
    activeTimer: {type: Number},
    interval: {}
  };

  constructor() {
    super();
    this.listItems = [];
    this.id = 0;
    this.activeTimer = 0;
    this.delay = 100;
    this.interval = null;
  }

  render() {
    return html`
      <h1>Rednerliste</h1>
      <div id="ekl"> 
        <input id="ekl-I">
        <button @click=${this.addToList}>add</button> 
      </div>
      <ul id="ekl-UL">
        ${this.listItems.map( (item) => html`
            <li>
                ${item.text} 
                <span id=${item.id}>00:00:00</span>
                <button @click=${() => this.startTimer(item.id)}>start</button>
                <button @click=${() => this.stopTimer(item.id)}>stop</button>
                <button @click=${() => this.deleteItem(item.id)}>remove</button> 
            </li>
        ` )}
      </ul>
    `;
  }

  test(id){
    console.log(this.listItems.find(item => item.id === id).stopwatch.getDate.getSeconds());
  }

  get input() {
    return this.renderRoot?.querySelector('#ekl-I') ?? null;
  }

  get timeText(){
    return this.renderRoot?.getElementById(this.activeTimer) ?? null;
  }

  addToList(){
    if ( this.input.value !== "") {
      this.listItems.push({text: this.input.value, id: this.id, stopwatch: new Stopwatch(100)});
      this.input.value = "";
      this.requestUpdate();

      this.id = this.id + 1;
    }
  }
  
  deleteItem(del){
    this.stopTimer(del);
    this.listItems = this.listItems.filter( (item) => {return item.id !== del} );
  }

  startTimer(id){
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.listItems.forEach(elem => {
      elem.stopwatch.stop();
    });
    this.listItems.find(item => item.id === id).stopwatch.start();
    this.activeTimer = id;
    this.interval = setInterval(this.renderTime.bind(this), this.delay);
  }

  stopTimer(id){
    if(this.interval && this.activeTimer === id){
      this.listItems.find(item => item.id === id).stopwatch.stop();
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  renderTime(){
    let date = this.listItems.find(e => e.id === this.activeTimer).stopwatch.getDate;
    let hours = date.getHours() - 1;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let timeRendered = `${hours}:${minutes}:${seconds}`
    this.timeText.textContent = timeRendered;
  }

}

class Stopwatch {
  constructor(delay){
    this.delay = delay || 100;
    this.timer = 0;
    this.offset = 0;
  }

  start(){
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    this.offset = Date.now();
    this.interval = setInterval(this.update.bind(this), this.delay);
  }

  stop(){
    if(this.interval){
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  update(){
    let now = Date.now();
    this.timer += (now - this.offset);
    this.offset = now;
  }

  get getDate(){
    return new Date(this.timer);
  }
}

customElements.define('my-rednerliste', Rednerliste);