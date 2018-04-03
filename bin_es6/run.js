'use strict'

import service from '../server/service'
const http = require('http');

const server = http.createServer(service);

import SlackClient from '../server/slackClient'
let slack_client = new SlackClient(getTokens().slack_token, server, getTokens().wit_token);


function getTokens(){
	const fs = require('fs');
	let rawdata = fs.readFileSync('tokens.json');  
	let data = JSON.parse(rawdata); 
	return {slack_token: data.slackToken, wit_token: data.witToken};
}

