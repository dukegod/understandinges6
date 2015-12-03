'use strict';
var uid = Symbol.for("uid");
var object = {};

object[uid] = "12345";

console.log(object[uid]);       // "12345"
console.log(uid);               // "Symbol(uid)"

var hh = {};
hh[uid] = 'lihui';
console.log(hh[uid]);         // lihui


