'use strict';
class MyClass {
    *createIterator(items) {
        for (let i=0; i < items.length; i++) {
            yield items[i];
        }
    }
}

let o = new MyClass();
let iterator = o.createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
