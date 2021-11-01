/*jslint browser:true */
var firstExercise = document.querySelector(".top");
var secondExercise = document.querySelector(".outside");
var thirdExercise = document.querySelector(".main");
var button01 = document.getElementById("button01");
var button02 = document.getElementById("button02");
var button03 = document.getElementById("button03");
var home = document.querySelector(".home");

setNormalBackgroundForMenuButtons();
setActiveButtonBackground(button01);

button01.addEventListener("click", function () {
  firstExercise.style.display = "block";
  secondExercise.style.display = "none";
  thirdExercise.style.display = "none";
  setNormalBackgroundForMenuButtons();
  setActiveButtonBackground(button01);
});

button02.addEventListener("click", function () {
  firstExercise.style.display = "none";
  secondExercise.style.display = "block";
  thirdExercise.style.display = "none";
  setNormalBackgroundForMenuButtons();
  setActiveButtonBackground(button02);
});

button03.addEventListener("click", function () {
  firstExercise.style.display = "none";
  secondExercise.style.display = "none";
  thirdExercise.style.display = "block";
  setNormalBackgroundForMenuButtons();
  setActiveButtonBackground(button03);
});


function setNormalBackgroundForMenuButtons(){
  var backgroundColor = window.getComputedStyle(home).getPropertyValue('background-color');
  button01.style.background = backgroundColor;
  button02.style.background = backgroundColor;
  button03.style.background = backgroundColor;
}

function setActiveButtonBackground(button){
  var body = document.getElementsByTagName("body")[0];
  var color = window.getComputedStyle(body).getPropertyValue('background-color');
  button.style.background = color;
}
