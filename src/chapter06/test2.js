'use strict';

var firstName = Symbol("first name");
var person = {};

person[firstName] = "Nicholas";

console.log("first name" in person);        // false
console.log(person[firstName]);             // "Nicholas"
console.log(firstName);                     // "Symbol(first name)"

// 方便调试与区分

var s1 = Symbol('foo');
var s2 = Symbol('bar');

console.log(s1);
console.log(s2);
// Symbol(foo)
// Symbol(bar)

console.log(s1.toString());
console.log(s2.toString());
// "Symbol(foo)"
// "Symbol(bar)"


//  可以显示转换为string 类型
var sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'