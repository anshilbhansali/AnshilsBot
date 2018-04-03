'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var messageHelper = function () {
	function messageHelper() {
		//nothing

		_classCallCheck(this, messageHelper);
	}

	_createClass(messageHelper, null, [{
		key: 'getLongLine',
		value: function getLongLine() {
			return '*---------------------------------------------------------------------------------------------------*';
		}
	}, {
		key: 'getTimeString',
		value: function getTimeString() {
			var date = new Date();
			var hour = date.getHours();
			var minutes = date.getMinutes();
			var suffix = 'am';
			if (hour > 12) {
				hour = hour - 12;
				suffix = 'pm';
			} else if (hour === 0) {
				hour = 12;
				suffix = 'am';
			}

			var time_string = hour + ':' + minutes + ' ' + suffix;
			return time_string;
		}
	}]);

	return messageHelper;
}();

exports.default = messageHelper;