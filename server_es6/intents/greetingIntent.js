'use strict'

export default class greetingIntent{
	constructor(){
		//nothing
	}

	process(){
		let greeting = `Hi! I am Anshils Slack Bot. Ask me about the time and/or weather in any part of the world!`

		return new Promise(function(resolve, reject){
			resolve(greeting);

		});
	}
}
