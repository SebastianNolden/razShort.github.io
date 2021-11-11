/* Unteraufgaben & zugehörige Buttons */
const home = document.querySelector(".home");
const button01 = document.getElementById("button01");
const button02 = document.getElementById("button02");
const button03 = document.getElementById("button03");
const button04 = document.getElementById("button04");
const button05 = document.getElementById("button05");
const exerciseArray = [
  "Aufgabe02/flexbox_Desktop_first.html",
  "Aufgabe02/grid_Mobile_first.html",
  "Aufgabe02/Holy_grail_FLexbox.html",
  "Aufgabe02/Holy_grail_Grid.html",
  "Aufgabe02/Landing_Page_Grid.html"
];
var buttons = [button01, button02, button03, button04, button05];


/* --------- METHODS ------------- */
/* ------ Unteraufgaben wechseln ------ */
setNormalBackgroundForMenuButtons();
setActiveButtonBackground(0);
clickAufgabenButton(0)

for (var i = 0; i < buttons.length; i++) {
  addEventClick(buttons[i], i);
}

function addEventClick(button, value){
  button.addEventListener('click', () => {
    clickAufgabenButton(value);
  });
}

function clickAufgabenButton(id){
  // jQuery to load a html document into the page
  $("#contentLoad").load(exerciseArray[id]);
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
