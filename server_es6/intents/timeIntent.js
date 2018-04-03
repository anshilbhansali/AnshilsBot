'use strict'

const request = require('superagent');

export default class timeIntent{
	constructor(location){
		this.location = location;
	}

	process(){
		let location = this.location;
		let url = `http://localhost:3010/service/time/${location}`;
		return new Promise(function(resolve, reject){
			if(location===''){
				resolve('You want the time in which part of the world?');
			}
			console.log('location:', location);
			request.get(url, (err, res) => {
				//console.log('GET complete');
				let reply = 'cant tell time yet sorry m8';
				if(err || res.statusCode != 200 || !res.body.result){
					reject(`I had a problem finding the time in ${location}`);
				}else{
					resolve(`In ${location}, it is ${res.body.result.time}`);
				}
			});
		});
	}
}
