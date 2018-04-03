'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _witClient = require('./witClient.js');

var _witClient2 = _interopRequireDefault(_witClient);

var _intentFactory = require('./intentFactory.js');

var _intentFactory2 = _interopRequireDefault(_intentFactory);

var _messageHelper = require('./messageHelper.js');

var _messageHelper2 = _interopRequireDefault(_messageHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var witToken = '';
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var SlackClient = function () {
	function SlackClient(bot_token, server, wit_token) {
		_classCallCheck(this, SlackClient);

		this.server = server;
		this.wit_token = wit_token;
		this.rtm = new RtmClient(bot_token);
		this.setAuthenticatedHandler();
		this.setMessageHandler();

		this.rtm.start();
	}

	_createClass(SlackClient, [{
		key: 'setAuthenticatedHandler',
		value: function setAuthenticatedHandler() {
			var server = this.server;

			this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
				console.log('Logged in as ' + rtmStartData.self.name + ' of team ' + rtmStartData.team.name + ', but not yet connected to a channel');
				return server.listen(3000, function () {
					return console.log('Anshils Slack Bot listening on port 3000!');
				});
			});
		}
	}, {
		key: 'setMessageHandler',
		value: function setMessageHandler() {
			var wit_client = new _witClient2.default(this.wit_token);
			var rtm = this.rtm;
			this.rtm.on(RTM_EVENTS.MESSAGE, function (message) {
				wit_client.ask(message.text).then(function (response) {
					rtm.sendMessage("*bot* " + _messageHelper2.default.getTimeString(), message.channel);

					console.log('wit response: ', response);
					var intents = response.intent;
					var location = response.location;
					if (!intents) {
						rtm.sendMessage("I dont understand", message.channel);
						return;
					}

					// ITERATIVELY CALLING PROMISE FUNCTIONS!!!
					var reply_message = '\n';
					var intents_processed = 0;
					var intent_type_processed = {};
					intents.forEach(function (intent_element, i) {
						var intent_type = intent_element.value;
						if (intent_type in intent_type_processed) {
							return;
						}

						intent_type_processed[intent_type] = true;
						var intent = new _intentFactory2.default(intent_type, location);
						//console.log('my intent', intent);

						intent.process().then(function (reply) {
							reply_message += reply;
							reply_message += '\n';
							intents_processed += 1;
							//console.log('completed: ', intent);
						}).catch(function (unfortunate_reply) {
							reply_message += unfortunate_reply;
							reply_message += '\n';
							intents_processed += 1;
							//console.log('completed: ', intent);
						});
					});

					//allow 1 second for all promises to complete
					setTimeout(function () {
						rtm.sendMessage(reply_message, message.channel);
						rtm.sendMessage(_messageHelper2.default.getLongLine(), message.channel);
					}, 1000);
				}).catch(function (error) {
					console.log('error: ', error);
					rtm.sendMessage('NLP processor had a problem :(', message.channel);
					rtm.sendMessage(error, message.channel);
					rtm.sendMessage(_messageHelper2.default.getLongLine(), message.channel);
					return;
				});
			});
		}
	}]);

	return SlackClient;
}();

exports.default = SlackClient;