# 基本语法

es6在es5基础上有很多的改变，有的改变是比较的大，例如增加新的类型或者语法，然而其他的改变的很少，在原来的基础上进行了改善。这一章包括这些不太引起人注意的改善，也许可能给你开发带来一些方便之处。

## 更好的支持 unicode

早在es6js是以16字符编译的。

## 是否包含字符串三种新方法

传统上，JavaScript只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

+ includes()：返回布尔值，表示是否找到了参数字符串。
+ startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
+ endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

## repeat()原字符串重复

repeat()返回一个新字符串，表示将原字符串重复n次。

```
var str = "x";
str.repeat(3) // "xxx"
 
var str1 = "hello";
str1.repeat(2) // "hellohello"
```

## 模板字符串

模板字符中，支持字符串插值：

```
let first = 'hubwiz';
let last = '汇智网';
document.write(`Hello ${first} ${last}!`);
// Hello hubwiz 汇智网!
```

模板字符串可以包含多行：

```
let multiLine = `
    This is
    a string
    with multiple
    lines`;
    document.write(multiLine);  

This is a string with multiple lines    

```    

## 标签模板

## String.raw()

模板字符串可以是原始的：

ES6还为原生的String对象，提供了一个raw方法。

若使用String.raw 作为模板字符串的前缀，则模板字符串可以是原始(raw)的。反斜线也不再是特殊字符，\n 也不会被解释成换行符：

```
  let raw = String.raw`Not a newline: \n`;
  document.write(raw === 'Not a newline: \\n'); // true
```

## 值是否无穷，NaN

ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法，用来检查Infinite和NaN这两个特殊值。

Number.isFinite()用来检查一个数值是否非无穷（infinity）。

```
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite("foo"); // false
Number.isFinite("15"); // false
Number.isFinite(true); // false
```

Number.isNaN()用来检查一个值是否为NaN。

```
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN("15"); // false
Number.isNaN(true); // false
```

## 值是否整数

Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。

## Math对象

Math.trunc()：去除一个数的小数部分，返回整数部分。

Math.sign()：判断一个数到底是正数、负数、还是零。

Math.cbrt：计算一个数的立方根。

Math.fround：返回一个数的单精度浮点数形式。

Math.hypot：返回所有参数的平方和的平方根。



