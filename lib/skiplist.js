/**
 * Skip List Implementation.
 * 
 * SkipListNode =
 * {
 *    key: "",
 *    value: "",
 *    forward:[],
 *    prev:""
 *  }
 * 
 */
(function(exports) {
  "use strict";

  function SkipList (opts) {
    let options = opts || {};
    options.maxsize = options.maxsize || Math.pow(2,32)-1;
    this.maxlvl = Math.round(Math.log(options.maxsize) / Math.log(2)); 
    this.level = 0;
    this.size = 0;
    this.propability = options.propability || 0.5;
    this.tail = {key:undefined, value:undefined, forward:[]};
    let arr = []; arr.length = this.maxlvl; arr.fill(this.tail);
    this.head = {key:undefined, value:undefined, forward:arr};
    this.list = [this.head, this.tail];
    let comparator = options.comparator || ((x,y) => (x - y));
    this.compare = (x) => ({
      gt: (y) => comparator(x,y) > 0,
      eq: (y) => comparator(x,y) == 0,
      lt: (y) => comparator(x,y) < 0
    });
  }

  SkipList.prototype.findSync = function(key, options) {
    let currNode = this.head;
    let keyComp = this.compare(key);
    for(let indx = this.level; indx > -1; indx--) {
      while(currNode.forward[indx].key !== undefined && keyComp.gt(currNode.forward[indx].key)) {
        currNode = currNode.forward[indx];
      }
    }
    currNode = currNode.forward[0];
    if(keyComp.eq(currNode.key)) {
      return currNode;
    } else {
      return undefined;
    }
  }

  SkipList.prototype.insertSync = function(key, value, options) {
    // console.log('------------------------------------------');
    // console.log('------------------------------------------');
    // console.log('------------------------------------------');
    // console.log('Enter insert ', key, value);
    // console.log('Curr Highest Level ', this.level);
    let update = []; update.length = this.maxlvl;
    let currNode = this.head;
    let keyComp = this.compare(key);
    for(let indx = this.level; indx > -1; indx--) {
      if(currNode.forward[indx].key !== undefined) { 
        // console.log('COMP ', this.compare(key).gt(currNode.forward[indx].key))
      };
      while(currNode.forward[indx].key !== undefined && keyComp.gt(currNode.forward[indx].key)) {
        // console.log('HIT ', currNode.forward[indx].key);
        currNode = currNode.forward[indx];
        // console.log('COMP ', keyComp.gt(currNode.forward[indx].key))
      }
      update[indx] = currNode;
    }
    let newLvl = randomLevel(this.maxlvl, this.propability);
    if(newLvl > this.level) {
      for(let indx = this.level+1; indx < newLvl+1; indx++) {
        update[indx] = this.head;
      }
      this.level = newLvl;
    }
    let newForward = []; newForward.length = newLvl;
    let newNode = {key:key, value:value, forward: newForward, prev: currNode};
    // console.log('update[0] ', update[0]);
    update.slice(0, newLvl+1).forEach((element, indx) => {
      newNode.forward[indx] = element.forward[indx];
      element.forward[indx] = newNode;
    });
    let nextNode = currNode.forward[0];
    // console.log('nextNode ', nextNode);
    nextNode.prev = newNode;
    // console.log('newNode ', newNode);
    // console.log('------------------------------------------');
    // console.log('------------------------------------------');
    // console.log('------------------------------------------');
  }

  SkipList.prototype.deleteSync = function(key) {
    let update = []; update.length = this.maxlvl;
    let currNode = this.head;
    let keyComp = this.compare(key);
    for(let indx = this.level; indx > -1; indx--) {
      while(currNode.forward[indx].key !== undefined && keyComp.gt(currNode.forward[indx].key)) {
        currNode = currNode.forward[indx];
      }
      update[indx] = currNode;
    }
    currNode = currNode.forward[0];
    // console.log('currNode ', currNode);
    if(keyComp.eq(currNode.key)) {
      for(let indx = 0; indx <= this.level; indx++) {
        if(!keyComp.eq(update[indx].forward[indx].key)) break;
        update[indx].forward[indx] = currNode.forward[indx];
      }
      while(this.level > 0 && this.head.forward[this.level].key === undefined) {
        this.level--;
      }      
      return true;
    } else {
      return false;
    }
  }

  SkipList.prototype.head = function() {
    return this.head;
  }

  SkipList.prototype.tail = function() {
    return this.tail;
  }

  SkipList.prototype.size = function() {
    return this.size;
  }

  function randomLevel(maxHeight, propabilityNextLevel = 0.5) {
    let lvl = 0;
    while(Math.random() <= propabilityNextLevel && lvl <= maxHeight)
      lvl++;
    return lvl;
  }

  if(typeof module === 'undefined') exports.SkipList = SkipList;
  else module.exports = SkipList;
 
})(this);

