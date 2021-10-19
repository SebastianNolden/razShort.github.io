/*jslint browser:true */
var firstExercise = document.querySelector(".top");
var secondExercise = document.querySelector(".outside");
var thirdExercise = document.querySelector(".main");
var button01 = document.getElementById("button01");
var button02 = document.getElementById("button02");
var button03 = document.getElementById("button03");

button01.addEventListener("click", function () {
  firstExercise.style.display = "block";
  secondExercise.style.display = "none";
  thirdExercise.style.display = "none";
});

button02.addEventListener("click", function () {
  firstExercise.style.display = "none";
  secondExercise.style.display = "block";
  thirdExercise.style.display = "none";
});

button03.addEventListener("click", function () {
  firstExercise.style.display = "none";
  secondExercise.style.display = "none";
  thirdExercise.style.display = "block";
});
