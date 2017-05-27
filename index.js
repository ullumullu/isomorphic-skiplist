"use strict";

const SkipList = require('./lib/skiplist');

module.exports = function() {
  return new SkipList();
};

if (!global.SkipList) {
  global.SkipList = module.exports;
}
