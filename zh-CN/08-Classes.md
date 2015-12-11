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

除了语法的不同外，类表达式与类声明是一样的，你还可以这么写

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

console.log(PersonClass === PersonClass2);  // true
```

这个例子中，`PersonClass` and `PersonClass2`都指向一个类，所以可以交换使用。

类表达式还可以这么用

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

## Accessor Properties



## 继承

通过 extend 

super 继承父类方法，创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this


