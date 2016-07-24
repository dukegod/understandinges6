"use strict";
let colors1 = [ "red", "green", "blue" ];
let tracking1 = new Set([1234, 5678, 9012]);
let data1 = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

for (let entry of colors.entries()) {
    console.log(entry);
}

for (let entry of tracking.entries()) {
    console.log(entry);
}

for (let entry of data.entries()) {
    console.log(entry);
}

let colors2 = [ "red", "green", "blue" ];
let tracking2 = new Set([1234, 5678, 9012]);
let data2 = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

for (let value of colors.values()) {
    console.log(value);
}

for (let value of tracking.values()) {
    console.log(value);
}

for (let value of data.values()) {
    console.log(value);
}
let colors3 = [ "red", "green", "blue" ];
let tracking3 = new Set([1234, 5678, 9012]);
let data3 = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

for (let key of colors.keys()) {
    console.log(key);
}

for (let key of tracking.keys()) {
    console.log(key);
}

for (let key of data.keys()) {
    console.log(key);
}
let colors4 = [ "red", "green", "blue" ];
let tracking4 = new Set([1234, 5678, 9012]);
let data4 = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

// same as using colors.values()
for (let value of colors) {
    console.log(value);
}

// same as using tracking.values()
for (let num of tracking) {
    console.log(num);
}

// same as using data.entries()
for (let entry of data) {
    console.log(entry);
}