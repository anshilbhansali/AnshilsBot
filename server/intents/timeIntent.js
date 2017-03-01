'use strict'

const request = require('superagent');

module.exports.process = function process(intentData, i, cb){
	//console.log('in time intent');
	//console.log(intentData.intent[i]);

	if(intentData.intent[i].value !== 'time')
		return cb(new Error(`Expected time intent, but got 
			${intentData.intent[i].value}`));

	if(!intentData.location) 
		return cb(new Error('Missing location in time intent'))

	const location = intentData.location[0].value;

	//requesting microservice iris-time
	request.get(`http://localhost:3010/service/time/${location}`, (err, res) => {
		if(err || res.statusCode != 200 || !res.body.result){
			console.log(err);
			console.log(res.body);

			return cb(false, `I had a problem finding the time in ${location}`)
		}

		return cb(false, `In ${location}, it is ${res.body.result}`);
	});
}