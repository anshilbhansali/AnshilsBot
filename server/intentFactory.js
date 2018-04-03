'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _greetingIntent = require('./intents/greetingIntent.js');

var _greetingIntent2 = _interopRequireDefault(_greetingIntent);

var _timeIntent = require('./intents/timeIntent.js');

var _timeIntent2 = _interopRequireDefault(_timeIntent);

var _weatherIntent = require('./intents/weatherIntent.js');

var _weatherIntent2 = _interopRequireDefault(_weatherIntent);

var _defaultIntent = require('./intents/defaultIntent.js');

var _defaultIntent2 = _interopRequireDefault(_defaultIntent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IntentFactory = function IntentFactory(type, location_object) {
	_classCallCheck(this, IntentFactory);

	var location = '';
	if (location_object != undefined) location = location_object[0].value;

	if (type === 'hey') {
		var intent = new _greetingIntent2.default();
		return intent;
	} else if (type === 'time') {
		var _intent = new _timeIntent2.default(location);
		return _intent;
	} else if (type === 'weather') {
		var _intent2 = new _weatherIntent2.default(location);
		return _intent2;
	} else {
		var _intent3 = new _defaultIntent2.default(type);
		return _intent3;
	}
};

exports.default = IntentFactory;