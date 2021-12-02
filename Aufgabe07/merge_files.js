const fs = require('fs');
const eT = require('ExecutionTime.js');
const fileA = process.argv[2], fileB = process.argv[3];
let lines1 = [], lines2=[];

eT.start();

fs.readFile(fileA, 'utf8', callback(lines1));
fs.readFile(fileB, 'utf8', callback(lines2));


function callback(lines){
  return function(err, data){
    lines.push(...data.split("\n"));
    if (lines1.length && lines2.length) {
      lines1.forEach( (line, index) => console.log(line + lines2[index]));
      console.log(`Time for execution: ${eT.getExecTime()} seconds`);
    }
  }
}
