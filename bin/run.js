'use strict';

var _service = require('../server/service');

var _service2 = _interopRequireDefault(_service);

var _slackClient = require('../server/slackClient');

var _slackClient2 = _interopRequireDefault(_slackClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');

var server = http.createServer(_service2.default);

var slack_client = new _slackClient2.default(getTokens().slack_token, server, getTokens().wit_token);

function getTokens() {
	var fs = require('fs');
	var rawdata = fs.readFileSync('tokens.json');
	var data = JSON.parse(rawdata);
	return { slack_token: data.slackToken, wit_token: data.witToken };
}