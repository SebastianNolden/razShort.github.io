const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

// tell the root folder to load css and js
app.use(express.static(__dirname + '/public/'));
app.use(fileUpload());
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/downloadFile', (req, res) => {
  res.download('public/Text.txt');
});

app.post('/upload', (req, res) => {
  //console.log(req.files.fileName.data.toString('utf8'));
  if (req.files === null){
    res.render('error', {text: 'Error: Gar keine Datei angegeben!'});
    return;
  }
  if (req.files.fileName.length > 2){
    res.render('error', {text: 'Zu viele Dateien angegeben.'})
    return;
  }
  if (req.files.fileName.length === undefined){
    res.render('error', {text: 'Zu wenige Dateien angegeben.'})
    return;
  }

  // merge and write in file
  let data1 = [], data2 = [];
  data1 = req.files.fileName[0].data.toString().split('\n');
  data2 = req.files.fileName[1].data.toString().split('\n');

  let merge = [];
  data1.forEach((line, i) => {
    merge += data1[i] + "" + data2[i] + " <br>";
  });
  // <pre></pre>
  // backtick schreibweise für ohne ejs!
  let mergeFile = [];
  data1.forEach((line, i) => {
    mergeFile += data1[i] + "" + data2[i] + "\n";
  });

  fs.writeFile(path.join(__dirname + '/public/Text.txt'), mergeFile, err => {
    if (err){
      console.log(err);
    } else {
      console.log("File creation done.");
    }
  });


  res.render('textPage', {text: merge})
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
