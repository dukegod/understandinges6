# 解构

js开发者在获取对象和数组中数据中花费了大量的时间，下面的代码不是经常看到的现象：

```js
var options = {
        repeat: true,
        save: false
    };

// later

var localRepeat = options.repeat,
    localSave = options.save;
```

对象的属性经常储存在本地的变量中，这样代码更加的简明和容易获取。es6通过*** 赋值解构 **更方便的通过系统自动的检索对象和数组，把特定的数据储存在本地变量中。

## 对象解构

对象解构赋值语法使用对象字面量被赋值的变量在左边，例如：

```js
var options = {
        repeat: true,
        save: false
    };

// later

var { repeat: localRepeat, save: localSave } = options;

console.log(localRepeat);       // true
console.log(localSave);         // false
```

在上面的代码中，都用的对象字面量，key是属性，value是储存属性值的变量。


你也可以直接使用属性的名字，如果你没有必要使用不同的变量名字。例如：

```js
var options = {
        repeat: true,
        save: false
    };

// later

var { repeat, save } = options;

console.log(repeat);        // true
console.log(save);          // false
```

解构也可以用在对象嵌套中：

```js
var options = {
        repeat: true,
        save: false,
        rules: {
            custom: 10,
        }
    };

// later

var { repeat, save, rules: { custom }} = options;

console.log(repeat);        // true
console.log(save);          // false
console.log(custom);        // 10
```

## 数组解构

数组解构类似对象解构，也是用字面量定义

```js
var colors = [ "red", "green", "blue" ];

// later

var [ firstColor, secondColor ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

数据结构也可以用来嵌套

```js
var colors = [ "red", [ "green", "lightgreen" ], "blue" ];

// later

var [ firstColor, [ secondColor ] ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

混合嵌套

```js
var options = {
        repeat: true,
        save: false,
        colors: [ "red", "green", "blue" ]
    };

var { repeat, save, colors: [ firstColor, secondColor ]} = options;

console.log(repeat);            // true
console.log(save);              // false
console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

当然你可以获取整个数组

```js
var options = {
        repeat: true,
        save: false,
        colors: [ "red", "green", "blue" ]
    };

var { repeat, save, colors } = options;

console.log(repeat);                        // true
console.log(save);                          // false
console.log(colors);                        // "red,green,blue"
console.log(colors === options.colors);     // true
```
上面的事例中，我们取回"options.colors"并且把它储存在"colors"变量中，我们可以注意到** colors直接指向“options.colors”，并不是复制 **

混合的解构方式比较适合获取json中的数据，并不会影响整个解构。

## 总结

解构可以方便的在对象和数组中获取数据，通过字面量定义数据。


个人总结：

但是在实际中，node的开发环境中支持的不是很好。

可以在 Google中的traceur 作为转换器中执行

```js
// mix destructuring 

var mix = {
	name: 'lh',
	age: 18,
	hobby: ['football','basketball','dota'],
	time: {
		am: 'work',
		pm: 'playing'
	}
}
var {name, age, hobby:[foot], time:{am}} = mix;
console.log(name);
console.log(age);
// console.log(hobby);
console.log(am);
console.log(foot);
// console.log(n);
```

注意点： 对象的key值在解构的时候保持不变。但是数组可以进行重命名操作。

```js 
var {name1, age1, hobby:[foot,foot2], time:{am，pm}} = mix;

```

name1, age1 获取的数值为“underfine”， foot,foot2可以获取数值
















