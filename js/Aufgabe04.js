/* --------- VARIABLES ------------- */
var home = document.querySelector(".home");

/* Unteraufgaben & zugehörige Buttons */
var firstExercise = document.querySelector(".Einkaufsliste");
var secondExercise = document.querySelector(".Rednerliste");
var thirdExercise = document.querySelector(".tabelle");
var fourthExercise = document.querySelector(".ownEditor")
var button01 = document.getElementById("button01");
var button02 = document.getElementById("button02");
var button03 = document.getElementById("button03");
var button04 = document.getElementById("button04");
var exerciseArray = [firstExercise, secondExercise, thirdExercise, fourthExercise];
var buttons = [button01, button02, button03, button04];


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



/* ------ Einkaufsliste ------ */
/* --------- VARIABLES ------------- */
var inputField = document.getElementById("ItemInput");
var addButton = document.getElementById("addItem");
var deleteAll = document.getElementById("deleteAll");
var listEinkauf = document.getElementById("itemList");
var einkaufsliste = document.querySelector(".Einkaufsliste");


/* --------- METHODS ------------- */
/* lade den css style für einkaufsliste IE unterstützt getComputedStyle nicht.*/
var einkaufsListeStyle = window.getComputedStyle ?
  window.getComputedStyle(einkaufsliste, null).getPropertyValue('display') : null;
if (einkaufsListeStyle !== "none") {
  loadSavedItems();
}

addButton.addEventListener("click", function(){
  handleInput(inputField, createAndAddListItem, false);
  saveIteminLocalStorage(inputField.value);
  inputField.value = "";
});

inputField.addEventListener("keyup", function({key}) {
  if (key === "Enter") {
    handleInput(inputField, createAndAddListItem, false);
    saveIteminLocalStorage(inputField.value);
    inputField.value = "";
  }
});

deleteAll.addEventListener("click", function(){
  listEinkauf.innerHTML = "";
  localStorage.setItem('list', "");
});

function loadSavedItems(){
  var allItems = localStorage.getItem('list');
  if (allItems === null) {
    return;
  }
  var array = allItems.split(";");
  /* if there is no saved Data no loading is needed */
  if (array[0] === "") {
    return;
  }

  /* load data into webpage */
  for (var i = 0; i < array.length - 1; i++) {
    createAndAddListItem(array[i]);
  }
}

function saveIteminLocalStorage(item){
  var allItems = localStorage.getItem('list');
  if (allItems) {
    allItems += (item + ";");
  } else {
    allItems = (item + ";");
  }
  localStorage.setItem('list', allItems);
}

function deleteItemfromLocalStorage(item){
  var allItems = localStorage.getItem('list');
  if (allItems.indexOf(item) > -1) {
    allItems = allItems.replace((item + ";"), "");
  }
  localStorage.setItem('list', allItems);
}

function createAndAddListItem(item){
  var li = document.createElement("li");

  var itemWrapper = document.createElement("div");
  itemWrapper.classList.add("ItemWrapper");

  var itemText = document.createElement("span");
  itemText.classList.add("listText");
  itemText.textContent = item;

  var itemButton = document.createElement("span");
  itemButton.classList.add("button");
  itemButton.textContent = "Delete";

  itemWrapper.append(itemText);
  itemWrapper.append(itemButton);
  li.append(itemWrapper);

  itemButton.addEventListener("click", function(){
    deleteItemfromLocalStorage(item);
    li.remove();
  });

  listEinkauf.append(li);
}


/* ------ Rednerliste ------ */
/* --------- VARIABLES ------------- */
var inputFieldRedner = document.getElementById("ItemInputRednerliste");
var addButtonRedner = document.getElementById("addItemRednerliste");
var deleteAllRedner = document.getElementById("deleteAllRednerliste");
var listRedner = document.getElementById("itemListRednerliste");
var rednerliste = document.querySelector(".Rednerliste");
var resetAllRedner = document.getElementById("resetAllRednerliste");
var sub = new alertAll();
var id = 0;


/* --------- METHODS ------------- */
addButtonRedner.addEventListener("click", function(){
  handleInput(inputFieldRedner, createAndAddRednerListItem, true);
});

inputFieldRedner.addEventListener("keyup", ({key}) => {
  if (key === "Enter") {
    handleInput(inputFieldRedner, createAndAddRednerListItem, true);
  }
});

resetAllRedner.addEventListener("click", () => {
  sub.resetAll();
});

deleteAllRedner.addEventListener("click", function(){
  listRedner.innerHTML = "";
  sub.removeAll();
});

function handleInput(input, func, deleteInputValue) {
  if (input.value.length === 0) {
    return;
  }
  func(input.value);
  if (deleteInputValue) {
    input.value = "";
  }
}

function createAndAddRednerListItem(item){
  var li = document.createElement("li");

  var itemWrapper = document.createElement("div");
  itemWrapper.classList.add("ItemWrapper");

  var itemText = document.createElement("span");
  itemText.classList.add("listText");
  itemText.textContent = item;

  var itemTime = document.createElement("span");
  itemTime.classList.add("ZeitDarstellung");
  itemTime.classList.add("listText");
  itemTime.textContent = "00:00:00";

  var itemStartTime = document.createElement("span");
  itemStartTime.classList.add("button");
  itemStartTime.textContent = "Start!";

  var itemTimeReset = document.createElement("span");
  itemTimeReset.classList.add("button");
  itemTimeReset.textContent = "Reset";

  var itemButton = document.createElement("span");
  itemButton.classList.add("button");
  itemButton.textContent = "Delete";

  itemWrapper.append(itemText);
  itemWrapper.append(itemTime);
  itemWrapper.append(itemStartTime);
  itemWrapper.append(itemTimeReset);
  itemWrapper.append(itemButton);
  li.append(itemWrapper);

  var timer = new stopwatch(itemTime, itemStartTime, id++);
  sub.add(timer);

  itemButton.addEventListener("click", function(){
    timer.stop();
    sub.remove(timer);
    li.remove();
  });

  itemStartTime.addEventListener("click", function(){
    if (itemStartTime.textContent === "Start!") {
      sub.alert(timer.id);
      timer.start();
    } else {
      timer.stop();
    }
  });

  itemTimeReset.addEventListener("click", function(){
    timer.reset();
  });

  listRedner.append(li);
}

function alertAll(){
  var subscriber = [];

  function add(timer){
    subscriber.push(timer);
  }

  function remove(timer){
    var removeIndex = subscriber.findIndex(item => item.id === timer.id);
    subscriber.splice(removeIndex, 1);
    console.log(subscriber);
  }

  function alert(id){
    for (var i = 0; i < subscriber.length; i++) {
      if (subscriber[i].id !== id) {
        subscriber[i].stop();
      }
    }
  }

  function resetAll(){
    for (var i = 0; i < subscriber.length; i++) {
      subscriber[i].stop();
      subscriber[i].reset();
    }
  }

  function removeAll(){
    subscriber = [];
  }

  this.add = add;
  this.remove = remove;
  this.removeAll = removeAll;
  this.resetAll = resetAll;
  this.alert = alert;
}

function stopwatch(elem, button, id, delay){
  /* init */
  delay = delay || 100;
  id = id;
  reset();
  var interval, offset, timer;

  function start(){
    if (!interval) {
      button.textContent = "Stop!";
      offset = Date.now();
      interval = setInterval(update, delay);
    }
  }

  function stop(){
    if (interval) {
      button.textContent = "Start!";
      clearInterval(interval);
      interval = null;
    }
  }

  function reset(){
    timer = 0;
    button.textContent = "Start!";
    renderTimer();
  }

  function update(){
    var now = Date.now();
    timer += (now - offset);
    offset = now;
    renderTimer();
  }

  function renderTimer(){
    var timeRendered = "00:00:00";
    var date = new Date(timer);
    var hours = date.getHours() - 1;
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    timeRendered = `${hours}:${minutes}:${seconds}`
    elem.textContent = timeRendered;
  }

  this.start = start;
  this.stop = stop;
  this.reset = reset;
  this.id = id;
}

/* ------ Tabellenkalkulation ------ */
/* --------- VARIABLES ------------- */
var allInput = document.querySelectorAll(".tablecolumn");
const _add = (x,y) => x+y;
const _sub = (x,y) => x-y;
const _mul = (x,y) => x*y;
const _div = (x,y) => x/y;
const _square = x => x*x;
const _root = x => Math.sqrt(x);


/* --------- METHODS ------------- */
for (var i = 0; i < allInput.length; i++) {
  allInput[i].func = function(){};
  allInput[i].index = [];
  allInput[i].inputString = "";
  allInput[i].value = "";

  allInput[i].addEventListener("focusout", function() {
    parse(this);
    update(this.id);
  });

  allInput[i].addEventListener("focus", function(){
    printFunction(this);
  });
}

function printFunction(input){
  if (input.inputString) {
    input.value = input.inputString;
  }
}

function update(currentID, startID){
  if (currentID === startID) {
    return;
  }

  startID = startID ? startID : currentID;
  var value = 0;

  for (var i = 0; i < allInput.length; i++) {
    if (allInput[i].index.indexOf(currentID) >= 0){
      if (allInput[i].func.binary) {
        var tmpIndex = []
        for (var j = 0; j < allInput[i].index.length; j++) {
          tmpIndex.push(allInput[i].index[j]);
        }
        value = calcFunc(allInput[i].func.f, tmpIndex);
      } else {
        value = allInput[i].func.f(
          parseFloat(document.getElementById(allInput[i].index).value)
        );
      }
      allInput[i].value = value;
      update(allInput[i].id, startID);
    }
  }
}

function parse(input){
  var value = input.value;
  var indexOfEqual = value.indexOf('=');
  var indexOfOpenBrackets = value.indexOf("(");
  var indexOfClosedBrackets = value.indexOf(")");
  var indexOfComma = value.indexOf(",");
  var indexOfColon = value.indexOf(":");

  input.index = [];
  input.func = function(){};
  input.inputString = "";

  if (indexOfEqual === -1 || indexOfEqual > 0 || indexOfClosedBrackets !== (value.length - 1)
      || indexOfOpenBrackets === -1 || indexOfClosedBrackets === -1) {
    return;
  }

  var funcName = value.substring(indexOfEqual + 1, indexOfOpenBrackets).trim();
  var func = getFunction(funcName);
  var val = 0;
  var index = [];

  if (func) {
    if (func.binary) {
      /*binary function*/
      if (indexOfComma === -1 && indexOfColon === -1) {
        return;
      }
      var seperator = indexOfComma === -1 ? ":" : ",";
      index = getIndex(indexOfOpenBrackets + 1, indexOfClosedBrackets, value, seperator);
      var tmpIndex = [];
      for (var i = 0; i < index.length; i++) {
        tmpIndex.push(index[i]);
      }
      val = calcFunc(func.f, tmpIndex);

    } else {
      /*unary function*/
      if (indexOfComma !== -1 || indexOfColon !== -1) {
        return;
      }
      index = value.substring(indexOfOpenBrackets + 1, indexOfClosedBrackets);
      val = func.f(parseFloat(document.getElementById(index).value));
    }

    input.func = func;
    input.index = index;
    input.inputString = input.value;

    input.value = val;
  }

}

function getFunction(name){
  switch (name) {
    case "SUM": return { f: _add, binary: true}; break;
    case "SUB": return { f: _sub, binary: true}; break;
    case "MUL": return { f: _mul, binary: true}; break;
    case "DIV": return { f: _div, binary: true}; break;
    case "SQUARE": return { f: _square, binary: false}; break;
    case "ROOT": return { f: _root, binary: false}; break;
    default:
      return undefined;
  }
}

function getIndex(start, end, value, seperator){
  var subString = value.substring(start, end);
  if (seperator === ",") {
    var array = subString.split(seperator);
    return array;
  } else {
    var firstElem = subString.substring(0, subString.indexOf(":"));
    var lastElem = subString.substring(subString.indexOf(":") + 1, subString.length);
    var allElem = [];
    if(!firstElem[1] || !lastElem[1]){
      return null;
    }
    if (firstElem[0] === lastElem[0]) {
      if (parseInt(firstElem[1]) > parseInt(lastElem[1])) {
        var tmp = firstElem;
        firstElem = lastElem;
        lastElem = tmp;
      }
      allElem.push(firstElem);
      var num = parseInt(firstElem[1]) + 1;
      for (var i = num; i < lastElem[1]; i++) {
        var newElem = firstElem[0] + i;
        allElem.push(newElem);
      }
      allElem.push(lastElem);
      return allElem;

    } else {
      if (parseInt(firstElem[1]) !== parseInt(lastElem[1])) {
        return;
      }
      var buchstaben = elements(firstElem[0], lastElem[0])
      for (var i = 0; i < buchstaben.length; i++) {
        var newElem = buchstaben[i] + firstElem[1];
        allElem.push(newElem);
      }
      return allElem;
    }
  }
}

function elements(x,y){
  var lib = [
    { char: 'A', val: 0},
    { char: 'B', val: 1},
    { char: 'C', val: 2},
    { char: 'D', val: 3},
    { char: 'E', val: 4},
  ];

  var first;
  var last;
  var all = [];

  for (var i = 0; i < lib.length; i++) {
    if (lib[i].char === x) {
      first = lib[i];
    }
    if (lib[i].char === y) {
      last = lib[i];
    }
  }

  if (first.val > last.val) {
    var tmp = first;
    first = last;
    last = tmp;
  }

  for (var i = first.val; i < (last.val + 1); i++) {
    all.push(lib[i].char);
  }
  return all;
}

function calcFunc(func, index, value){
  var start = func === _mul ? 1 : func === _div ? 1 : 0;
  value = value ? value : start;
  if (index.length === 1) {
    var first = parseFloat(document.getElementById(index[0]).value);
    return func(first, value);
  }

  var first = parseFloat(document.getElementById(index[0]).value);
  var val = func(first, value);
  index.shift();
  return calcFunc(func, index, val);
}



/* ------ Editor ------ */
/* --------- VARIABLES ------------- */
var allButtons = document.querySelectorAll(".toolbar a");
var editor = document.getElementById("editor");
var inputColors = document.querySelectorAll(".colorInput")
var editMode = true;


/* --------- METHODS ------------- */
function execCmd(command, value){
  document.execCommand(command, false, value);
}

for (var i = 0; i < allButtons.length; i++) {
  if (allButtons[i].dataset.command) {
    allButtons[i].addEventListener('click', function(){
      var args = this.dataset.option;
      if (this.dataset.command === 'createlink') {
        args = prompt('Enter a URL', 'https://');
      }
      if (this.dataset.command === 'insertimage') {
        args = prompt('Enter an image URL', '');
      }
      if (this.dataset.command === 'fontSize') {
        args = document.getElementById("editorFontSize").value;
      }
      if(this.dataset.command === 'contentEditable'){
        editMode = !editMode;
        if (editMode) {
          this.textContent = "Edit on";
        } else {
          this.textContent = "Edit off";
        }
        editor.setAttribute("contentEditable", editMode);
      }
      execCmd(this.dataset.command, args);
    });
  }
}
