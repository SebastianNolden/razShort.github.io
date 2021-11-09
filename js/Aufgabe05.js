/* Unteraufgaben & zugehörige Buttons */
var home = document.querySelector(".home");
var promise = document.getElementById("Promise");
var primZahl = document.getElementById("Primzahl");
var navAufgabe = document.getElementById("Navigator");
var button01 = document.getElementById("button01");
var button02 = document.getElementById("button02");
var button03 = document.getElementById("button03");
var exerciseArray = [promise, primZahl, navAufgabe];
var buttons = [button01, button02, button03];

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



/* ------ Promise & Async ------ */
/* --------- VARIABLES ------------- */
var textFieldA = document.getElementById("RawTextA");
var textFieldB = document.getElementById("RawTextB");
var textFieldConcat = document.getElementById("ConcatText");
var concatTextButton = document.getElementById("concatTextButton");
var resetTextButton = document.getElementById("resetTextButton");
var promiseSwitchButton = document.getElementById("promiseSwitchButton");
var promise = true;


/* --------- METHODS ------------- */
readTextFilesAndDisplayTheirContent();
concatTextButton.addEventListener('click', usePromise);

promiseSwitchButton.addEventListener('click', () => {
  if (promise) {
    promise = !promise;
    promiseSwitchButton.textContent = "Async";
    concatTextButton.removeEventListener('click', usePromise);
    concatTextButton.addEventListener('click', useAsync);
  } else {
    promise = !promise;
    promiseSwitchButton.textContent = "Promise";
    concatTextButton.removeEventListener('click', useAsync);
    concatTextButton.addEventListener('click', usePromise);
  }
  clearConcatText();
});

resetTextButton.addEventListener('click', () => {
  clearConcatText();
});

function clearConcatText(){
  textFieldConcat.textContent = "";
}

function usePromise(){
  readTextAndConcatAndDisplayWithPromise();
}

function useAsync(){
  readTextAndConcatAndDisplayWithAsync();
}

function readTextFilesAndDisplayTheirContent(){
  Promise.allSettled(readFiles()).then((text) => {
    textFieldA.textContent = text[0].value;
    textFieldB.textContent = text[1].value;
  });
}

function readTextAndConcatAndDisplayWithPromise(){
  Promise.all(readFiles()).then((text) => {
    let newText = "";
    let textA = text[0].split('\n');
    let textB = text[1].split('\n');

    console.log(textA);
    console.log(textA[0]);

    for (var i = 0; i < textA.length; i++) {
      newText += textA[i] + " " + textB[i] + "\r\n";
      //newText += `${textA[i]} ${textB[i]}\r\n`;
    }
    textFieldConcat.textContent = newText;
  });
}

async function readTextAndConcatAndDisplayWithAsync(){
  const rawTextA = await fetch('TextA.txt').then(a => a.text());
  const rawTextB = await fetch('TextB.txt').then(b => b.text());

  let newText = "";
  let textA = rawTextA.split('\r\n');
  let textB = rawTextB.split('\r\n');

  for (var i = 0; i < textA.length; i++) {
    newText += `${textA[i]} ${textB[i]}\r\n`;
  }
  textFieldConcat.textContent = newText;
}

function readFiles(){
  return [fetch('TextA.txt').then(a => a.text()),
  fetch('TextB.txt').then(b => b.text())];
}


/* ------ Primzahlen ------ */
/* --------- VARIABLES ------------- */
var animBalken = document.getElementById("AnimBalken");
var primList = document.getElementById("PrimzahlListe");
var primButton = document.getElementById("PrimzahlStart");
var primResetButton = document.getElementById("PrimzahlReset");
var bigNum = 1n;
var primInterval;
var primRunning = false;
var balkenChange = 0.5;
var balkenValue = 0;

/* --------- METHODS ------------- */
primButton.addEventListener('click', () => {
  if (primRunning) {
    stopPrimInterval();
  } else {
    startPrimInterval();
  }
});

primResetButton.addEventListener('click', () => {
  if (primRunning) {
    stopPrimInterval();
  }
  bigNum = 1n;
  balkenValue = 0;
  primList.textContent = "";
  animBalken.style.width = "0%";
});

function startPrimInterval(){
  primInterval = setInterval(createPrimeAndAddToList, 500);
  primRunning = true;
  changeBalkenWidth();
  primButton.textContent = "Stop";
}

function stopPrimInterval(){
  clearAllPrimInterval();
  primRunning = !primRunning;
  primButton.textContent = "Start";
}

function clearAllPrimInterval(){
  clearInterval(primInterval);
  primInterval = null;
}

function changeBalkenWidth(){
  if (primRunning) {
    if (primZahl.style.display === "none") {
      stopPrimInterval();
      return;
    }
    let newWidth = balkenValue + balkenChange;
    if (newWidth > 100) {
      newWidth = 100;
      balkenChange = -balkenChange;
    }
    if (newWidth < 0) {
      newWidth = 0;
      balkenChange = -balkenChange;
    }

    balkenValue = newWidth;
    animBalken.style.width = `${newWidth}%`;
    requestAnimationFrame(changeBalkenWidth);
  }
}

function createPrimeAndAddToList(){
  const work = new Worker("js/PrimzahlWorker.js");
  work.postMessage(bigNum);
  work.onmessage = function(e){
    if (e.data === false) {
      work.terminate();
    } else {
      var li = document.createElement("li");

      var itemText = document.createElement("span");
      itemText.textContent = e.data;

      li.append(itemText);
      primList.insertBefore(li, primList.firstChild);
    }
  }
  bigNum++;
}

function isPrime(num){
  if (num === 2n) {
    return true;
  }
  for (let i = 2n; i < num; i++) {
    if (num % i === 0n) {
      return false;
    }
  }
  return num > 1;
}

/* ------ Primzahlen ------ */
/* --------- VARIABLES ------------- */
var topNavElements = document.getElementById("topNavElements");
var leftNav = document.getElementById("leftNav");
var contentNav = document.getElementById("contentNav");
var rightNav = document.getElementById("rightNavLinkWrapper");


/* --------- METHODS ------------- */
var jsonObject;

start();

async function start(){
  jsonObject = await fetch('Navigator.json').then(a => a.json());

  // erzeugt nav region
  for (let key in jsonObject){
    var span = document.createElement("span");
    span.textContent = key;
    span.classList = "button";

    span.addEventListener('click', function() {
      loadContent(this.textContent, null, true);
    });

    topNavElements.append(span);
  }

  // init content
  const keys = Object.keys(jsonObject);
  loadContent(keys[0], null, true);
}

function loadContent(key, child, pushState = false){
  const childKey = child || Object.keys(jsonObject[key])[0];
  createLeftNav(key);
  renderContent(
    jsonObject[key][childKey].content,
    jsonObject[key][childKey].references,
    key, childKey, pushState );
}

function onLeftNavButtonClick(){
  let all = jsonObject[this.dataset.parentKey][this.textContent];
  renderContent(all.content, all.references, this.dataset.parentKey, this.textContent, true);
}

function createLeftNav(key){
  leftNav.textContent = "";
  for (let val in jsonObject[key]) {
    var span = document.createElement("span");
    span.textContent = val;
    span.dataset.parentKey = key;
    span.classList = "button";

    span.addEventListener('click', onLeftNavButtonClick);
    leftNav.append(span);
  }
}

function renderContent(content, references, parent, child, pushState = false){
  contentNav.textContent = content;
  createLinks(references);
  if (pushState) window.history.pushState({parent: parent, child: child}, '');
}

function createLinks(references){
  rightNavLinkWrapper.textContent = "";
  for (let link of references) {
    let a = document.createElement("a");
    a.target = "_blank";
    a.href = link;
    a.classList = "rightNavLink";
    a.textContent = link;
    rightNavLinkWrapper.append(a);
  }
}

window.addEventListener('popstate', function(e){
  if (e.state) {
    loadContent(e.state.parent, e.state.child);
  } else {
    window.history.back();
  }
});
