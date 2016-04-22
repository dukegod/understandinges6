'use strict';
// var o = {

//     createIterator: function *(items) {
//         for (let i=0; i < items.length; i++) {
//             yield items[i];
//         }
//     }
// };

// let iterator = o.createIterator([1, 2, 3]);


// shorthand

var o = {

    *createIterator(items) {
        for (let i=0; i < items.length; i++) {
            yield items[i];
        }
    }
};

let iterator = o.createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"