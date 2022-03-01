const https = require('https');
const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 3000;
const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

const app = express();
app.use(express.static(__dirname));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  console.log(__dirname);
});

app.get("/Aufgabe08/Menu.js", function(req, res){
  res.sendFile(path.join(__dirname + "/../Aufgabe08/Menu.js"));
});

app.get("/Aufgabe08/Text.js", function(req, res){
  res.sendFile(path.join(__dirname + "/../Aufgabe08/Text.js"));
});

app.get("/Navigator.json", function(req, res){
  res.sendFile(path.join(__dirname + "/../Navigator.json"));
});

https.createServer(options, app).listen(port);

console.log("Server running on Port " + port);