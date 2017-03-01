'use strict'

const request = require('superagent');

module.exports.process = function process(intentData, i, cb){

	if(intentData.intent[i].value !== 'hey')
		return cb(new Error(`Expected HEY intent, but got 
			${intentData.intent[i].value}`));

	var greeting = 'Hello human! \n'
	+'My name is Iris, and my master is Anshil Bhansali\n'
	+'I can tell you the time anywhere in the world\n'
	+'I can also tell you the weather anywhere in the world!\n'
	+'Ask me!';

	return cb(false, greeting);

}