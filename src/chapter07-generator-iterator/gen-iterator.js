/*
 *遍历generator的方法
 * 
 *for-of
 *
 *(...)
 * 
 *解构赋值
 *
 * Array.from
**/
"use strict";
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

[...numbers()]; 

Array.from(numbers())

let [x, y] = numbers();


for (let n of numbers()) {
  console.log(n);
}