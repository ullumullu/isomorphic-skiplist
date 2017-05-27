const SkipList = require('../index');

console.log('Preparing...');
let amount = 1000000;
let testArray = [];
for(let indx = 0; indx < amount; indx++) {
  testArray.push(Math.round(Math.random()*amount * (Math.random() > 0.5 ? 1 : -1)));
}

console.log('Start simple skiplist bench...');
let start = Date.now();
let testList = new SkipList();
for(let indx = 0; indx < amount; indx++) {
  testList.insert(testArray[indx], testArray[indx]); 
}
let end = Date.now();
console.log('End simple skiplist bench...');
console.log(`Time: ${end-start}(ms)` );

console.log('Start simple array bench...');
start = Date.now();
let sortArray = [];
for(let indx = 0; indx < amount; indx++) {
  sortArray.push(testArray[indx]); 
}
sortArray.sort();
end = Date.now();
console.log('End simple array bench...');
console.log(`Time: ${end-start}(ms)` );

console.log('Start find skiplist bench...');
start = Date.now();
testList.find(testArray[100]);
end = Date.now();
console.log('End find skiplist bench...');
console.log(`Time: ${end-start}(ms)` );

console.log('Start find array bench...');
start = Date.now();
sortArray[sortArray.indexOf(testArray[100])];
end = Date.now();
console.log('End find array bench...');
console.log(`Time: ${end-start}(ms)` );
