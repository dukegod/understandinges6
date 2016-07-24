'use strict';

function add(x= 1, y=4){
	console.log(x+y);
}
add(); //5 调用所有的函数默认值

add(2,2); //4  用自己的设定值



function add2(x2= 4,y2){
	console.log(x2+y2);
}
add2(undefined,4);// 8 undefined就是取默认值：4

add2(null,4);// 4 null表示没有数据（可以当作0）


var i = 8;
function add3(x, y=x){
	console.log('add3:'+x+':'+y);
}
add3(3)
// 参数默认值所处的作用域，不是全局作用域，而是函数作用域。
// x , y 不能在用let， const 再一次定义了，因为已经声明了


