/* --------- VARIABLES ------------- */
var home = document.querySelector(".home");

/* Unteraufgaben & zugehörige Buttons */
var firstExercise = document.getElementById("GCD");
var secondExercise = document.getElementById("primenumber");
var button01 = document.getElementById("button01");
var button02 = document.getElementById("button02");
var exerciseArray = [firstExercise, secondExercise];
var buttons = [button01, button02];

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

/* ggT */ 
const ggtFeld = document.getElementById("ggTFeld");
ggTWASM(100);

async function ggTWASM(num){
  const response = await fetch("ggT.wasm");
  const buffer = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(buffer, {});

  var text = "";
  for (let i = 1; i <= num; i++) {
    for (let j = i; j <= num; j++) {
        text += `ggT(${i},${j}) = ${wasm.instance.exports.GCD(i, j)} \n`;
    }
  }
  ggtFeld.innerText = text;
}
 
 
/* Primenumber calculator */
 const primenumber = document.getElementById("primzahlenAntwort");
 const calcTime = document.getElementById("timeCalc");
 const runningMethod = document.getElementById("runningMethod");

 function primeCalc(){
  const JSStart = performance.now();
  var num=0, p=0;
  var maxNum = 100000;
  for(var n=2; n <= maxNum; n++){
    p=0;
    for(var i=2; i<n; i++){
      if(n%i == 0){
        p=1;
        break;
      }
    }
    if(p == 0){
      num++;
    }
  }
  const JSEnd = performance.now();
  var time = JSEnd - JSStart;
  return {num, time}
 }

async function primeWASM(){
  const response = await fetch("Primzahl.wasm");
  const buffer = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(buffer, {});

  const WASMStart = performance.now();
  var num = wasm.instance.exports.primeToMaxnumber(100000);
  const WASMEnd = performance.now();
  const time = WASMEnd - WASMStart;
  return {num, time};
}

const WASMButton = document.getElementById("WASMStart");
const JSButton = document.getElementById("JSStart");

WASMButton.addEventListener("click", async function(){
  var {num, time} = await primeWASM();
  runningMethod.innerText = "Calculated with WebAssembly.";
  primenumber.innerText = num;
  calcTime.innerText = `Zeit: ${time/1000} Sekunden`;
});

JSButton.addEventListener("click", async function(){
  var {num, time} = await primeCalc();
  runningMethod.innerText = "Calculated with JavaScript.";
  primenumber.innerText = num;
  calcTime.innerText = `Zeit: ${time/1000} Sekunden`;
});
