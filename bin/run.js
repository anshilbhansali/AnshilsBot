'use strict';

var _service = require('../server/service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');

var server = http.createServer(_service2.default);