'use strict'

const express = require('express');
const service = express();
const bodyParser = require("body-parser");
import IntentFactory from './intentFactory.js'
const path = require('path');

service.set('port', process.env.PORT || 8080);
service.use(bodyParser.urlencoded({ extended: false }));
service.use(bodyParser.json());

function getTokens(){
	const fs = require('fs');
	let rawdata = fs.readFileSync('tokens.json');  
	let data = JSON.parse(rawdata); 
	return {slack_token: data.slackToken, wit_token: data.witToken};
}

import WitClient from './witClient.js'
let wit_client = new WitClient(getTokens().wit_token);

service.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/index.html'));
})

service.post('/ask', function (req, res) {
  askWit(req.body.q).then(function(response){
  	res.send(response);
  });
})

service.listen(service.get('port'), () => console.log('Anshils web app listening on port '+service.get('port')))

module.exports = service;

function askWit(question){
	return new Promise(function(resolve, reject){
			wit_client.ask(question).then(function(response){			
				console.log('wit response: ', response);
				let intents = response.intent;
				let location = response.location;
				if(!intents){
					resolve("I dont understand");
				}

				// ITERATIVELY CALLING PROMISE FUNCTIONS!!!
				let reply_message = '\n';
				let intents_processed = 0;
				let intent_type_processed = {}
				intents.forEach(function(intent_element, i){
					let intent_type = intent_element.value;
					if(intent_type in intent_type_processed){
						return;
					}
						
					intent_type_processed[intent_type] = true;
					let intent = new IntentFactory(intent_type, location);
					//console.log('my intent', intent);
					
					intent.process().then(function(reply){
						reply_message += reply;
						reply_message += '\n';
						intents_processed += 1;
						//console.log('completed: ', intent);
						
					}).catch(function(unfortunate_reply){
						reply_message += unfortunate_reply;
						reply_message += '\n';
						intents_processed += 1;
						//console.log('completed: ', intent);
					});	
				});

				//allow 1 second for all promises to complete
				setTimeout(function(){
					resolve(reply_message);
				},1000);

			}).catch(function(error){
				console.log('error: ',error);
				reject(error);
			});

		});
}
