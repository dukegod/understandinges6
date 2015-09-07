# 块级作用域

通常的来说，var 变量的定义域方式是js比较棘手的部分。在大多数以c语言为基础的语言，变量的先声明然后创建。然而，在js中，并不是这样的，var 变量的定义具有变量声明的提前（在函数的外部声明的变量就是全局变量），并不是在实际的定义域环境中，例如：

```js
function getValue(condition) {

    if (condition) {
        var value = "blue";

        // other code

        return value;
    } else {

        // value exists here with a value of undefined

        return null;
    }

    // value exists here with a value of undefined
}
```

如果你不熟悉js，你可能认为变量value只有当if的条件被验证为真的时候，变量才成立。实际上，value变量在解析的时候是这样的：

```js
function getValue(condition) {

    var value;

    if (condition) {
        value = "blue";

        // other code

        return value;
    } else {

        return null;
    }
}
```

变量value 当生成的时候已经声明提前了，也就是说，else 作用域中可以访问value变量，输出‘underfined’ 因为我们并没有初始化value变量导致的结果。

对于js新手，有的时候已经习惯了变量的声明提前，这个习惯的行为可能导致bugs出现。为了这个原因，es6引进了一个新的块级作用域，更有效的去控制变量的生命周期。

## let 声明

let声明的类似var的语法。 在需要定义变量并且需要变量仅仅在这个作用域中运用，你可以用let代替。例如：

```js
function getValue(condition) {

    if (condition) {
        let value = "blue";

        // other code

        return value;
    } else {

        // value doesn't exist here

        return null;
    }

    // value doesn't exist here
}
```

现在这个函数的定义更加接近于其他的语言了。用let定义代替var定义变量，即意味着变量声明没有提前了，当函数执行了if语句后，就会被销毁。如果if条件判断为错误，value变量永远不会被定义或是初始化。

由于let 声明不会导致变量的声明提前，在一个块级作用域中你可以用let去做声明。

在for循环中，估计开发者最适合用let定义，下面的语言是很常见的：

```js
for (var i=0; i < 10; i++) {
    process(items[i]);
}

// i is still accessible here
console.log(i);                     // 10
```

在其他的语言中上面的语法是理想中的（对于默认块级作用起），但是在js中当for循环结束后var仍然可以访问，因为var声明提前了。用let 可以让你得到想要的结果：

```js
for (let i=0; i < 10; i++) {
    process(items[i]);
}

// i is not accessible here - throws an error
console.log(i);
```
在上面的例子中，变量i 只存在for循环中，一旦循环结束，变量就会被销毁永远不会在访问到了。

## Constant 

另一种定义变量的方式用const 声明语法。常用来定义常量。所以用const定义的变量都是初始化的：

```js
// Valid constant
const maxItems = 30;

// Syntax error: missing initialization
const name;
```

const类似let 声明。

```js
if (condition) {
    const maxItems = 5;

    // more code
}

// maxItems isn't accessible here
```
在这段代码中，常量maxItems 在if语句中进行的定义，当if语句执行完毕了，变量随着销毁了。

不能进行重复定义变量，但是可以和var变量共存。

```js
var message = "Hello!";
let age = 25;

// Each of these would throw an error given the previous declarations
const message = "Goodbye!";
const age = 30;

//var , let  also throw an error 
var a = 90;
let a = 99;

```

const 定义的数值不可以改变它绑定的数值(指向的地址)，但是可以改变自身的数值。


```js
const person = {
    name: "Nicholas";
};

// works
person.name = "Greg";

// throws an error
person = {
    name: "Greg"
};

// 多加一个例子
const a = [];
a.push("Hello"); // 可执行
a.length = 0;    // 可执行
a = ["Dave"];    // 报错
```

此例子中，person变量创建了一个初始的对象属性。你可以改变person的name值，并不会抱错，那是因为你只是改变了person的内容，并没有改变person的绑定的值。如果你试图改变绑定的值，就会报错。在细节上，const在对象中使用容易让人误解。**注意，const阻止修改绑定，并不是绑定的数值。**

在一些浏览器中对于const声明，实际上定义常量仅仅在全局变量或者函数作用域中。正是因为这样，需要特别注意在开发中运用const，一但定义就不能改变，可能得不到你想要的数值。

 ## 暂时死亡区

 不像var声明变量，let const没有声明提前。变量只有先声明才能访问，否则就会报错：

 ```js
if (condition) {
    console.log(value);     // ReferenceError!
    let value = "blue";
}
```

在上面的代码中，let定义的value变量，因为前面有报错，那条语句不会被执行的。问题的关键点是value变量存在于一个被认为的“暂时死亡区”中。TDZ从没有明确的说明，但是经常用来形容没有变量声明提前的 let声明中。

当js引擎当前的块去搜索变量声明，将导致变量的提前（var）或者把声明放入TDZ（如：let，const）中。每一次试图访问TDZ中的变量导致运行出错。只有当变量从TDZ中移除方能访问。

同样的在相同的作用中，访问没有定义的变量也会报错：


```js
if (condition) {
    console.log(typeof value);     // ReferenceError!
    let value = "blue";
}
```

上文中报出类似之前的例子的错误。未定义不能访问变量。但是，你可以用 typeof 检测块级作用域外面的变量

```js
console.log(typeof value);     // "undefined"

if (condition) {
    let value = "blue";
}
```
变量value 并不在TDZ中，当我们去操作一个在块域之外的变量的时候，实际上它已经定义了。返回“underfined”是因为我们没有定义value绑定的值。额外说明下，函数内部可以定一个和块域外面的相同名字的变量

```js
let d = 'var';
(function(){
    let d = 'var';
    console.log('inner:' + d);
})()
console.log('out:'+ d);
```

 但是不能用let，var在同一个块级作用域定义同一个变量，否则报错

 ```js
var count = 30;

// Syntax error
let count = 40;
```

以上let 的特点，同样适用于const

## 在循环中应用

var变量在循环中已经带来了很多的问题了：


```js
var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push(function() { console.log(i); });
}

funcs.forEach(function(func) {
    func();     // outputs the number "10" ten times
});
```
将会在一行输出10个10。那是因为变量i 在每一个循环的条目中分享，在循环体中的创建的函数都指向相同的变量i。当一个循环执行完了，i为10就存在循环体中，所以每一个函数都输出10.

为了解决这个问题，开发者利用IIFES强制性的在每一个循环体中创建一个新的备份：

```js
var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)));
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
});
```
上面的例子中，i变量先传递给函数对象，创建一个自身对象并储存在value中。用函数作为循环条目，到达响应的效果。

## let 在循环中的定义

let声明简化了循环通过类似IIFE的方法。每一个循环体通过循环导致新的变量的生成，可以初始化value和之前的循环体同样的变量名。你可以得到你希望的结果了

```js
var funcs = [];

for (let i=0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
})
```

确实执行类型IIFE方式，但是运用let 更加的简洁。 let声明创建一个新的变量i，每一次通过循环体，在循环体中创建一个函数并且得到一个变量i的备份。每一个备份的i变量都有值，值就是每一次循环的循环次数。在 for－in 和 for－of 循环中也是这样的：


```js
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

for (let key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

这个例子中，类似for循环，每一次通过循环，一个新的key变量被创建，所以每一个函数都与自己的备份。结果每一个函数输出不一样的数值。

弄明白let声明在循环中的行为，在特定的环境中是很重要的。

## constant 声明 在循环中的运用

并没有明确的说明不能用const在循环体中进行声明，但是当你用的时候就会出翔不一样的结果。对于一个常见的for 循环，你可以用 const去初始化，但是会抛出异常：

```js
var funcs = [];

// throws an error after one iteration
for (const i=0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}
```

在这段代码中，i变量定义为常量。第一个词循环i为0，执行没有问题。但是当i++的时候，抛出异常，因为你打算改变常量的值。所以，如果你确定不去改变常量的数值，你可以用const初始化循环次数。

但是在for－in 和 for－of 循环中可以用，结果和let 一样。下面的并不会报错：

```js
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

// doesn't cause an error
for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});
```

但是实际在node环境下跑有问题的，据调查和编译环境有关系，代码没有问题。

全局块绑定

在全局范围中用let，const定义可能带来命名的冲突，因为全局对象都已经定义好了属性。在许多的js环境中，全局变量已经分配了全局属性，有些全局对象的属性明显没有定义的。

```js
let RegExp = "Hello!";          // ok
let undefined = "Hello!";       // throws error
```

用let，const定义全局变量是不推荐的。

## 期待最好的改变

虽然es6开始用于开发，但是需要了解相关的支持度，选择的应用。

## 总结

 js引入了let，const声明去定义变量。用他们声明你不用担心声明的提前，并且只在块级作用域中存在。这样js声明方式更像其他的语言了。变量在需要用的时候再去声明，可以预防一些没有必要的错误。正是由于这个原因没有声明变量你不能用 typeof 去检测类型。** 试图访问未声明的变量将导致报错，因为绑定的数据暂时存储在‘暂时死亡区()TDZ’ **。

 在许多的情况下，他们的用法类似‘var’，然而在循环中不一样。参考上文，三个定义变量各有不同之处。

 目前最好的结果方法就是，用const定义一些默认（不改变数值），用let 去定义哪些数值肯定改变的变量。






















































































    














































