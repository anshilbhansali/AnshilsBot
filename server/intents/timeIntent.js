'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('superagent');

var timeIntent = function () {
	function timeIntent(location) {
		_classCallCheck(this, timeIntent);

		this.location = location;
	}

	_createClass(timeIntent, [{
		key: 'process',
		value: function process() {
			var location = this.location;
			var url = 'http://localhost:3010/service/time/' + location;
			return new Promise(function (resolve, reject) {
				if (location === '') {
					resolve('You want the time in which part of the world?');
				}
				console.log('location:', location);
				request.get(url, function (err, res) {
					//console.log('GET complete');
					var reply = 'cant tell time yet sorry m8';
					if (err || res.statusCode != 200 || !res.body.result) {
						reject('I had a problem finding the time in ' + location);
					} else {
						resolve('In ' + location + ', it is ' + res.body.result.time);
					}
				});
			});
		}
	}]);

	return timeIntent;
}();

exports.default = timeIntent;