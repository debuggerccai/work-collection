'use strict';

const service = require('..');
const assert = require('assert').strict;

assert.strictEqual(service(), 'Hello from service');
console.info('service tests passed');
