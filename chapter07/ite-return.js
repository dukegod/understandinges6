'use strict';
function *createIterator() {
    yield 1;
    return;
    yield 2;
    yield 3;
}

let iterator = createIterator();

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

var ite = createIterator();
for(var k of ite ){
	console.log(k);
}
// 1

function *createIterator2(){
	yield 12;
	yield 123;
	yield 1234;
	return 12345;
}
let newite = createIterator2();
console.log(newite.next());
console.log(newite.next());
console.log(newite.next());
console.log(newite.next());
console.log(newite.next());

for(var kk of newite){
	console.log(kk);
}


