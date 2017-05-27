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

      let listAsArray = [];
      let ele = testList.head.forward[0];
      while(ele.value !== undefined) {
        listAsArray.push(ele.value);
        ele=ele.forward[0];
      }
      expect(listAsArray).to.have.ordered.members(['1','10','30','55','60','100']);
    });

    it('Should handle large randomized integer arrays.', function () {
      this.timeout(3000);
      let testList = new SkipList();
      let amount = 10000;
      for(let indx = 0; indx < amount; indx++) {
        let insert = Math.round(Math.random()*amount);
        testList.insert(insert, insert); 
      }
      let ele = testList.head.forward[0];
      while(ele.value !== undefined) {
        expect(ele.key).to.be.equal(ele.value);  
        if(ele.prev.value !== undefined)
          expect(ele.value).not.to.be.below(ele.prev.value);
        if(ele.forward[0].value !== undefined)
          expect(ele.value).not.to.be.above(ele.forward[0].value);
        
        // TODO test forward

        ele=ele.forward[0]
      }
    });

  //   it('', function() {

  //   });
  });

  describe('find()', function () {
      let testList = new SkipList();
      testList.insert(1, '1');
      testList.insert(100, '100');
      testList.insert(30, '30');
      testList.insert(10, 'First Testelement');
      testList.insert(10, 'Second Testelement');
      testList.insert(55, '55');
      testList.insert(60, '60');

      it('Should return the last inserted element with this key. (Default)', function () {
        let testEle = testList.find(10);
        expect(testEle).to.be.a('object');
        expect(testEle.key).to.be.equal(10);
        expect(testEle.value).to.be.equal('Second Testelement');
      });

      it('Should return undefined when the key does not exist. (Default)', function () {
        let testEle = testList.find(666);
        expect(testEle).to.be.undefined;
      });

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
