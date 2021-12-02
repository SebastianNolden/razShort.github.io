const fs = require('fs');

const date = new Date();
let _fileName = `${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.txt`;
let rows = 0;

const parsing = parseInput();

if (parsing) {
  content = [];
  for (var i = 1; i <= rows; i++) {
    content.push(createContent(i, i === rows));
  }

  fs.writeFile(_fileName, content.join(''), err => {
    if (err){
      console.log(err);
    } else {
      console.log("File creation done.");
    }
  });
}

function createContent(num, end){
  let string = "";
  if (end){
    string = `${i}.`;
  } else {
    string = `${i}.\n`;
  }
  return string;
}

function parseInput(){
  if (process.argv[2] && !isNaN(Number(process.argv[2]))) {
    rows = Number(process.argv[2]);
    console.log(`Start creating a file with ${rows} rows.`);
  } else {
    return false;
  }

  if (process.argv[3]) {
    _fileName = `${process.argv[3]}.txt`;
    console.log(`New file name: ${_fileName}`);
  } else {
    console.log(`File name: ${_fileName}`);
  }

  return true;
}
