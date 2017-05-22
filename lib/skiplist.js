(function(exports) {
  "use strict";

  let node = {
    key: "",
    value: "",
    forward:[],
    prev:""
  }


  function randomLevel(maxHeight, propabilityNextLevel = 0.5) {
    let lvl = 0;
    while(Math.random() <= propabilityNextLevel && lvl <= maxHeight)
      lvl++;
    return lvl;
  }

  function SkipList (opts) {
    let options = opts || {};
    options.maxsize = options.maxsize || Math.pow(2,32)-1;
    this.maxlvl = Math.round(Math.log(options.maxsize) / Math.log(2)); 
    this.level = 0;
    this.propability = options.propability || 0.5;
    this.tail = {key:undefined, value:undefined, forward:[]};
    let arr = []; arr.length = this.maxlvl; arr.fill(this.tail);
    this.head = {key:undefined, value:undefined, forward:arr};
    this.list = [this.head, this.tail];
    this.comparator = options.comparator || ((x,y) => (x > y));
  }

  SkipList.prototype.find = function(key, options) {
    // body... 
  }

  SkipList.prototype.insert = function(key, value, options) {
    console.log('------------------------------------------');
    console.log('------------------------------------------');
    console.log('------------------------------------------');
    console.log('Enter insert ', key, value);
    console.log('Curr Highest Level ', this.level);
    let update = []; update.length = this.maxlvl;
    let currNode = this.head;
    for(let indx = this.level; indx > -1; indx--) {
      if(currNode.forward[indx].key !== undefined) { 
        console.log('COMP ', this.comparator(key, currNode.forward[indx].key))
      };
      while(currNode.forward[indx].key !== undefined && this.comparator(key, currNode.forward[indx].key)) {
        console.log('HIT ', currNode.forward[indx].key);
        currNode = currNode.forward[indx];
                console.log('COMP ', this.comparator(key, currNode.forward[indx].key))

      }
      update[indx] = currNode;
    }
    let nextNode = currNode.forward[0];
    console.log('nextNode ', nextNode.value);
    // console.log('nextNode ', nextNode);
    let newLvl = randomLevel(this.maxlvl, this.propability);
    if(newLvl > this.level) {
      for(let indx = this.level; indx < newLvl+1; indx++) {
        update[indx] = this.head;
      }
      this.level = newLvl;
    }
    let newForward = []; newForward.length = newLvl;
    let newNode = {key:key, value:value, forward: newForward, prev: currNode}
    update.splice(0, newLvl+1).forEach((element, index) => {
      newNode.forward[index] = element.forward[index];
      element.forward[index] = newNode;
    });
    // console.log('newNode ', newNode);
  }

  SkipList.prototype.delete = function(key) {

  }

  SkipList.prototype.head = function() {
    return this.head;
  }

  SkipList.prototype.tail = function() {

  }

  SkipList.prototype.size = function() {

  }

  if(typeof module === 'undefined') exports.SkipList = SkipList;
  else module.exports = SkipList;
 
})(this);

