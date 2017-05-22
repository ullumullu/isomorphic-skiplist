"use strict"

const mocha = require('mocha');
const describe = mocha.describe; 
const it = mocha.it;
const expect = require('chai').expect;

const SkipList = require('./skiplist');

describe('SkipList', function() {

  describe('constructor', function() {
    it('should not be null', function() {
      let testList = new SkipList();
      expect(testList).not.to.be.null;
    });
  });

  describe('insert()', function () {
    it('Should handle integeger keys per default.', function () {
      let testList = new SkipList();
      testList.insert(1, '1');
      testList.insert(100, '100');
      testList.insert(30, '30');
      testList.insert(10, '10');
      testList.insert(55, '55');
      testList.insert(60, '60');

      let ele = testList.head.forward[0];
      while(ele !== undefined) {
        console.log(ele.value);
        ele=ele.forward[0]
      }
    });

  //   it('', function() {

  //   });
  });

  describe('find()', function () {

  });

  describe('delete()', function () {

  });

  describe('head()', function () {

  });

  describe('tail()', function () {

  });

  describe('size()', function () {

  });

});
