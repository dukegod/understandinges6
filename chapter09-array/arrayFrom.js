'use strict';
var arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
console.log(arr1);


var arr11 = [].slice.call(1,2,3);
console.log(arr11);


// ES6的写法
//let arr2 = Array.from(); 
//console.log(arr2);

function list() {
  console.log(arguments);
  return Array.prototype.slice.call(arguments);
}

var arr3 = list(1,2,3,4);
console.log(arr3);
