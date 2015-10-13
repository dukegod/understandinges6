// 立即执行.js
// 
// 可以解决，由于暂时的数据死亡区带来的问题，解决闭包问题
// 
// for (var i = 0; i < 5; i++) {
// 	setTimeout(function(){
// 		console.log('i:'+ i);
// 	}, 0);
// };

// let 
'use strict';
for(let k =0; k<5; k++){
	setTimeout(function(){
		console.log('k:'+k);
	}, 0);
}




