'use strict'

const service = require('../server/service');
const http = require('http');
const request = require('superagent');

const server = http.createServer(service);
server.listen(3010);

server.on('listening', function(){
	console.log(`IRIS-TIME is listening on ${server.address().port}`);
});