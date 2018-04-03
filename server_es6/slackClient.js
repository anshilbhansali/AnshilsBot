'use strict'

import WitClient from './witClient.js'
import IntentFactory from './intentFactory.js'
import messageHelper from './messageHelper.js'
let witToken = ''
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

export default class SlackClient{
	
	constructor(bot_token, server, wit_token){
		this.server = server;
		this.wit_token = wit_token;
		this.rtm = new RtmClient(bot_token);
		this.setAuthenticatedHandler();
		this.setMessageHandler();

		this.rtm.start();
	}

	setAuthenticatedHandler(){
		let server = this.server;

		this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
			console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
			return server.listen(3000, () => console.log('Anshils Slack Bot listening on port 3000!'))
		});
	}

	setMessageHandler(){
		let wit_client = new WitClient(this.wit_token);
		let rtm = this.rtm;
		this.rtm.on(RTM_EVENTS.MESSAGE, (message) => {
			wit_client.ask(message.text).then(function(response){
				rtm.sendMessage("*bot* "+messageHelper.getTimeString(), message.channel);
				
				console.log('wit response: ', response);
				let intents = response.intent;
				let location = response.location;
				if(!intents){
					rtm.sendMessage("I dont understand", message.channel);
					return;
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
					rtm.sendMessage(reply_message, message.channel);
					rtm.sendMessage(messageHelper.getLongLine(), message.channel);
				},1000);

			}).catch(function(error){
				console.log('error: ',error);
				rtm.sendMessage('NLP processor had a problem :(', message.channel);
				rtm.sendMessage(error, message.channel);
				rtm.sendMessage(messageHelper.getLongLine(), message.channel);
				return;
			});
			
		});
	}

}





