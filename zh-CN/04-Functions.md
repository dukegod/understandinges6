# 函数

函数一直都是编程语言的重要组成部分，js函数在引进以来一直都没有多大的改变。积累了很多的问题和一些细微的操作，可能带来很多的问题。

es6做出了很大的改变，让js更少的错误，提供更强大的功能。

## 函数参数默认值

在es5，设定默认值如下：
```js
function makeRequest(url, timeout, callback) {

    timeout = timeout || 2000;
    callback = callback || function() {};

    // the rest of the function

}
```

es6 提供函数默认值

```js
function makeRequest(url, timeout = 2000, callback = function() {}) {

    // the rest of the function

}
```

这样，你只需要定义第一个参数，其他的都有默认值，可以减少调用函数的代码量。

```js
// uses default timeout and callback
makeRequest("/foo");

// uses default callback
makeRequest("/foo", 500);

// doesn't use defaults
makeRequest("/foo", 500, function(body) {
    doSomething(body);
});
```
## rest 参数

以前我们都用arguments获取函数多余的函数，现在可以用rest获取了，这是一个用es5的例子

```js
function pick(object) {
    let result = Object.create(null);

    for (let i = 1, len = arguments.length; i < len; i++) {
        result[arguments[i]] = object[arguments[i]];
    }

    return result;
}

let book = {
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    year: 2015
};

let bookData = pick(book, "author", "year");

console.log(bookData.author);   // "Nicholas C. Zakas"
console.log(bookData.year);     // 2015
```

rest 实现的是把多余的参数放在一个数组

rest 参数最后禁止在加上参数

## 解构参数

在es5中，我们通常设定一些参数如：

```js
function setCookie(name, value, options) {

    options = options || {};

    var secure = options.secure,
        path = options.path,
        domain = options.domain,
        expires = options.expires;

    // ...
}

setCookie("type", "js", {
    secure: true,
    expires: 60000
});
```
现在我们可以这么做了

```
function setCookie(name, value, {secure,path,domain,expires}){
}

setCookie("type", "js", {
    secure: true,
    expires: 60000
});

setCookie("type", "js");
// 此时会报错，因为第三个参数没有赋值
setCookie("type", "js",{undefined,undefined,undefined,undefined});
```


## 扩展运算符

扩展运算符（spread）是三个点（...）,把数组转化为以逗号分割的单个数据

像是rest的逆运算，把数组一个一个的输出

```
conson.log(...[1,2,3])// 1,2,3
```
在math函数中的运用

es5

```
let val = [40,50,60];
console.log(Math.max.apply(Math,val));

//es6

console.log(Math.max(...val));
```

**数组的连接，有待验证??**

```
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

```

## name 属性

由于js多样的定义函数方式给确定函数的名字带来挑战。除此之外，匿名函数的允许使用，在调试的时候带来一些挑战，有可能带来内存的泄漏。因此，es6引入了name属性

```
function dd(){}
var ee = function(){}

console.log(dd.name);
console.log(ee.name)
```

函数表达式直接输出名字。对于匿名表达式，输出变量名

## new.target, [[Call]], and [[Construct]]

```
function Person(name) {
    if (typeof new.target === Person) {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

function AnotherPerson(name) {
    Person.call(this, name);
}

var person = new Person("Nicholas");
var anotherPerson = new AnotherPerson("Nicholas");  // error!
```

需要慢慢的更新............

## 块级函数

es3 或是以前，函数定义点块级中报错，但是浏览器却又开始不同的支持，所以导致各种问题。最好的用法就是在函数块级中用 函数表达式进行定义。

在es5中，严格模式下当函数在块级中声明的时候报错如：

```js
"use strict";

if (true) {

    // Throws a syntax error in ES5, not so in ES6
    function doSomething() {
        // ...
    }
}

```
在es5中，上面的会报错，但是在es6中，是允许的，并且调用这个块级区域。

```js
"use strict";

if (true) {

    console.log(typeof doSomething);        // "function"

    function doSomething() {
        // ...
    }

    doSomething();
}

console.log(typeof doSomething);            // "undefined"
```
块级函数声明提前，所以 typeof dosomething 返回‘function’ 。 一旦 if 块级执行完毕，doSometing() 不再存在了。

块级函数类似let 定义的函数，但是不同的是，let定义的函数不存在声明提前。

```js
"use strict";

if (true) {

    console.log(typeof doSomething);        // throws error

    let doSomething = function () {
        // ...
    }

    doSomething();
}

console.log(typeof doSomething);
```
因此直接报错了。

## 箭头函数

箭头函数不同于之前的函数的方式：

* this 绑定 - 绑定在定义的对象，不是使用时候的对象
* 不允许使用 new - 箭头函数没有构造函数方法，因此不可以使用new ，否则就会报错
* 不能改变this 的指向 - 函数的this指向数值不会改变，保持一个数值在整个函数的生命周期
* 没有arguments - 不能使用arguments， 需要时使用的时候用 **rest** 代替

不同在于，解决this带来的内存泄漏问题。

箭头函数也有 name 属性

## 语法 

只有一个参数的时候,直接执行了，即使没有return ，也会调取第一个参数，进行执行的。

```
var test = value => value;

//equivalent to 
var test = function(value){
	return value
}
```
当没有参数也需要圆括号

```js
var getName = () => "Nicholas";

// effectively equivalent to:

var getName = function() {
    return "Nicholas";
};
```

当有个多个参数的时候，需要圆括号包裹

```js
var sum = (num1, num2) => num1 + num2;

// effectively equivalent to:

var sum = function(num1, num2) {
    return num1 + num2;
};
```
当时空函数的时候，需要尖括号

```
var emptyfunc = () => {};

// 
var emptyfunc = function(){}
```

传入属性的时候

```
var test = id =>({id: id, name: 'dk'});
// equivalent to
var test = function(id){
	return {
		id: id,
		name : 'dk'
	};
};

```

### 立即执行函数(IIFES)

立即执行函数可以定义一个匿名函数，并且立即执行。

```
// 立即执行函数

 let person = function(name){

 	return {
 		getName(){
 			return name;
 		}
 	}

 }('duke');

 console.log(person.getName());

// 箭头函数执行

let per = ((name) => {

	return {
		getName() {
			return name;
		}
	};
})('duke2');
console.log(per.getName());

```
### this 绑定

this绑定问题，带来很多问题，如下：

```js
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", function(event) {
            this.doSomething(event.type);     // error
        }, false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```
执行报错，因为这个时候this 指向 document


es5 可以这样优化

```js
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", (function(event) {
            this.doSomething(event.type);     // no error
        }).bind(this), false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```

在箭头函数中，this的数值，一直在定义的对象中。

```js
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click",
                event => this.doSomething(event.type), false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```

箭头函数没有 构造属性，所以不能使用 new

由于箭头函数只绑定在此函数上，不能使用 apply(), call(), bind()


### arguments 绑定

没有arguments，需要用到的时候用 rest 代替

### 识别 arrow function

可以用 typeof 或是 instanceof 

```js
var comparator = (a, b) => a - b;

console.log(typeof comparator);                 // "function"
console.log(comparator instanceof Function);    // true
```

虽然箭头函数内部不能使用this，但是在外部，还是可以像其他的函数那样使用apply(),call(),bind()函数的，

```js
var sum = (num1, num2) => num1 + num2;

console.log(sum.call(null, 1, 2));      // 3
console.log(sum.apply(null, [1, 2]));   // 3

var boundSum = sum.bind(null, 1, 2);

console.log(boundSum());                // 3
```

## 总结

最大的改变就是增加了箭头函数