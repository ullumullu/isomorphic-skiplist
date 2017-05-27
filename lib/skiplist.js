/**
 * @fileoverview Skip List Implementation.
 * 
 *   SkipListNode =
 *     {
 *       key: "",
 *       value: "",
 *       forward:[],
 *       prev:""
 *     }
 *  
 * @author sv.sterbling@gmail.com (Sven Sterbling)
 */
(function(exports) {
  "use strict";

  /**
   * Initializes a new skiplist.
   * @param {object} opts - Options to modify default behavior of SkipList.
   * @constructor
   * @public
   */
  function SkipList (opts) {
    var options = opts || {};
    options.maxsize = options.maxsize || Math.pow(2,32) - 1;
    this.maxlvl = Math.round( Math.log(options.maxsize) / Math.log(2) ); 
    this.level = 0;
    this.size = 0;
    this.propability = options.propability || 0.5;
    this.tail = {pos: 1, key:undefined, value:undefined, forward:[]};
    var arr = []; arr.length = this.maxlvl; arr.fill(1);
    this.head = {pos: 0, key:undefined, value:undefined, forward:arr};
    this.list = [this.head, this.tail];
    this.compare = (x) => ({
      gt: (y) => x > y,
      eq: (y) => x === y,
      lt: (y) => x < y
    });
  }

  SkipList.prototype.find = function(key, cb) {
    var currNodePos = this.head.pos;
    var keyComp = this.compare(key);
    for(var indx = this.level; indx > -1; indx--) {
      while(this.list[currNodePos].forward[indx] > 1 && 
        keyComp.gt(this.list[this.list[currNodePos].forward[indx]].key)) {
        currNodePos = this.list[currNodePos].forward[indx];
      }
    }
    let foundNode = this.list[this.list[currNodePos].forward[0]];
    if (cb) { 
      keyComp.eq(foundNode.key) ? cb.call(null, foundNode) : cb.call(null, undefined);
    } else {
      return keyComp.eq(foundNode.key) ? foundNode : undefined;
    }
  };

  SkipList.prototype.insert = function(key, value) {
    var update = [];
    var currNodePos = this.head.pos;
    var keyComp = this.compare(key);
    for(var indx = this.level; indx > -1; indx--) {
      while(this.list[currNodePos].forward[indx] > 1 && 
        keyComp.gt(this.list[this.list[currNodePos].forward[indx]].key)) {
        currNodePos = this.list[currNodePos].forward[indx];
      }
      update[indx] = currNodePos;
    }
    var newLvl = randomLevel(this.maxlvl, this.propability);
    if(newLvl > this.level) {
      for(var indx = this.level+1; indx <= newLvl; indx++) {
        update[indx] = this.head.pos;
      }
      this.level = newLvl;
    }
    var newForward = [];
    var newNode = {pos: this.list.length, key:key, value:value, forward: newForward, prev: currNodePos};
    this.list.push(newNode);
    for(var indx = 0; indx <= newLvl; indx++) {
      var elementPos = update[indx];
      newNode.forward[indx] = this.list[elementPos].forward[indx];
      this.list[elementPos].forward[indx] = newNode.pos;    
    }
    this.list[this.list[currNodePos].forward[0]].prev = newNode.pos;
  };

  SkipList.prototype.delete = function(key, cb) {
    var update = [];
    var currNodePos = this.head.pos;
    var keyComp = this.compare(key);

    for(var indx = this.level; indx > -1; indx--) {
      while(this.list[currNodePos].forward[indx] > 1 && 
        keyComp.gt(this.list[this.list[currNodePos].forward[indx]].key)) {
        currNodePos = this.list[currNodePos].forward[indx];
      }
      update[indx] = currNodePos;
    }

    let currNode = this.list[this.list[currNodePos].forward[0]];

    if (keyComp.eq(currNode.key)) {
      for(var indx = 0; indx <= this.level; indx++) {
        if(!keyComp.eq(this.list[this.list[update[indx]].forward[indx]].key)) break;
        this.list[update[indx]].forward[indx] = currNode.forward[indx];
      }
      this.list[currNode.pos] = undefined;
      while(this.level > 0 && this.head.forward[this.level] !== this.tail.pos) {
        this.level--;
      }

      if (cb) {cb.call(null, true)} else {return true};
    } else {
      if (cb) {cb.call(null, false)} else {return false};
    }
  };

  SkipList.prototype.head = function() {
    return this.head;
  };

  SkipList.prototype.tail = function() {
    return this.tail;
  };

  SkipList.prototype.size = function() {
    return this.size;
  };

  /**
   * Generates random level for a new node.
   * @param  {number} maxHeight - Maximum height of the skiplist. Should not go higher than that.
   * @param  {number} propabilityNextLevel [description]
   * @return {number} The random level for the new node
   * @private
   * @nosideeffects 
   */
  function randomLevel(maxHeight, propabilityNextLevel) {
    var prob = propabilityNextLevel || 0.5;
    var lvl = 0;
    while(Math.random() <= prob && lvl <= maxHeight) {
      lvl++;
    }
    return lvl;
  }

  if(typeof module === 'undefined') exports.SkipList = SkipList;
  else module.exports = SkipList;

})(this);

