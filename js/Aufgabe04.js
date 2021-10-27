/* --------- VARIABLES ------------- */
var inputField = document.getElementById("ItemInput");
var addButton = document.getElementById("addItem");
var deleteAll = document.getElementById("deleteAll");
var list = document.getElementById("itemList");
var einkaufsliste = document.querySelector(".Einkaufsliste");

/* Unteraufgaben & zugehörige Buttons */
var firstExercise = document.querySelector(".Einkaufsliste");
var secondExercise = document.querySelector(".Rednerliste");
var button01 = document.getElementById("button01");
var button02 = document.getElementById("button02");


/* --------- METHODS ------------- */
/* ------ Unteraufgaben wechseln ------ */
button01.addEventListener("click", function () {
  firstExercise.style.display = "block";
  secondExercise.style.display = "none";
});

button02.addEventListener("click", function () {
  firstExercise.style.display = "none";
  secondExercise.style.display = "block";
});



/* ------ Einkaufsliste ------ */
/* lade den css style für einkaufsliste IE unterstützt getComputedStyle nicht.*/
var einkaufsListeStyle = window.getComputedStyle ?
  window.getComputedStyle(einkaufsliste, null).getPropertyValue('display') : null;
if (einkaufsListeStyle !== "none") {
  loadSavedItems();
}

addButton.addEventListener("click", function(){
  if (inputField.value.length === 0) {
    return;
  }
  saveIteminLocalStorage(inputField.value);
  createAndAddListItem(inputField.value);
});

deleteAll.addEventListener("click", function(){
  list.innerHTML = "";
  localStorage.setItem('list', "");
});

function loadSavedItems(){
  allItems = localStorage.getItem('list');
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
  allItems = localStorage.getItem('list');
  allItems += (item + ";");
  localStorage.setItem('list', allItems);
}

function deleteItemfromLocalStorage(item){
  allItems = localStorage.getItem('list');
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
    deleteItemfromLocalStorage(inputField.value);
    li.remove();
  });

  list.append(li);
}

/* ------ Rednerliste ------ */
