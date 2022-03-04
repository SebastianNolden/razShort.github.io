Vue.component('my-textfield', {
  props: ['title'],
  template: `
    <div>
      <h3>{{title}}</h3>
      <textarea v-model="textValue"></textarea>
      <br>
      <span>Anzahl Buchstaben: {{buchstaben}}</span>
      <span>Anzahl Wörter: {{worte}}</span>
      <span>Anzahl Leerzeichen: {{leerzeichen}}</span>
    </div>
  `,
  data (){
    return {
      textValue: ''
    }
  },
  computed: {
    buchstaben: function(){
      let count = 0;
      this.textValue.split('').forEach((c) => {
        if (c !== " ") {
          count++;
        }
      });
      return count;
    },
    worte: function(){

      let split = this.textValue.trim().split(" ");
      let count = 0;
      split.forEach((c) => {
        if (c.length >= 1) {
          count++;
        }
      });

      return count;
    },
    leerzeichen: function(){
      let count = 0;
      this.textValue.split('').forEach((c) => {
        if (c === " ") {
          count++;
        }
      });
      return count;
    }
  }

});

Vue.component('my-menu', {
  props: ["title", "mode", "firstlink", "firstlinktext"],
  template: `
    <div>
      <h3>{{title}}</h3>
      <div :class="menu">
      <a class="buttonVUE" :href="firstlink">{{firstlinktext}}</a>
      <a class="buttonVUE">Second</a>
      <a class="buttonVUE">Third</a>  
      </div>
    </div>
  `,
  computed: {
    menu: function(){
      if (this.mode === "h") {
        return "horizontalMenu"
      } else {
        return "verticalMenu"
      }
    }
  }

});






// initialisierung der Vue Instanz - als Letztes ausführen
new Vue({
  el: '#Aufgabe10'
 });


 /* Unteraufgaben & zugehörige Buttons */
const home = document.querySelector(".home");
const myTextfield = document.getElementById("myTextfield");
const myMenu = document.getElementById("myMenu");

const button01 = document.getElementById("button01");
const button02 = document.getElementById("button02");
const exerciseArray = [myTextfield, myMenu];
const buttons = [button01, button02];

/* ------ Unteraufgaben wechseln ------ */
setNormalBackgroundForMenuButtons();
setActiveButtonBackground(0);

for (var i = 0; i < buttons.length; i++) {
  addEventClick(buttons[i], i);
}

function addEventClick(button, value){
  button.addEventListener('click', () => {
    clickAufgabenButton(value);
  });
}

function clickAufgabenButton(id){
  for (var j = 0; j < exerciseArray.length; j++) {
    if (j === id) {
      exerciseArray[j].style.display = "block";
    } else {
      exerciseArray[j].style.display = "none";
    }
  }
  setNormalBackgroundForMenuButtons();
  setActiveButtonBackground(id);
}

function setNormalBackgroundForMenuButtons(){
  var backgroundColor = window.getComputedStyle(home).getPropertyValue('background-color');
  for (var i = 0; i < exerciseArray.length; i++) {
    buttons[i].style.background = backgroundColor;
  }
}

function setActiveButtonBackground(id){
  var body = document.getElementsByTagName("body")[0];
  var color = window.getComputedStyle(body).getPropertyValue('background-color');
  buttons[id].style.background = color;
}