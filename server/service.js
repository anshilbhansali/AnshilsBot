'use strict';

var express = require('express');
var service = express();

//localhost:3000 
//default port is 3000?
//also allows port 8000
service.get('/', function (req, res) {
  res.send('hello! go to https://hackillinois2017.slack.com');
});

//basically allows localhost:8000 for the above ^ route
service.listen(8000, function () {
  return console.log('Anshils web app listening on port 8000!\nCheck localhost:8000');
});

module.exports = service;