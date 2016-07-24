/**
 * Created by hui on 16/4/26.
 */
"use strict";
function* fibo() {
  let a = 0
  let b = 1

  yield a
  yield b

  while (true) {
    let next = a + b
    a = b
    b = next
    yield next
  }
}

let generator = fibo()

for (var i = 0; i < 10; i++) {
  console.log(generator.next().value);
}

// 类型检测
console.log(fibo.constructor);
console.log(fibo.constructor.prototype);
console.log(generator.constructor);
console.log(generator.constructor.prototype);


function isGeneratorFunction(fn) {
  const genFn = (function*(){}).constructor;

  return fn instanceof genFn;
}

