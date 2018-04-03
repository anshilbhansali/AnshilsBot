'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('superagent');

var weatherIntent = function () {
	function weatherIntent(location) {
		_classCallCheck(this, weatherIntent);

		this.location = location;
	}

	_createClass(weatherIntent, [{
		key: 'process',
		value: function process() {
			var location = this.location;
			var url = 'http://localhost:3010/service/weather/' + location;

			return new Promise(function (resolve, reject) {
				if (location === '') {
					resolve('You want the weather in which part of the world?');
				}

				request.get(url, function (err, res) {
					var reply = 'cant tell weather yet sorry m8';
					if (err || res.statusCode != 200 || !res.body.result) {
						reject('I had a problem finding the weather in ' + location);
					} else {
						resolve('In ' + location + ', it is ' + res.body.result);
					}
				});
			});
		}
	}]);

	return weatherIntent;
}();

exports.default = weatherIntent;