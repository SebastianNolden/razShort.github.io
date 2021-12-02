const fs = require('fs');
const eT = require('ExecutionTime.js');
const { pipeline } = require('stream/promises');
const fileA = process.argv[2], fileB = process.argv[3];
let lines1 = [], lines2=[];
let count = 0, runTime = 0;

eT.start();

readFile(fileA, lines1, true);
readFile(fileB, lines2, false);

async function readFile(file, lines, clear){
  let stream1;
  await pipeline(
    stream1 = fs.createReadStream(file, 'utf8'),
    async function (source){
      for await (const chunk of source) {
        chunk.split('\n').forEach( val => {
          lines.push(val);
        });
      };
    }
  );

  // stop timer to calculate clearing time
  eT.stop();
  runTime = eT.getExecTime();

  // clear line array
  if (clear){
    clearNumberArr();
  } else {
    clearBuchArr();
  }

  eT.start();
  count += 1;
  if(count === 2){
    lines1.forEach((line, i) => console.log(line + lines2[i]));
  }
  console.log(runTime);
  runTime += eT.getExecTime();
  console.log(`Time for execution: ${runTime} seconds`)


}

function clearBuchArr(){
  lines2 = lines2.filter(e => e);
  for (var i = 0; i < lines2.length - 1; i++) {
    if (lines2[i].length > lines2[i+1].length && (lines2[i][0] !== 'z' && lines2[i+1] !== 'a') && lines2[i+1] !== ''){
      lines2[i+1] = `${lines2[i+1]}${lines2[i+2]}`;
      lines2[i+2] = '';
    }
  }
  lines2 = lines2.filter(e => e);
}

function clearNumberArr(){
  lines1 = lines1.filter(e => e);
  for (var i = 1; i < lines1.length; i++) {
    if (lines1[i-1].length < lines1[i].length && Number(lines1[i-1]) + 1 !== Number(lines1[i]) && lines1[i-1] !== '' && !lines1[i-1].includes('.')) {
      lines1[i] = `${lines1[i-1]}${lines1[i]}`;
      lines1[i-1] = '';
    }
    if (lines1[i] === '.'){
      lines1[i-1] = `${lines1[i-1]}.`;
      lines1[i] = '';
    }
    if (!lines1[i-1].includes('.') && lines1[i-1] !== ''){
      lines1[i] = '';
      lines1[i-1] = `${lines1[i-1]}${lines1[i]}`;
    }
  }
  lines1 = lines1.filter(e => e);
}
