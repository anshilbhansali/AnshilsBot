'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var greetingIntent = function () {
	function greetingIntent() {
		//nothing

		_classCallCheck(this, greetingIntent);
	}

	_createClass(greetingIntent, [{
		key: 'process',
		value: function process() {
			var greeting = 'Hi! I am Anshils Bot. Ask me about the time and/or weather in any part of the world!';

			return new Promise(function (resolve, reject) {
				resolve(greeting);
			});
		}
	}]);

	return greetingIntent;
}();

exports.default = greetingIntent;