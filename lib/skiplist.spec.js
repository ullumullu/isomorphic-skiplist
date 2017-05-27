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
      let ele = testList.list[testList.head.forward[0]];
      while(ele.value !== undefined) {
        listAsArray.push(ele.value);
        ele=testList.list[ele.forward[0]];
      }
      expect(listAsArray).to.have.ordered.members(['1','10','30','55','60','100']);
    });

    it('Should handle large randomized integer arrays.', function () {
      this.timeout(1000000);
      let testList = new SkipList();
      let amount = 100;
      for(let indx = 0; indx < amount; indx++) {
        let insert = Math.round(Math.random()*amount *(Math.random() > 0.5 ? -1 : 1));
        testList.insert(insert, insert); 
      }
      let ele = testList.list[testList.head.forward[0]];
      while(ele.value !== undefined) {
        expect(ele.key).to.be.equal(ele.value);  
        expect(ele.forward.length-1).not.to.be.above(testList.level);
        if(ele.prev.key !== undefined)
          expect(ele.key).not.to.be.below(ele.prev.key);
        if(ele.forward[0].key !== undefined)
          expect(ele.key).not.to.be.above(ele.forward[0].key);
          
        for(let indx = 0, forwardNode; forwardNode = testList.list[ele.forward[indx]]; indx++) {
          if(forwardNode !== testList.tail)
            expect(forwardNode.key).not.to.be.below(ele.key);
        }
        ele=testList.list[ele.forward[0]]
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

  describe('deleteSync()', function () {
    let testList = new SkipList();
    testList.insert(1, '1');
    testList.insert(100, '100');
    testList.insert(30, '30');
    testList.insert(10, 'First Testelement');
    testList.insert(10, 'Second Testelement');
    testList.insert(55, '55');
    testList.insert(60, '60');

    it('Should return true when an existing element was deleted', function() {
      expect(testList.delete(55)).to.be.true;
      expect(testList.find(55)).to.be.undefined;
    });

  });

  describe('head()', function () {

  });

  describe('tail()', function () {

  });

  describe('size()', function () {

  });

});
