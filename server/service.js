'use strict';

var _intentFactory = require('./intentFactory.js');

var _intentFactory2 = _interopRequireDefault(_intentFactory);

var _witClient = require('./witClient.js');

var _witClient2 = _interopRequireDefault(_witClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var service = express();
var bodyParser = require("body-parser");

var path = require('path');

service.use(bodyParser.urlencoded({ extended: false }));
service.use(bodyParser.json());

function getTokens() {
	var fs = require('fs');
	var rawdata = fs.readFileSync('tokens.json');
	var data = JSON.parse(rawdata);
	return { slack_token: data.slackToken, wit_token: data.witToken };
}

var wit_client = new _witClient2.default(getTokens().wit_token);

//localhost:3000 
//default port is 3000
//also allows port 8000
service.get('/', function (req, res) {
	res.send('hello! go to https://hackillinois2017.slack.com');
});

service.post('/ask', function (req, res) {
	askWit(req.body.q).then(function (response) {
		res.send(response);
	});
});

service.get('/main', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

//basically allows localhost:8000 for the above ^ route
service.listen(8000, function () {
	return console.log('Anshils web app listening on port 8000!\nCheck localhost:8000');
});

module.exports = service;

function askWit(question) {
	return new Promise(function (resolve, reject) {
		wit_client.ask(question).then(function (response) {
			console.log('wit response: ', response);
			var intents = response.intent;
			var location = response.location;
			if (!intents) {
				resolve("I dont understand");
			}

			// ITERATIVELY CALLING PROMISE FUNCTIONS!!!
			var reply_message = '\n';
			var intents_processed = 0;
			var intent_type_processed = {};
			intents.forEach(function (intent_element, i) {
				var intent_type = intent_element.value;
				if (intent_type in intent_type_processed) {
					return;
				}

				intent_type_processed[intent_type] = true;
				var intent = new _intentFactory2.default(intent_type, location);
				//console.log('my intent', intent);

				intent.process().then(function (reply) {
					reply_message += reply;
					reply_message += '\n';
					intents_processed += 1;
					//console.log('completed: ', intent);
				}).catch(function (unfortunate_reply) {
					reply_message += unfortunate_reply;
					reply_message += '\n';
					intents_processed += 1;
					//console.log('completed: ', intent);
				});
			});

			//allow 1 second for all promises to complete
			setTimeout(function () {
				resolve(reply_message);
			}, 1000);
		}).catch(function (error) {
			console.log('error: ', error);
			reject(error);
		});
	});
}