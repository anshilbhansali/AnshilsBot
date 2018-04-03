'use strict'

const service = require('../server/service');
const http = require('http');
const request = require('superagent');

const server = http.createServer(service);
server.listen(3010);

server.on('listening', function(){
	console.log(`Microservice is listening on ${server.address().port}`);
});