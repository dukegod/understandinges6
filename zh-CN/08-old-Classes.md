# class

在js刚创建出来的时候，很多的人就被没有class所困扰。以后也是议论纷纷。

在es6中，我们还是最终增加了class

## es5 类class 结构

在探索 class 之前，我们应该了解class的机制。早起的es5中，没有class，最接近的方法就是通过创建一个构造函数然后给他的属性增添方法。这种方法被称作自定义类型；

```js
function PersonType(name) {
    this.name = name;
}

PersonType.prototype.sayName = function() {
    console.log(this.name);
};

let person = new PersonType("Nicholas");
person.sayName();   // outputs "Nicholas"

console.log(person instanceof PersonType);  // true
console.log(person instanceof Object);      // true
```

在这段代码中，‘原型类型’是一个构造函数并且有一个‘name’属性。‘sayName’方法绑定在属性上，所有的函数都可以访问到。 person对象是‘PersonType’的实例，也可以访问到。

## class 定义

和他的语言的类定义相似。

```
class PersonClass {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
}

let person = new PersonClass("Nicholas");
person.sayName();   // outputs "Nicholas"

console.log(person instanceof PersonClass);     // true
console.log(person instanceof Object);          // true

console.log(typeof PersonClass);                    // "function"
console.log(typeof PersonClass.prototype.sayName);  // "function"
```

定义属性直接用”constructor“方法名就可以了。 定义函数明也不需要关键字‘function’

## class 表达式

‘类表达式’可以作为变量表达式或者作为参数赋值给函数。

```js
// class expressions do not require identifiers after "class"
let PersonClass = class {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
};

let person = new PersonClass("Nicholas");
person.sayName();   // outputs "Nicholas"

console.log(person instanceof PersonClass);     // true
console.log(person instanceof Object);          // true

console.log(typeof PersonClass);                    // "function"
console.log(typeof PersonClass.prototype.sayName);  // "function"
```

### 为什么用class语法

除了class与 普通类型的相似外，有一些重要的不同点

1, class定义不像函数的定义，没有声明提前。class定义类似let定义并且存在暂时死亡区，直到去调用他们

2，在class定义中所有的代码都是在“严格模式”中执行的

3，所有的方法都是可数的

4，所有的方法缺少内部的构造函数将会报错，当你使用new调用的时候

5，必须使用new调用

6，class名字不能重写

把以上的东西都记住了，我们看一下如果不用class定义，上面的代码应该这么去写

```js
// direct equivalent of PersonClass
let PersonType2 = (function() {

    "use strict";

    const PersonType2 = function(name) {

        // make sure the function was called with new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }

        this.name = name;
    }

    Object.defineProperty(PersonType2.prototype, "sayName", {
        value: function() {

            // make sure the method wasn't called with new
            if (typeof new.target !== "undefined") {
                throw new Error("Method cannot be called with new.");
            }

            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });

    return PersonType2;
}());
```

## 类表达式定义

类定义与函数定义在“声明定义”与“表达式定义”是相似的。

### 基本用法

与之前的例子相似

```js
let PersonClass = class {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
};

let person = new PersonClass("Nicholas");
person.sayName();   // outputs "Nicholas"

console.log(person instanceof PersonClass);     // true
console.log(person instanceof Object);          // true

console.log(typeof PersonClass);                    // "function"
console.log(typeof PersonClass.prototype.sayName);  // "function"
```

表达式定义不需要在class后面加上标识，除了语法以外，表达式定义与声明式定义在功能上是一样的

### 命名类表达式

没有什么意义


```js
let PersonClass = class PersonClass2 {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
};

console.log(typeof PersonClass);        // "function"
console.log(typeof PersonClass2);       // "undefined"
```

### class作为参数

可以参数传递到函数中

```js
function createObject(classDef) {
    return new classDef();
}

let obj = createObject(class {

    sayHi() {
        console.log("Hi!");
    }
});

obj.sayHi();        // "Hi!"
```

在上面的例子中，“createObject（）”调用了一个匿名函数作为其参数。通过‘new’创建一个实例，并且返回这个实例。‘obj’储存这个返回的实例函数。

类表达式可以创建一个立即调用类的构造方法的单例模型。但是你必须通过“new”创建一个类表达式和圆括号。如：

```js
let person = new class {

    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }

}("Nicholas");

person.sayName();       // "Nicholas"
```

## 访问属性

尽管自己的属性应该创建在类的构造器中，类可以在属性上访问属性。
定义getter方法，可以用关键字‘get’后面加上空格，加上一个标识名。定义setter类似。

```js
class CustomHTMLElement {

    constructor(element) {
        this.element = element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html");
console.log("get" in descriptor);   // true
console.log("set" in descriptor);   // true
console.log(descriptor.enumerable); // false
```

## Computed Member Names

可以用变量定义方法与属性

```js
let methodName = "sayName";

class PersonClass {

    constructor(name) {
        this.name = name;
    }

    [methodName]() {
        console.log(this.name);
    }
};

let me = new PersonClass("Nicholas");
me.sayName();           // "Nicholas"
```

This version of `PersonClass` uses a variable to assign a name to a method inside its definition. The string `"sayName"` is assigned to the `methodName` variable, and then `methodName` is used to declare the method. The `sayName()` method is later accessed directly.

Accessor properties can use computed names in the same way, like this:

```js
let propertyName = "html";

class CustomHTMLElement {

    constructor(element) {
        this.element = element;
    }

    get [propertyName]() {
        return this.element.innerHTML;
    }

    set [propertyName](value) {
        this.element.innerHTML = value;
    }
}
```

## Generator Methods

```js
class MyClass {

    *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }

}

let instance = new MyClass();
let iterator = instance.createIterator();
```

可以通过iterator循环集合中的数据。

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

通过变化的name作为生成器的方法，委托‘value（）’循环器存储‘this.items’。通过‘for=of’循环输出

## 静态方法

在构造器增加额外的方法模拟静态成员是一个常见的模式在es5中。

```js
function PersonType(name) {
    this.name = name;
}

// static method
PersonType.create = function(name) {
    return new PersonType(name);
};

// instance method
PersonType.prototype.sayName = function() {
    console.log(this.name);
};

var person = PersonType.create("Nicholas");
```

在es6中，通过在方法或者属性前面加个一个’static‘作为标注进行定义静态成员

```js
class PersonClass {

    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }

    // equivalent of PersonType.create
    static create(name) {
        return new PersonClass(name);
    }
}

let person = PersonClass.create("Nicholas");
```

静态成员在实例中不能访问，你必须在类中直接访问。

## Inheritance with Derived Classes

在es6以前，接口的继承需要许多的过程。如：

```js
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};

function Square(length) {
    Rectangle.call(this, length, length);
}

Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        value:Square,
        enumerable: true,
        writable: true,
        configurable: true
    }
});

var square = new Square(3);

console.log(square.getArea());              // 9
console.log(square instanceof Square);      // true
console.log(square instanceof Rectangle);   // true
```
以前的继承，需要重写父类的方法。

通过“extends”关键字继承。属性自动的调整。你可以访问类中的构造函数通过“super”方法。

```js
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }
}

class Square extends Rectangle {
    constructor(length) {

        // same as Rectangle.call(this, length, length)
        super(length, length);
    }
}

var square = new Square(3);

console.log(square.getArea());              // 9
console.log(square instanceof Square);      // true
console.log(square instanceof Rectangle);   // true
```

以上通过‘extends’继承类，通过‘super’获取构造函数。

如果你想获取父类的构造器不通过super就会报错。但是如果你没有调取父类的构造器，默认的情况是子类将获取父类所有的构造器。


```js
class Square extends Rectangle {
    // no constructor
}

// Is equivalent to

class Square extends Rectangle {
    constructor(...args) {
        super(...args);
    }
}
```

** 使用‘super’的注意点：**

1，必须在派生类中使用，即通过extends继承的类中。否则将会报错

2. 在构造器中获取‘this’之前必须先调用super方法，由于‘super’负责调用最初的this

3， 只有一个方法可以避免调用‘super（）’即在构造器中返回这个对象

### Shadowing Class Methods

可以在子类中重写父类的方法

```js
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }

    // override and shadow Rectangle.prototype.getArea()
    getArea() {
        return this.length * this.length;
    }
}
```
也可以在子类中通过super重新调用父类的方法

```js
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }

    // override, shadow, and call Rectangle.prototype.getArea()
    getArea() {
        return super.getArea();
    }
}
```

### Inherited Static Members（继承静态成员）

如果基类有静态成员，那么这些静态成员也可以在派生类中获得。

```js
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }

    static create(length, width) {
        return new Rectangle(length, width);
    }
}

class Square extends Rectangle {
    constructor(length) {

        // same as Rectangle.call(this, length, length)
        super(length, length);
    }
}

var rect = Square.create(3, 4);

console.log(rect instanceof Rectangle);     // true
console.log(rect.getArea());                // 12
console.log(rect instanceof Square);        // false
```

### Derived Classes from Expressions

可以继承来自表达式的方法。这点很厉害。只要是这个表达式中含有`[[Construct]]`和属性；

```js
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}

var x = new Square(3);
console.log(x.getArea());               // 9
console.log(x instanceof Rectangle);    // true
```

还可以动态的决定继承哪一个对象

```js
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};

function getBase() {
    return Rectangle;
}

class Square extends getBase() {
    constructor(length) {
        super(length, length);
    }
}

var x = new Square(3);
console.log(x.getArea());               // 9
console.log(x instanceof Rectangle);    // true
```

既然你可以决定动态的基类，也可以创建不同的继承方法。创建一个有效的混合：

```js
let SerializableMixin = {
    serialize() {
        return JSON.stringify(this);
    }
};

let AreaMixin = {
    getArea() {
        return this.length * this.width;
    }
};

function mixin(...mixins) {
    var base = function() {};
    Object.assign(base.prototype, ...mixins);
    return base;
}

class Square extends mixin(AreaMixin, SerializableMixin) {
    constructor(length) {
        super();
        this.length = length;
        this.width = length;
    }
}

var x = new Square(3);
console.log(x.getArea());               // 9
console.log(x.serialize());             // "{"length":3,"width":3}"
```
通过这个混合方法，square拥有继承的所有的方法。

### Inheriting from Built-ins

继承内置的方法

### The Symbol.species Property

如果你继承原生方法，派生类也会继承原生方法的属性。

例如派生类‘MyArray’继承自‘Array’，Myarray也会拥有数组的slice（）方法。

```js
class MyArray extends Array {
    // empty
}

let items = new MyArray(1, 2, 3, 4),
    subitems = items.slice(1, 3);

console.log(items instanceof MyArray);      // true
console.log(subitems instanceof MyArray);   // true
```

因为`Symbol.species`属性的存在才可以这么实现

`Symbol.species`用来定义静态的存储属性的并且返回一个函数。 一下的拥有`Symbol.species`：

* `Array`
* `ArrayBuffer` (discussed in Chapter 10)
* `Map`
* `Promise`
* `RegExp`
* `Set`
* Typed Arrays (discussed in Chapter 10)

每一个类型都有一个默认的`Symbol.species`属性并且返回一个“this”，也就是说属性一直返回构造函数。如果一个普通的类想获得某一个接口的功能，代码可以这么去写：

```js
// several builtin types use species similar to this
class MyClass {
    static get [Symbol.species]() {
        return this;
    }

    constructor(value) {
        this.value = value;
    }

    clone() {
        return new this.constructor[Symbol.species](this.value);
    }
}
```
`Symbol.species`只有getter方法没有setter方法

```js
class MyClass {
    static get [Symbol.species]() {
        return this;
    }

    constructor(value) {
        this.value = value;
    }

    clone() {
        return new this.constructor[Symbol.species](this.value);
    }
}

class MyDerivedClass1 extends MyClass {
    // empty
}

class MyDerivedClass2 extends MyClass {
    static get [Symbol.species]() {
        return MyClass;
    }
}

let instance1 = new MyDerivedClass1("foo"),
    clone1 = instance1.clone(),
    instance2 = new MyDerivedClass2("bar"),
    clone2 = instance2.clone();

console.log(clone1 instanceof MyClass);             // true
console.log(clone1 instanceof MyDerivedClass1);     // true
console.log(clone2 instanceof MyClass);             // true
console.log(clone2 instanceof MyDerivedClass2);     // false
```

例如，‘array’通过`Symbol.species`指定类的方法并返回数组。这个类派生自‘Array’，你也可以自定义返回的对象类型：

```js
class MyArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}

let items = new MyArray(1, 2, 3, 4),
    subitems = items.slice(1, 3);

console.log(items instanceof MyArray);      // true
console.log(subitems instanceof Array);     // true
console.log(subitems instanceof MyArray);   // false
```

总体来说，你应该用‘Symbol.species’属性当你在一个类中想用‘this.constructor’。这么做可以很方便的重写返回的类型。

## Using new.target in Class Constructors

通过‘new.target’我们可以去跟踪哪一个类的constructor被调用。从而区别class的调用

例如，我们可以创建一个抽象类（不能被实例化）通过new.target：

```js
// abstract base class
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error("This class cannot be instantiated directly.")
        }
    }
}

class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}

var x = new Shape();                // throws error

var y = new Rectangle(3, 4);        // no error
console.log(y instanceof Shape);    // true
```

总之，es6中让继承变得简单

new 调用

基于类的继承可以让你继承来自其他的class，function，expression。混合继承多个class

new.target用来创建抽象类很好用












