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
var message = "Hello!";
let age = 25;

// Each of these would throw an error given the previous declarations
const message = "Goodbye!";
const age = 30;
```

const变量类似let声明，块级声明。

























