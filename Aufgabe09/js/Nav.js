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
  let leftMenu = createElementWithAtt('my-menu', {title: "Überschrift", alignment: "Vertical", content: `${names}`});
  leftMenu.className = "left";
  navCont.appendChild(leftMenu);
  leftMenu.addEventListener('click', e => {
    let clickTargetText;
    try {
      clickTargetText = e.explicitOriginalTarget.textContent.trim();
    } catch (err) {
      clickTargetText = e.path[0].outerText;
    }
    ChangeInnerContent(clickTargetText);
  });

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
  
  data = await fetch('../Navigator.json').then(a => a.json());
  const keys = Object.keys(data);

  let nav = document.getElementById('NavTop');
  let names = StringFromArray(keys);

  nav.appendChild(createElementWithAtt('my-menu', {title: 'WWW Navigator', alignment: 'Horizontal', content: `${names}`}));
  nav.addEventListener('click', e => {
    let clickTargetText;
    try {
      clickTargetText = e.explicitOriginalTarget.textContent.trim();
    } catch (err) {
      clickTargetText = e.path[0].outerText;
    }
    ChangeLeftNavSide(clickTargetText);
  });

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
