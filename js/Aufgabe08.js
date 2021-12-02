/* Unteraufgaben & zugehörige Buttons */
const home = document.querySelector(".home");
const myEinkaufsL = document.getElementById("myEinkaufsL");
const myRednerL = document.getElementById("myRednerL");
const myBalkD = document.getElementById("myBalkD");
const myTabelle = document.getElementById("myTabelle");
const myMenu = document.getElementById("myMenu");
const navigator = document.getElementById("NavigatorWrapper");

const button01 = document.getElementById("button01");
const button02 = document.getElementById("button02");
const button03 = document.getElementById("button03");
const button04 = document.getElementById("button04");
const button05 = document.getElementById("button05");
const button06 = document.getElementById("button06");
const exerciseArray = [myEinkaufsL, myRednerL, myBalkD, myTabelle, myMenu, navigator];
const buttons = [button01, button02, button03, button04, button05, button06];

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



/* ---------- Navigator ---------- */
let data = {};
let data2 = {};

function ChangeLeftNavSide(str){
  data2 = data[str];
  if(data2 === undefined){
    return;
  }
  const keys = Object.keys(data2);

  let names = StringFromArray(keys);

  SetInnerContent(names, data[str][keys[0]].content, data[str][keys[0]].references);
}

function SetInnerContent(names, content, references){
  const navCont = document.querySelector('.NavCont');
  // Clear content and add new one
  navCont.innerHTML = "";
  let leftMenu = createElementWithAtt('my-menu', {title: "Vertical Menu", alignment: "Vertical", content: `${names}`});
  navCont.appendChild(leftMenu);
  leftMenu.addEventListener('click', e => ChangeInnerContent(e.explicitOriginalTarget.textContent.trim()));

  let midText = createElementWithAtt('my-text', {text: `${content}`});
  midText.className = "mid";
  navCont.appendChild(midText);

  let rightText = createElementWithAtt('my-Text', {text: `${references}`, title: "References"});
  rightText.className = "right";
  navCont.appendChild(rightText);
}

function ChangeInnerContent(str){
  let keys = Object.keys(data);
  let firstKey = null;
  for(key of keys){
    let keys2 = Object.keys(data[key]);
      for(k of keys2){
        if(k === str){
          firstKey = key;
        }
      }
  }

  const tmpData = data[firstKey];
  if (tmpData === undefined) {
    return;
  }
  const tmpKeys = Object.keys(tmpData);
  let names = StringFromArray(tmpKeys);

  SetInnerContent(names, data[firstKey][str].content, data[firstKey][str].references);
}

async function getData(){
  
  data = await fetch('Navigator.json').then(a => a.json());
  const keys = Object.keys(data);

  let nav = document.getElementById('NavTop');
  let names = StringFromArray(keys);

  nav.appendChild(createElementWithAtt('my-menu', {title: 'WWW Navigator', alignment: 'Horizontal', content: `${names}`}));
  nav.addEventListener('click', e => {ChangeLeftNavSide(e.explicitOriginalTarget.textContent.trim())});

  let leftSide = keys[0];
  ChangeLeftNavSide(leftSide);
}

function createElementWithAtt(name, attr){
  let tmp = document.createElement('template');
  tmp.innerHTML = `<${name} ${Object.entries(attr).map(([key, value]) => `${key}="${value}"`).join(' ')}></${name}>`;
  return tmp.content.firstChild
}

function StringFromArray(keys){
  let names = "";
  for (let k of keys){
    names += `${k},`;
  }
  names = names.substring(0, names.length - 1);
  return names;
}

getData();
