"use strict";

const SkipList = require('./lib/skiplist');

module.exports = function() {
  return SkipList;
};

if (!global.SkipList) {
  global.SkipList = module.exports;
}
