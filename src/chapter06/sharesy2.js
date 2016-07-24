'use strict';
var uid = Symbol.for("uid");
var object = {
    [uid]: "12345"
};
console.log(object[uid]);       // "12345"
console.log(uid);               // "Symbol(uid)"



var uid2 = Symbol.for("uid");
console.log(uid === uid2);      // true
console.log(object[uid2]);      // "12345"
console.log(uid2);              // "Symbol(uid)

