'use strict';
// es 实现方法
// function pick(object) {
//     let result = Object.create(null);

//     for (let i = 1, len = arguments.length; i < len; i++) {
//         result[arguments[i]] = object[arguments[i]];
//     }

//     return result;
// }

// use rest  es6 实现方法
function pick(object,...keys){
	let result = {};

	for(let i= 0; i< keys.length; i++){
		result[keys[i]] = object[keys[i]]
	}
	return result;
}



let book = {
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    year: 2015
};

let bookData = pick(book, "author", "year");
console.log(bookData);

console.log(bookData.author);   // "Nicholas C. Zakas"
console.log(bookData.year);     // 2015



// 使用rest 实现数据相加运算
function add(...val){
	let sum = 0;
	for(var i of val){
		sum += i;
	}
	console.log(sum);
}
add(1,2,3,4)



