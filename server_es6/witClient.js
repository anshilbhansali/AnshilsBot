'use strict'

const request = require('superagent');

export default class WitClient{
	constructor(token){
		this.token = token;
	}

	static handleWitResponse(res){
		return res.entities;
	}

	ask(message){
		let token = this.token;
		return new Promise(function(resolve, reject){
			request.get('https://api.wit.ai/message')
			.set('Authorization', 'Bearer '+token)
			.query({v: '20170226'})
			.query({q: message})
			.end((err, res) => {
				if(err) reject(err);
				if(res.statusCode != 200){
					reject('Expected status 200 but got '+ res.statusCode);
				}

				const witResponse = WitClient.handleWitResponse(res.body);
				resolve(witResponse);
			});

		});
		
	}
}