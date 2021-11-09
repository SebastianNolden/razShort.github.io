/*jslint browser:true */
var firstExercise = document.querySelector(".top");
var secondExercise = document.querySelector(".outside");
var thirdExercise = document.querySelector(".main");
var button01 = document.getElementById("button01");
var button02 = document.getElementById("button02");
var button03 = document.getElementById("button03");
var home = document.querySelector(".home");
var exerciseArray = [firstExercise, secondExercise, thirdExercise];
var buttons = [button01, button02, button03];


/* --------- METHODS ------------- */
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
