'use strict'

import service from '../server/service'
const http = require('http');

const server = http.createServer(service);
