'use strict'

const request = require('superagent');

module.exports.process = function process(intentData, i, cb){

	if(intentData.intent[i].value !== 'weather')
		return cb(new Error(`Expected weather intent, but got 
			${intentData.intent[i].value}`));

	if(!intentData.location) 
		return cb(new Error('Missing location in weather intent'))

	const location = intentData.location[0].value;

	//requesting microservice iris-time
	request.get(`http://localhost:3010/service/weather/${location}`, (err, res) => {
		if(err || res.statusCode != 200 || !res.body.result){
			console.log(err);
			console.log(res.body);

			return cb(false, `I had a problem finding the weather in ${location}`)
		}

		return cb(false, `In ${location}, it is ${res.body.result}`);
	});
}