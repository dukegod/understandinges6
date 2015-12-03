# Symbols

w> 这一章是我在工作的时候写的，因此可能比其他的有更多的拼写或是内容上的错误

es6 symbol 用来创建私有对象成员，js开发者一直都想拥有的一个方法。创建一个并不是用string进行命名的。所有的用string类型的命名容易冲突无论你想多么晦涩的命名方法。

私有命名最终在es6中带来了symbol，用法和string类似

symbol 实际上是一种新的原始值，和 ‘string’‘number’‘booleans’‘null’‘undefined’一样。不同的是es6中symbol有一个字面量用来定义它，‘@@’

## 创建symbol

你可以用symbol函数创建

```js
var firstName = Symbol();
var person = {};

person[firstName] = "Nicholas";
console.log(person[firstName]);     // "Nicholas"
```

上面我们用firstName 作为person的对象，每次使用都是一个名字，保证其独一无二。

注意：Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。也就是说，由于Symbol值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

symbol 函数可以带一个描述性的文字，自身并没有用，但是可以方便调试与区分。

```js
var firstName = Symbol("first name");
var person = {};

person[firstName] = "Nicholas";

console.log("first name" in person);        // false
console.log(person[firstName]);             // "Nicholas"
console.log(firstName);                     // "Symbol(first name)"
```

可以显示转换为string类型。

有没有参数，symbol都是不相等的

```
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2 // false

// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");

s1 === s2 // false
```

## 查看symbol类型

可以用 typeof 查看 symbol 类型

```js
var symbol = Symbol("test symbol");
console.log(typeof symbol);         // "symbol"
```

##  使用 symbol

你可以使用一个变化的属性名字。你可以用方括号定义，你也可以用symbol定义对象属性通过‘Object.defineProperty()’,'Object.defineProperties()'

```js
var firstName = Symbol("first name");
var person = {
    [firstName]: "Nicholas"
};

// make the property read only
Object.defineProperty(person, firstName, { writable: false });

var lastName = Symbol("last name");

Object.defineProperties(person, {
    [lastName]: {
        value: "Zakas",
        writable: false
    }
});

console.log(person[firstName]);     // "Nicholas"
console.log(person[lastName]);      // "Zakas"
```

在对象中用symbol定义对象字面量的可变属性比较的方便。

## Sharing Symbols（共享的symbol）

你可以在不同的地方用相同的symbol。所以在es6中引入了全局的symbol注册供你使用。

共享symbo用‘symbol.for()’方法，并且可以传入一个参数，这个参数的描述也是用来方便区分，测试的。

```js
var uid = Symbol.for("uid");
var object = {};

object[uid] = "12345";

console.log(object[uid]);       // "12345"
console.log(uid);               // "Symbol(uid)"

var hh = {};
hh[uid] = 'lihui';
console.log(hh[uid]);         // lihui
```

原理： symbol.for（）先全局搜索‘uid’是不是存在，如果存在就返回存在的symbol，否则就注册一个全局的symbol，然后返回这个新注册的全局变量，也就是说后续的symbol.for()调用相同的key返回相同的symbol

```js
var uid = Symbol.for("uid");
var object = {
    [uid]: "12345"
};

console.log(object[uid]);       // "12345"
console.log(uid);               // "Symbol(uid)"

var uid2 = Symbol.for("uid");

console.log(uid === uid2);      // true
console.log(object[uid2]);      // "12345"
console.log(uid2);              // "Symbol(uid)"
```

‘uid’，‘uid2’ 包含相容的symbol因此可以交换调用。第一个调用symbol.for()创建一个全局的symbol，再一次调用就直接调用全局的symbol。

共享symbol独特的一点是可以通过symbol.keyfor() 方法获取相关symbol的key值。

```js
var uid = Symbol.for("uid");
console.log(Symbol.keyFor(uid));    // "uid"

var uid2 = Symbol.for("uid");
console.log(Symbol.keyFor(uid2));   // "uid"

var uid3 = Symbol("uid");
console.log(Symbol.keyFor(uid3));   // undefined
```

从上可以看出，uid与uid2 返回相同的key。 uid3 在全局中不存在，返回undefined。

注意： 全局symbol对象也就是全局变量。我们在命名的时候不能仅仅假设不存在环境中。应该在命名的时候仅仅减少可能命名冲突当用第三个插件的时候。例如： jQuery都用‘jquery’作为前缀如：‘jquery.element’

## 获取对象的symbol

和其他对象操作类似，通过Object.getOwnPropertySymbols() 方法获取

Object.getOwnPropertySymbols() 返回的值是symbol数组代表自己的属性。

```js
var uid = Symbol.for("uid");
var object = {
    [uid]: "12345"
};

var symbols = Object.getOwnPropertySymbols(object);

console.log(symbols.length);        // 1
console.log(symbols[0]);            // "Symbol(uid)"
console.log(object[symbols[0]]);    // "12345"
```

## symbol 强转化为 string

TODO

String(symbol) works but symbol + "" throws

## 常用的symbols

* `@@hasInstance` - a method used by `instanceof` to determine an object's inheritance.
* `@@isConcatSpreadable` - a Boolean value indicating if use with `Array.prototype.concat()` should flatten the collection's elements.
* `@@iterator` - a method that returns an iterator (see Chapter 7).
* `@@match` - a method used by `String.prototype.match()` to compare strings.
* `@@replace` - a method used by `String.prototype.replace()` to replace substrings.
* `@@search` - a method used by `String.prototype.search()` to locate substrings.
* `@@species` - the constructor from which derived objects are made.
* `@@split` - a method used by `String.prototype.split()` to split up strings.
* `@@toPrimitive` - a method that returns a primitive value representation of the object.
* `@@toStringTag` - a string used by `Object.prototype.toString()` to create an object description.
* `@@unscopeables` - an object whose properties are the names of object properties that should not be included in a `with` statement.

Some of the well-known symbols are discussed below while others are discussed throughout the book to keep them in the correct context.


### @@toStringTag

todo

### @@toPrimitive

todo





