# 迭代器与生成器

迭代器作为被许多语言用来处理数据集合。在es中也赋予其重要的角色了。配合新的数组方法和数据集合，迭代器能够有效的处理数据。

## 迭代器是什么？

迭代器不仅仅是对象的特定的接口，接口包括'next()'方法用来返回结果。对象结果包涵两个属性：'value',next的数值。‘done’返回个Boolean值，当返回的是'true'的时候表示没有数据已经遍历完全。迭代器通过一个内部的指针数据的地址，通过调用‘next()’返回数值。

当'next'返回value:undefined,done:true;表示遍历完全。

我们可以用es5去实现迭代器

```js
function createIterator(items) {

    var i = 0;

    return {
        next: function() {

            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };

        }
    };
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// for all further calls
console.log(iterator.next());           // "{ value: undefined, done: true }"
```

我们创建了一个类似‘next()’方法，每次调用，都会返回value,done

## 生成器

你可以觉得迭代器看上去很有趣，但是更像一连串的工作。实际上，创建一个粘连性很好的迭代器有点小难，所以es6中又提供了生成器。**‘生成器’**是一个特殊的函数，用来返回迭代器。生成器中的‘yield’关键字用来指定'next()'返回的数值。如果你想输出不同的数值，连续调用'next()'方法。

```js
// generator
function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
}

// generators are called like regular functions but return an iterator
let iterator = createIterator();

for (let i of iterator) {
    console.log(i);
}
```

This code outputs the following:

```
1
2
3
```

我们创建一个生成器，和其他的函数一样的调用，通过生成器模板返回一个对象。返回的数据是一个对象，遵循迭代器模型。

可以最有趣的部分是，生成器中的'yield'语句只执行一次直到你去调用下一个'next()'。这样的话，你可以中断一个函数的执行。

yield 关键字可以是 数值或是 表达式：

```js
function *createIterator(items) {
    for (let i=0; i < items.length; i++) {
        yield items[i];
    }
}

let iterator = createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// for all further calls
console.log(iterator.next());           // "{ value: undefined, done: true }"
```
通过for循环生成每一个条目。每一次‘next’调用，‘yield’记录一次。

生成器在es6是一个重要的部分，可以在许多的方面进行执行。

### 生成器函数表达式

生成器可以用函数表达式用函数声明的方式进行创建，通过‘*’在function与关键字之间。

```js
let createIterator = function *(items) {
    for (let i=0; i < items.length; i++) {
        yield items[i];
    }
};

let iterator = createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// for all further calls
console.log(iterator.next());           // "{ value: undefined, done: true }"
```

### 生成器对象方法

因为生成器也是函数，因此也可以作为对象的属性

```js
var o = {

    createIterator: function *(items) {
        for (let i=0; i < items.length; i++) {
            yield items[i];
        }
    }
};

let iterator = o.createIterator([1, 2, 3]);
```

你也可以简化成下面：

```js
var o = {

    *createIterator(items) {
        for (let i=0; i < items.length; i++) {
            yield items[i];
        }
    }
};

let iterator = o.createIterator([1, 2, 3]);
```

这个只是语法上不同

### 生成器的class 方法

类似对象方法，你可以直接在class中使用

```
class MyClass {

    *createIterator(items) {
        for (let i=0; i < items.length; i++) {
            yield items[i];
        }
    }

}

let o = new MyClass();
let iterator = o.createIterator([1, 2, 3]);
```
语法类似对象字面量方法。

## Iterables and for-of

#### for-of, for-in , forEach, for loop 遍历之间的区别

##### for循环，最早，也是最方便理解的

##### forEach() es5中函数用来遍历数组方法 

这段代码看起来更加简洁，但这种方法也有一个小缺陷：你不能使用break语句中断循环，也不能使用return语句返回到外层函数。

##### for-in 

缺点：

+ 作用于数组的for-in循环体除了遍历数组元素外，还会遍历自定义属性。
+ 最让人震惊的是，在某些情况下，这段代码可能按照随机顺序遍历数组元素。
+ 简而言之，**for-in是为普通对象设计的**，你可以遍历得到字符串类型的键，因此不适用于数组遍历。

##### for-of 

+ 这是最简洁、最直接的遍历数组元素的语法
+ 这个方法避开了for-in循环的所有缺陷
+ 与forEach()不同的是，它可以正确响应break、continue和return语句

对迭代器的概念密切相关的是一个。
一个是一个对象，有一个默认的迭代器指定使用@@iterator的象征。
更具体地说，@@iterator包含一个函数，该函数返回给定的对象的一个迭代器。
所有的集合对象，包括数组、集合、和地图，以及字符串是可迭代对象等都有一个默认的迭代器指定。可迭代对象是用来对ECMAScript新的循环。

for-of 循环类似其他的循环，循环自身可以调用'next()'方法，当‘done’的属性返回是true的时候，自动退出。

```js
let values = [1, 2, 3];

for (let i of values) {
    console.log(i);
}
```

This code outputs the following:

```
1
2
3
```

### 使用默认的迭代器

你可以使用默认的迭代器`Symbol.iterator`

```js
let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```

我们可以通过下面的方法检测 iterator类型

```js
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}

console.log(isIterable([1, 2, 3]));     // true
console.log(isIterable("Hello"));       // true
console.log(isIterable(new Map()));     // true
console.log(isIterable(new Set()));     // true
```

‘isIterable()‘函数仅仅用来检测默认的迭代器是否存在与对象上，并且是一个函数类型。

### 创建迭代器

默认的对象定义不是迭代的，但是你可以通过应用'@@iterator' symbol设定；

```js
let collection = {
    items: [],
    *[Symbol.iterator]() {
        yield *this.items.values();
    }

};

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
    console.log(x);
}

// Output:
// 1
// 2
// 3
```

通过应用对象字面量和变量属性’symbol.iterator‘定义一个’collection‘变量。

你也可以用class 定义不用对象字面量定义：

```js
class Collection {

    constructor() {
        this.items = [];
    }

    *[Symbol.iterator]() {
        yield *this.items.values();
    }
}

var collection = new Collection();
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
    console.log(x);
}

// Output:
// 1
// 2
// 3
```

默认的迭代器可以添加到任何的对象上通过生成器’symbol.iterator‘。无论改属性是私有的还是原型属性，因为’for-of‘可以查找正常的原型链。

## 内置迭代器

es6已经内置了迭代器，当内置的不能满足你的需求的时候，你可以自己去创建。

* ’entries()‘ 返回值为 键值对
* 'values()' 返回值为 集合的值
* 'keys()' 返回值为 key关键字

’entries‘实际上返回一个二元数组，一个是key，一个是value。 对于数组，第一个返回值为索引号。 对于sets集合，第一个也是value（由于value也作为key在set中）。


```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

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
```

This example outputs the following:

```
[0, "red"]
[1, "green"]
[2, "blue"]
[1234, 1234]
[5678, 5678]
[9012, 9012]
["title", "Understanding ECMAScript 6"]
["format", "ebook"]
```

The `values()` iterator 仅仅返回集合的value如:

```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

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
```

This example outputs the following:

```
"red"
"green"
"blue"
1234
5678
9012
"Understanding ECMAScript 6"
"ebook"
```

正如这样，用‘value是（）’返回一个确切的数值通过‘next()’函数

‘keys()’ 返回每一个key值，对于数组key就是数字；对于set类型，key与value返回值是一样的

```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

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
```

This example outputs the following:

```
0
1
2
1234
5678
9012
"title"
"format"
```

特别的，每一个集合都有默认的iterator，但是‘for-of’并没有特别的指定哪一个类型。数组和sets默认的是‘value’，而map默认是‘entries’。因此用‘for-in’循环对象集合有点不同

```js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

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
```

This example outputs the following:

```
"red"
"green"
"blue"
1234
5678
9012
["title", "Understanding ECMAScript 6"]
["format", "ebook"]
``` 

### 字符 iterator

在es5中，用方括号与‘length’属性，检测字符，输出有误

```js
var message = "A 𠮷 B";

for (let i=0; i < message.length; i++) {
    console.log(message[i]);
}
```

This code outputs the following:

```
A
(blank)
(blank)
(blank)
(blank)
B
```

由于双字节的字符被当做连个代码单元，因此在A,B之间存在4个空格。

用‘for-of’循环得到满意的结果

```js
var message = "A 𠮷 B";

for (let c of message) {
    console.log(c);
}
```

This code outputs the following:

```
A
(blank)
𠮷
(blank)
B
```

### 节点iterator (待验证)

在dom中，在文档中‘Nodelist’类型代表元素集合。对象节点与数组的区分比较麻烦。

随着es6中增加了默认迭代器，DOM中‘NOdelist’现在包括默认iterator与数组的操作类似。你可以用‘for-of’获取对象的默认‘Nodelist’

```js
var divs = document.getElementsByTagName("div");

for (let div of divs) {
    console.log(div.id);
}
```

## 高级功能

iterator有一些高级功能

### 给iterator赋值（todo）

### Throwing Errors in Iterators

### Generator Return Statements 

可以用‘return’语句终止一个函数的运行。

```js
function *createIterator() {
    yield 1;
    return;
    yield 2;
    yield 3;
}

let iterator = createIterator();

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```

你也可以指定一个最终的返回值：

```js
function *createIterator() {
    yield 1;
    return 42;
}

let iterator = createIterator();

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 42, done: true }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
```

**注意点** return 返回的值，在‘for-of’中不进行返回

```
function *createIterator2(){
    yield 12;
    yield 123;
    yield 1234;
    return 12345;
}
let newite = createIterator2();

for(var kk of newite){
    console.log(kk);
}

输出的值，没有12345

12
123
1234

```

### Delegating Generators

### Asynchronous Task Scheduling

## Summary


# [类型检测](http://zhuanlan.zhihu.com/p/20794401)





