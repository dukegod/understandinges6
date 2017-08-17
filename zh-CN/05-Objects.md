#对象

es6 注重提升对象的实用性，js中处处是对象。除此之外，数据对象也在不断的使用，越来越多的对象，也让js更加变大的更强大。

es提高了对象的用法，更加简单的语法，交互更加方便。

## 对象类别

es6 特别引入了一些术语帮助区分对象类别。js有太多的垃圾术语，例如在浏览器中执行。对象类别:

**普通对象** 是拥有所有的默认对象

**外部对象** 内部的行为不同于默认对象

**标准对象** es6新增的，如:数组，时间等等。可以是普通对象，也可以是外部对象。

**内置对象** 在js在执行的时候生成的对象。所有的标准对象都是构造对象

## 对象字面量

js中很受欢迎的命名方式，以json显示，很简明。es6扩展了此方法。

### 属性初始化

在es5中，对象字面量，以键值对集合展现，那样你就需要一步复制。例如：

```js
function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}
```

现在我们都与键值对一样的，可以省略值了。

```js
function createPerson(name, age) {
    return {
        name,
        age
    };
}
```

### 方法的简介化

es5;

```js
var person = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};
```
es6,删除了function，直接用方法名字

```js
var person = {
    name: "Nicholas",
    sayName() {
        console.log(this.name);
    }
};
```

### 可算的属性名字

js可以用点号或者中括号去调用属性。

```js
var person = {},
    lastName = "last name";

person["first name"] = "Nicholas";
person[lastName] = "Zakas";

console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"
```

es5 字符字面量

```js
var person = {
    "first name": "Nicholas"
};

console.log(person["first name"]);      // "Nicholas"
```

es6，新增可算的属性名字在对象字面量中通过中括号，

```js
var lastName = "last name";

var person = {
    "first name": "Nicholas",
    [lastName]: "Zakas"
};

console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"
```

中括号的里面的属性可以计算：

```js
var suffix = " name";

var person = {
    ["first" + suffix]: "Nicholas",
    ["last" + suffix]: "Zakas"
};

console.log(person["first name"]);      // "Nicholas"
console.log(person["last name"]);       // "Zakas"
```

## Object.is()

判断类型是不是绝对相等

```js
console.log(+0 == -0);              // true
console.log(+0 === -0);             // true
console.log(Object.is(+0, -0));     // false

console.log(NaN == NaN);            // false
console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true

console.log(5 == 5);                // true
console.log(5 == "5");              // true
console.log(5 === 5);               // true
console.log(5 === "5");             // false
console.log(Object.is(5, 5));       // true
console.log(Object.is(5, "5"));     // false
```

## Object.assign()

混合式，既有方法又有属性。浅拷贝

```js
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });

    return receiver;
}
```

mixin()函数迭代自身的属性复制给ruceiver，不能继承方法就可 获得心的行为。


```js
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
};

var myObject = {};
mixin(myObject, EventTarget.prototype);

myObject.emit("somethingChanged");
```

## 允许字面量重复

es5 这样会报错

```js
var person = {
    name: "Nicholas",
    name: "Greg"        // syntax error in ES5 strict mode
};
```

es6 允许这样，最后一个有效

```js
var person = {
    name: "Nicholas",
    name: "Greg"        // not an error in ES6
};

console.log(person.name);       // "Greg"
```

## 改变原型

原型是js继承的基础。es5新增了'Object.getPrototypeOf()'取回对象的属性。es6新增了一个相反的操作'Object.setPrototypeOf()'允许你改变对象的属性。

'Object.setPrototypeOf()' 接受两个参数。

```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = Object.create(person);
console.log(friend.getGreeting());                      // "Hello"
console.log(Object.getPrototypeOf(friend) === person);  // true

// set prototype to dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting());                      // "Woof"
console.log(Object.getPrototypeOf(friend) === dog);     // true
```

实际上对象的属性储藏在内部的'[[Prototype]]'中，Object.getPrototypeOf()返回， `Object.setPrototypeOf()` 改变其罢了。其还有其他的操作。

甚至在es5之前，一些js工程师已经实现了一个普遍的属性‘_proto_’,用来get 和 set 对象的原型。不可思议的，‘_proto_’是 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 前身。

es6中，`Object.prototype.__proto__`作为一个访问属性，'get‘ 方法调用 `Object.getPrototypeOf()` ， `set` 调用`Object.setPrototypeOf()`.

```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = {
    __proto__: person
};
console.log(friend.getGreeting());                      // "Hello"
console.log(Object.getPrototypeOf(friend) === person);  // true
console.log(friend.__proto__ === person);               // true

// set prototype to dog
friend.__proto__ = dog;
console.log(friend.getGreeting());                      // "Woof"
console.log(friend.__proto__ === dog);                  // true
console.log(Object.getPrototypeOf(friend) === dog);     // true
```

和上一个实现一样的功能， 主张用字面量复制。 `Object.create()` or字面量 `__proto__` 主要的区别是：前者需要你指定属性的描述，后者就是一个字面量。

W> The `__proto__` property is special in a number of ways:

W> 1. 在字面量中只能定义一次。

## super

如果你想重载一个对象实例上。在es5中：

```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = {
    __proto__: person,
    getGreeting() {
        // same as this.__proto__.getGreeting.call(this)
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};

console.log(friend.getGreeting());                      // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === person);  // true
console.log(friend.__proto__ === person);               // true

// set prototype to dog
friend.__proto__ = dog;
console.log(friend.getGreeting());                      // "Woof, hi!"
console.log(friend.__proto__ === dog);                  // true
console.log(Object.getPrototypeOf(friend) === dog);     // true
```
通过调用相同的名字的属性的原型方法，`Object.getPrototypeOf()`方法得到原型，增加一个字符，通过 this 调用原型方法。

es6，引入了super 方法，指向目前对象的属性，类似“Object.getPrototypeOf(this)”，简化如：

```js
let friend = {
    __proto__: person,
    getGreeting() {
        // in the previous example, this is the same as:
        // 1. Object.getPrototypeOf(this).getGreeting.call(this)
        // 2. this.__proto__.getGreeting.call(this)
        return super.getGreeting() + ", hi!";
    }
};
```

多重继承，es5中实现


```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

// prototype is person
let friend = {
    __proto__: person,
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};

// prototype is friend
let relative = {
    __proto__: friend
};

console.log(person.getGreeting());                  // "Hello"
console.log(friend.getGreeting());                  // "Hello, hi!"
console.log(relative.getGreeting());                // error!
```

进一步的解释下，

```js
let relative = {
    __proto__: friend,
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};
```
relative.getGreeting() => Object.getPrototypeOf(this) 指向 friend.getGreeting.call(this)中 ‘this’ 指向 relative。并没有这个方法。所以报错。

es6

```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

// prototype is person
let friend = {
    __proto__: person,
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};

// prototype is friend
let relative = {
    __proto__: friend
};

console.log(person.getGreeting());                  // "Hello"
console.log(friend.getGreeting());                  // "Hello, hi!"
console.log(relative.getGreeting());                // "Hello, hi!"
```

super 方法总是指向正确的对象，无论多少继承都没有关系。不能用在其他的函数或是全局范围中。

### 方法

eECMAScript 6正式定义了一个方法作为一个功能，有一个内部`[[HomeObject]] `属性包含该对象的方法。

```js
let person = {

    // method
    getGreeting() {
        return "Hello";
    }
};

// not a method
function shareGreeting() {
    return "Hi!";
}
```

第一个对象中，拥有一个内部`[[HomeObject]] `属性，直接分配到对象上。 shareGreeting() 函数没有此属性，因为**当他创建的时候没有分配给他**。

super 用[[HomeObject]] 属性确定下一步做什么。第一步[[HomeObject]]调用“Object.getPrototypeOf()” 取出一个需要的属性名字，然后，搜索拥有相同属性名字的函数。最后，this绑定 和调用方法。如果函数没有[[HomeObject]]属性，不能执行。如：

```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

// prototype is person
let friend = {
    __proto__: person,
    getGreeting() {
        return super() + ", hi!";
    }
};

function getGlobalGreeting() {
    return super.getGreeting() + ", yo!";
}

console.log(friend.getGreeting());  // "Hello, hi!"

getGlobalGreeting();                      // throws error
```

## 总结

对象时js的核心。

字面量中，简洁化的属性定义，可变的属性名字，可重名的对象。

‘Object.assign()’让多个属性复制给一个对象

`Object.is()` 判断是不是绝对相等

`__proto__` property

super
