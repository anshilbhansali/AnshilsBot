'use strict'

const request = require('superagent');

export default class weatherIntent{
	constructor(location){
		this.location = location;
	}

	process(){
		let location = this.location;
		let url = `http://localhost:3010/service/weather/${location}`;

		return new Promise(function(resolve, reject){
			if(location===''){
				resolve('You want the weather in which part of the world?');
			}

			request.get(url, (err, res) => {
				let reply = 'cant tell weather yet sorry m8';
				if(err || res.statusCode != 200 || !res.body.result){
					reject(`I had a problem finding the weather in ${location}`);
				}else{
					resolve(`In ${location}, it is ${res.body.result}`);
				}
			});
		});
	}
}