/* --------- VARIABLES ------------- */
var home = document.querySelector(".home");

/* Unteraufgaben & zugehörige Buttons */
var firstExercise = document.querySelector(".Einkaufsliste");
var secondExercise = document.querySelector(".Rednerliste");
var button01 = document.getElementById("button01");
var button02 = document.getElementById("button02");


/* --------- METHODS ------------- */
/* ------ Unteraufgaben wechseln ------ */
setNormalBackgroundForMenuButtons();
setActiveButtonBackground(button01);

button01.addEventListener("click", function () {
  firstExercise.style.display = "block";
  secondExercise.style.display = "none";
  setNormalBackgroundForMenuButtons();
  setActiveButtonBackground(button01);
});

button02.addEventListener("click", function () {
  firstExercise.style.display = "none";
  secondExercise.style.display = "block";
  setNormalBackgroundForMenuButtons();
  setActiveButtonBackground(button02);
});


function setNormalBackgroundForMenuButtons(){
  var backgroundColor = window.getComputedStyle(home).getPropertyValue('background-color');
  button01.style.background = backgroundColor;
  button02.style.background = backgroundColor;
}

function setActiveButtonBackground(button){
  var body = document.getElementsByTagName("body")[0];
  var color = window.getComputedStyle(body).getPropertyValue('background-color');
  button.style.background = color;
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
  handleInput(inputField, createAndAddListItem);
  saveIteminLocalStorage(inputField.value);
});

inputField.addEventListener("keyup", ({key}) => {
  if (key === "Enter") {
    handleInput(inputField, createAndAddListItem);
    saveIteminLocalStorage(inputField.value);
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
  handleInput(inputFieldRedner, createAndAddRednerListItem);
});

inputFieldRedner.addEventListener("keyup", ({key}) => {
  if (key === "Enter") {
    handleInput(inputFieldRedner, createAndAddRednerListItem);
  }
});

resetAllRedner.addEventListener("click", () => {
  sub.resetAll();
});

deleteAllRedner.addEventListener("click", function(){
  listRedner.innerHTML = "";
  sub.removeAll();
});

function handleInput(input, func) {
  if (input.value.length === 0) {
    return;
  }
  func(input.value);
  input.value = "";
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
