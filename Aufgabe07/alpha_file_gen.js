const fs = require('fs');

const date = new Date();
const charCode = 'a'.charCodeAt(0);

let _fileName = `${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.txt`;
let rows = 0;

const parsing = parseInput();

// identName from https://stackoverflow.com/questions/44790901/javascript-sequence-of-letters
var identName = function (a) {
  var b = [a], sp, out, i, div;

    sp = 0;
    while(sp < b.length) {
        if (b[sp] > 25) {
            div = Math.floor(b[sp] / 26);
            b[sp + 1] = div - 1;
            b[sp] %= 26;
        }
        sp += 1;
    }

    out = "";
    for (i = 0; i < b.length; i += 1) {
        out = String.fromCharCode(charCode + b[i]) + out;
    }
    return out;
}

if (parsing) {
  content = [];

  for (var i = 0; i < rows; i++) {
    content.push(createContent(identName(i), i === (rows - 1)));
  }

  fs.writeFile(_fileName, content.join(''), err => {
    if (err){
      console.log(err);
    } else {
      console.log("File creation done.");
    }
  });
}

function createContent(val, end){
  let string = ""
  if (end) {
    string = `${val}`;
  } else {
    string = `${val}\n`;
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
