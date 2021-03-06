// for in 
// for-in是为普通对象设计的，你可以遍历得到字符串类型的键，因此不适用于数组遍历
// for-of 

var arr = ['aa','bb','cc','dd','ee','abcdefghijklmnopqrstuvwxyz'];

// for loop
for(var j = 0, length2 = arr.length; j < length2; j++){
	console.log('arr['+j+']'+':'+arr[j]);
}

// forEach
arr.forEach(function(value){
	console.log('value'+value);
});

// for-in
for(var index in arr){
	console.log('arr[index]'+arr[index]);
}

// 在这段代码中，赋给index的值不是实际的数字，而是字符串“0”、“1”、“2”，此时很可能在无意之间进行字符串算数计算，例如：“2” + 1 == “21”，这给编码过程带来极大的不便。

// 作用于数组的for-in循环体除了遍历数组元素外，还会遍历自定义属性。举个例子，如果你的数组中有一个可枚举属性myArray.name，循环将额外执行一次，遍历到名为“name”的索引。就连数组原型链上的属性都能被访问到。

// 最让人震惊的是，在某些情况下，这段代码可能按照随机顺序遍历数组元素。

// 简而言之，for-in是为普通对象设计的，你可以遍历得到字符串类型的键，因此不适用于数组遍历。


// for-of 

for(var k of arr){
	if(k == 'ee'){
		console.log('aa"""""'+k);
		break;
	}
	console.log(k);
}

