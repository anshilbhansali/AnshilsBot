'use strict'

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

const witToken = '62QH3GSIPKCXAZOXWJPTTYJFKWHFVGGW';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-147431376391-0UH5OMSfg24Qry0svS0nNPVv';

const rtm = slackClient.init(slackToken, witClient);
rtm.start();

//to ensure server starts when slack client is connected
slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function(){
	console.log(`IRIS is listening on ${server.address().port}`);
});


