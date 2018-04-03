'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('superagent');

var WitClient = function () {
	function WitClient(token) {
		_classCallCheck(this, WitClient);

		this.token = token;
	}

	_createClass(WitClient, [{
		key: 'ask',
		value: function ask(message) {
			var token = this.token;
			return new Promise(function (resolve, reject) {
				request.get('https://api.wit.ai/message').set('Authorization', 'Bearer ' + token).query({ v: '20170226' }).query({ q: message }).end(function (err, res) {
					if (err) reject(err);
					if (res.statusCode != 200) {
						reject('Expected status 200 but got ' + res.statusCode);
					}

					var witResponse = WitClient.handleWitResponse(res.body);
					resolve(witResponse);
				});
			});
		}
	}], [{
		key: 'handleWitResponse',
		value: function handleWitResponse(res) {
			return res.entities;
		}
	}]);

	return WitClient;
}();

exports.default = WitClient;