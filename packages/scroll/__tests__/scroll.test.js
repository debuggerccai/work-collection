'use strict';

const scroll = require('..');
const assert = require('assert').strict;

assert.strictEqual(scroll(), 'Hello from scroll');
console.info('scroll tests passed');
