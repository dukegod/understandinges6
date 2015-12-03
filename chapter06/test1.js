'use strict';
var firstName = Symbol();
var person = {};

person[firstName] = "Nicholas";
console.log(person[firstName]);     // "Nicholas"
console.log(typeof firstName);
console.log(firstName);
