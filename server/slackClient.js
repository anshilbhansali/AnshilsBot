var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let nlp = null;


function handleOnAuthenticated(rtmStartData){
	console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message){

	//if(message.text.toLowerCase().includes('iris')){
		nlp.ask(message.text, (err, res) => {
			if(err){
				console.log(err);
				return;
			}

			try {
				if(!res.intent || !res.intent[0] || !res.intent[0].value){
					throw new Error("Could not extract intent");
				}

				//go to respective intent
				//console.log(res);

				res.intent.forEach(function(intent_element, i){
					//console.log(i);
					//console.log(intent_element);

					const intent = require('./intents/'+intent_element.value+'Intent');

					intent.process(res, i, function(err, res){
						if(err){
							console.log(err.message);
							return;
						}
						return rtm.sendMessage(res, message.channel);

					});
				});


				

			} catch(err){
				console.log(err);
				console.log(res);
				rtm.sendMessage("I dont understand", message.channel);

			}

		});
	//}
	

}

function addAuthenticatedHandler(rtm, handler){
	rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(bot_token, nlpClient){
	rtm = new RtmClient(bot_token);
	addAuthenticatedHandler(rtm, handleOnAuthenticated);
	rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);

	nlp = nlpClient;

	return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;


