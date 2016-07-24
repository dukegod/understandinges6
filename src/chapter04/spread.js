'use strict';

console.log(1,...[2,3,4,5],6);//1,2,3,4,5,6

// es5 method
let val = [40,50,60];
console.log(Math.max.apply(Math,val));
console.log(Math.max.apply(null,val));

// es6 
console.log(Math.max(...val));

// 转化 string
var str = 'helloworld';
console.log('str:' + [...str]);

// 数组转化为 函数的参数 
function f(x,y,z){
	console.log(x+y+z);
}
var arr = [1,2,3];
// es5 
f.apply(this,arr);
//es6 
f(...arr);


// 数组的连接
var brr = [1,2];
var crr = [3,4,5];
//es5 
var drr = Array.prototype.push.apply(brr,crr); // 此时得到的是变量的数值
console.log(typeof drr);

var ddrr = brr.concat(crr)
console.log(ddrr);
ddrr.forEach(function(dii){console.log(dii);})

//es6 
var err = brr.push(...crr); // 得到的也是数值




