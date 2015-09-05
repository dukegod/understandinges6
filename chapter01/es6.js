
// traditional syx
// for (var i = 0; i < 5; i++) {
// 	console.log('inner'+i);
// };
// console.log('outline'+i);
// es6 
'use strict';
for (let i = 0; i < 5; i++) {
	console.log('inner'+i);
};
console.log('outline'+i);// referenceError 

