/**
 * Created by hui on 16/5/19.
 */
'use strict';
var s = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
for (var i of s) {
  console.log(i);
}
;
console.log('output:' + s.size);
console.log(s.constructor);
console.log(Set);
console.log(Set.constructor);
console.log(s.constructor.prototype);
console.log(Set.prototype);

let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
  console.log(item);
}
// red  green  blue
for (let item of set.values()) {
  console.log(item);
}
// red  green  blue
for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]  ["green", "green"]  ["blue", "blue"]

set.forEach(function (value, key) {
  console.log(value);
}, this)