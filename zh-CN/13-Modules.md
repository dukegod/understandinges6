# 模块化开发

js的调用方式一直是一个有争议的地方。其他的语言都有包去管理代码，在es6中每一个js文件都是在全局共享的。现代web发展的快速复杂化，这个弊端带来安全隐患。es6带来了块的概念。

## 模块是什么？

*模块*是js加载不同文件的方式。在语义上不同于script

1. Module code automatically runs in strict mode, and there's no way to opt-out of strict mode.
1. Variables created in the top level of a module aren't automatically added to the shared global scope. They exist only within the top-level scope of the module.
1. The value of `this` in the top level of a module is `undefined`.
1. Modules don't allow HTML-style comments within code (a leftover feature from JavaScript's early browser days).
1. Modules must export anything that should be available to code outside of the module.
1. Modules may import bindings from other modules.

These differences may seem small at first glance, but they represent a significant change in how JavaScript code is loaded and evaluated, which I will discuss over the course of this chapter. The real power of modules is the ability to export and import only bindings you need, rather than everything in a file. A good understanding of exporting and importing is fundamental to understanding how modules differ from scripts.

## 基本输出

你可以使用“export”关键字让其他的模块访问你的代码如：

```js
// export data
export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;

// export function
export function sum(num1, num2) {
    return num1 + num1;
}

// export class
export class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
}

// this function is private to the module
function subtract(num1, num2) {
    return num1 - num2;
}

// define a function...
function multiply(num1, num2) {
    return num1 * num2;
}

// ...and then export it later
export { multiply };
```

以上有几个注意点：第一，除了export关键字外，定义还是正常定义，每一个输出的函数或者类必须有一个名字。

如外，`multiply()`在定义的时候并没有定义。你没有必要每一次都输出一个定义，你可以输出一个指向函数。你可以注意到，我们没有输出`subtract()`函数，所以在模块之外我们不能访问其变量，函数或者class，他们仍然是这个模块私有的。

## 基础引入

一旦你输出一个模块，通过'import'关键字我们可以访问其功能。

```js
import { identifier1, identifier2 } from "./example.js";
```

大括号表示我们引入的模块的依赖，关键字‘from’表示我们我们引入的模块。模块通过不同的路径作为区别。浏览器可以通过‘script’元素，但是你必须包含一个文件路径。另一方面，在Node中通过文件系统的前缀区别引入。

I> 模块依赖列举类似对象结构，但是不是这样的

当引入一个模块依赖的时候，依赖的定义类似'const',你不能定义另一个变量用相同的名字了。

### 引入单一依赖

你可以引入单一依赖

```js
// import just one
import { sum } from "./example.js";

console.log(sum(1, 2));     // 3

sum = 1;        // error
```

即使“example.js”抛出了很多的功能，但是这个例子中我们只引入了‘sum’函数。如果你试着给sum赋值，会报错，以为我们不能修改引入的依赖。

W> 确保给文件加上`/`, `./`, or `../`前缀，更好的兼容浏览器和node环境

### 引入多个依赖

如果你想引入多个依赖，你可以象下面这样的方式去指定引入：

```js
// import multiple
import { sum, multiply, magicNumber } from "./example.js";
console.log(sum(1, magicNumber));   // 8
console.log(multiply(1, 2));        // 2
```

这三个函数就可以直接调用了。

### 引入所有的模块

有一个特殊的方式可以让你作为一个对象方式引入整个模块，这样所有的模块都作为一个对象的属性应用了。

```js
// import everything
import * as example from "./example.js";
console.log(example.sum(1,
        example.magicNumber));          // 8
console.log(example.multiply(1, 2));    // 2
```

上面的代码，我们把所有的依赖都作为example的属性，这样就可以正常的访问了。我们可以用example作为命名，因为在example.js中并没有存在。

请牢记，无论我们调用一个模块的“import”命令，这个模块只被加载一次。在引入的模块被执行了以后，模块的其他依赖都被放在内存中，当其他模块被调用时候重复利用。

```js
import { sum } from "./example.js";
import { multiply } from "./example.js";
import { magicNumber } from "./example.js";
```

即使有3个’import‘声明，但是’example.js‘只被执行了一次。

A> ### Module Syntax Limitations
A>
A> An important limitation of both `export` and `import` is that they must be used outside other statements and functions. For instance, this code will give a syntax error:
A>
A> ```js
A> if (flag) {
A>     export flag;    // syntax error
A> }
A> ```
A>The `export` statement is inside an `if` statement, which isn't allowed. Exports cannot be conditional or done dynamically in any way. One reason module syntax exists is to let the JavaScript engine staticly determine what will be exported. As such, you can only use `export` at the top-level of a module.
A>
A> Similarly, you can't use `import` inside of a statement; you can only use it at the top-level. That means this code also gives a syntax error:
A>
A> ```js
A> function tryImport() {
A>     import flag from "./example.js";    // syntax error
A> }
A> ```
A>
A> You can't dynamically import bindings for the same reason you can't dynamically export bindings. The `export` and `import` keywords are designed to be static so that tools like text editors can easily tell what information is available from a module.

### A Subtle Quirk of Imported Bindings

es6的’import‘声明创建的是只读的变量，函数，类。即使是引入的依赖也不能改变其值。

```js
export var name = "Nicholas";
export function setName(newName) {
    name = newName;
}
```

当你引入这两个依赖后，’setName‘函数可以改变’name‘的值。

```js
import { name, setName } from "./example.js";

console.log(name);       // "Nicholas"
setName("Greg");
console.log(name);       // "Greg"

name = "Nicholas";       // error
```

当我们调用`setName("Greg")`的时候，我们是跑到了’setName‘的源文件中然后执行了这个函数。然后自动更新引入的绑定’name‘值。因为我们在本地的这个’name‘只是一个标识。’name‘在本地和模块中的是不一样的。

## 重新命名Exports and Imports

有时候，你不想用被引入文件的变量名，函数名或者类名。你可以改变其名字

第一个方法，你可以通过’as‘抛出你想输出的函数的名字

```js
function sum(num1, num2) {
    return num1 + num2;
}

export { sum as add };
```

这样，其他模块想用，必须调用add方法

```js
import { add } from "./example.js";
```

如果模块引入一个函数，也可以用'as'修改为自己想用的名字

```js
import { add as sum } from "./example.js";
console.log(typeof add);            // "undefined"
console.log(sum(1, 2));             // 3
```
你可以调用sum函数，但是add不在有任何意义了。

## Default Values in Modules

The module syntax is really optimized for exporting and importing default values from modules, as this pattern was quite common in other module systems, like CommonJS (another specification for using JavaScript outside the browser). The *default value* for a module is a single variable, function, or class as specified by the `default` keyword, and you can only set one default export per module. Using the `default` keyword with multiple exports is a syntax error.

### Exporting Default Values

Here's a simple example that uses the `default` keyword:

```js
export default function(num1, num2) {
    return num1 + num2;
}
```

This module exports a function as its default value. The `default` keyword indicates that this is a default export. The function doesn't require a name because the module itself represents the function.

You can also specify an identifier as the default export by by placing it after `export default`, such as:

```js
function sum(num1, num2) {
    return num1 + num2;
}

export default sum;
```

Here, the `sum()` function is defined first and later exported as the default value of the module. You may want to choose this approach if the default value needs to be calculated.

A third way to specify an identifier as the default export is by using the renaming syntax as follows:

```js

function sum(num1, num2) {
    return num1 + num2;
}

export { sum as default };
```

The identifier `default` has special meaning in a renaming export and indicates a value should be the default for the module. Because `default` is a keyword in JavaScript, it can't be used for a variable, function, or class name (it can be used as a property name). So the use of `default` to rename an export is a special case to create a consistency with how non-default exports are defined. This syntax is useful if you want to use a single `export` statement to specify multiple exports, including the default, at once.

### Importing Default Values

You can import a default value from a module using the following syntax:

```js
// import the default
import sum from "./example.js";

console.log(sum(1, 2));     // 3
```

This import statement imports the default from the module `example.js`. Note that no curly braces are used, unlike you'd see in a non-default import. The local name `sum` is used to represent whatever default function the module exports. This syntax is the cleanest, and the creators of ECMAScript 6 expect it to be the dominant form of import on the Web, allowing you to use an already-existing object.

For modules that export both a default and one or more non-default bindings, you can import all exported bindings with one statement. For instance, suppose you have this module:

```js
export let color = "red";

export default function(num1, num2) {
    return num1 + num2;
}
```

You can import both `color` and the default function using the following `import` statement:

```js
import sum, { color } from "./example.js";

console.log(sum(1, 2));     // 3
console.log(color);         // "red"
```

The comma separates the default local name from the non-defaults, which are also surrounded by curly braces. Keep in mind that the default must come before the non-defaults in the `import` statement.

As with exporting defaults, you can import defauts with the renaming syntax, too:

```js
// equivalent to previous example
import { default as sum, color } from "example";

console.log(sum(1, 2));     // 3
console.log(color);         // "red"
```

In this code, the default export (`default`) is renamed to `sum` and the additional `color` export is also imported. This example is equivalent to the preceding example.

## Re-exporting a Binding

There may be a time when you'd like to re-export something that your module has imported (for instance, if you're creating a library out of several small modules). You can re-export an imported value with the patterns already discussed in this chapter as follows:

```js
import { sum } from "./example.js";
export { sum }
```

That works, but a single statement can also do the same thing:

```js
export { sum } from "./example.js";
```

This form of `export` looks into the specified module for the declaration of `sum` and then exports it. Of course, you can also choose to export a different name for the same value:

```js
export { sum as add } from "./example.js";
```

Here, `sum` is imported from `"./example.js"` and then exported as `add`.

If you'd like to export everything from another module, you can use the `*` pattern:

```js
export * from "./example.js";
```

By exporting everything, you're including the default as well as any named exports, which may affect what you can export from your module. For instance, if `example.js` has a default export, you'd be unable to define a new default export when using this syntax.

## Importing Without Bindings

Some modules may not export anything, and instead, only make modifications to objects in the global scope. Even though top-level variables, functions, and classes inside modules don't automatically end up in the global scope, that doesn't mean modules cannot access the global scope. The shared definitions of built-in objects such as `Array` and `Object` are accessible inside a module and changes to those objects will be reflected in other modules.

For instance, if you want to add a `pushAll()` method to all arrays, you might define a module like this:

```js
// module code without exports or imports
Array.prototype.pushAll = function(items) {

    // items must be an array
    if (!Array.isArray(items)) {
        throw new TypeError("Argument must be an array.");
    }

    // use built-in push() and spread operator
    return this.push(...items);
};
```

This is a valid module even though there are no exports or imports. This code can be used both as a module and a script. Since it doesn't export anything, you can use a simplified import to execute the module code without importing any bindings:

```js
import "./example.js";

let colors = ["red", "green", "blue"];
let items = [];

items.pushAll(colors);
```

This code imports and executes the module containing the `pushAll()` method, so `pushAll()` is added to the array prototype. That means `pushAll()` is now available for use on all arrays inside of this module.

I> Imports without bindings are most likely to be used to create polyfills and shims.

## Loading Modules

While ECMAScript 6 defines the syntax for modules, it doesn't define how to load them. This is part of the complexity of a specification that's supposed to be agnostic to implementation environments. Rather than trying to create a single specification that would work for all JavaScript environments, ECMAScript 6 specifies only the syntax and abstracts out the loading mechanism to an undefined internal operation called `HostResolveImportedModule`. Web browsers and Node.js are left to decide how to implement `HostResolveImportedModule` in a way that makes sense for their respective environments.

### Using Modules in Web Browsers

Even before ECMAScript 6, web browsers had multiple ways of including JavaScript in an web application. Those script loading options are:

1. Loading JavaScript code files using the `<script>` element with the `src` attribute specifying a location from which to load the code.
1. Embedding JavaScript code inline using the `<script>` element without the `src` attribute.
1. Loading JavaScript code files to execute as workers (such as a web worker or service worker).

In order to fully support modules, web browsers had to update each of these mechanisms. These details are defined in the HTML specification, and I'll summarize them in this section.

#### Using Modules With `<script>`

The default behavior of the `<script>` element is to load JavaScript files as scripts (not modules). This happens when the `type` attribute is missing or when the `type` attribute contains a JavaScript content type (such as `"text/javascript"`). The `<script>` element can then execute inline code or load the file specified in `src`. To support modules, the `"module"` value was added as a `type` option. Setting `type` to `"module"` tells the browser to load any inline code or code contained in the file specified by `src` as a module instead of a script. Here's a simple example:

```html
<!-- load a module JavaScript file -->
<script type="module" src="module.js"></script>

<!-- include a module inline -->
<script type="module">

import { sum } from "./example.js";

let result = sum(1, 2);

</script>
```

The first `<script>` element in this example loads an external module file using the `src` attribute. The only difference from loading a script is that `"module"` is given as the `type`. The second `<script>` element contains a module that is embedded directly in the web page. The variable `result` is not exposed globally because it exists only within the module (as defined by the `<script>` element) and is therefore not added to `window` as a property.

As you can see, including modules in web pages is fairly simple and similar to including scripts. However, there are some differences in how modules are loaded.

I> You may have noticed that `"module"` is not a content type like the `"text/javascript"` type. Module JavaScript files are served with the same content type as script JavaScript files, so it's not possible to differentiate solely based on content type. Also, browsers ignore `<script>` elements when the `type` is unrecognized, so browsers that don't support modules will automatically ignore the `<script type="module">` line, providing good backwards-compatibility.

#### Module Loading Sequence in Web Browsers

Modules are unique in that, unlike scripts, they may use `import` to specify that other files must be loaded to execute correctly. To support that functionality, `<script type="module">` always acts as if the `defer` attribute is applied.

The `defer` attribute is optional for loading script files but is always applied for loading module files. The module file begins downloading as soon as the HTML parser encounters `<script type="module">` with a `src` attribute but doesn't execute until after the document has been completely parsed. Modules are also executed in the order in which they appear in the HTML file. That means the first `<script type="module">` is always guaranteed to execute before the second, even if one module contains inline code instead of specifying `src`. For example:

```html
<!-- this will execute first -->
<script type="module" src="module1.js"></script>

<!-- this will execute second -->
<script type="module">
import { sum } from "./example.js";

let result = sum(1, 2);
</script>

<!-- this will execute third -->
<script type="module" src="module2.js"></script>
```

These three `<script>` elements execute in the order they are specified, so `module1.js` is guaranteed to execute before the inline module, and the inline module is guaranteed to execute before `module2.js`.

Each module may `import` from one or more other modules, which complicates matters. That's why modules are parsed completely first to identify all `import` statements. Each `import` statement then triggers a fetch (either from the network or from the cache), and no module is executed until all `import` resources have first been loaded and executed.

All modules, both those explicitly included using `<script type="module">` and those implicitly included using `import`, are loaded and executed in order. In the preceding example, the complete loading sequence is:

1. Download and parse `module1.js`.
1. Recursively download and parse `import` resources in `module1.js`.
1. Parse the inline module.
1. Recursively download and parse `import` resources in the inline module.
1. Download and parse `module2.js`.
1. Recursively download and parse `import` resources in `module2.js`

Once loading is complete, nothing is executed until after the document has been completely parsed. After document parsing completes, the following actions happen:

1. Recursively execute `import` resources for `module1.js`.
1. Execute `module1.js`.
1. Recursively execute `import` resources for the inline module.
1. Execute the inline module.
1. Recursively execute `import` resources for `module2.js`.
1. Execute `module2.js`.

Notice that the inline module acts like the other two modules except that the code doesn't have to be downloaded first. Otherwise, the sequence of loading `import` resources and executing modules is exactly the same.

I> The `defer` attribute is ignored on `<script type="module">` because it already behaves as if `defer` is applied.

#### Asynchronous Module Loading in Web Browsers

You may already be familiar with the `async` attribute on the `<script>` element. When used with scripts, `async` causes the script file to be executed as soon as the file is completely downloaded and parsed. The order of `async` scripts in the document doesn't affect the order in which the scripts are executed, though. The scripts are always executed as soon as they finish downloading without waiting for the containing document to finish parsing.

The `async` attribute can be applied to modules as well. Using `async` on `<script type="module">` causes the module to execute in a manner similar to a script. The only difference is that all `import` resources for the module are downloaded before the module itself is executed. That guarantees all resources the module needs to function will be downloaded before the module executes; you just can't guarantee *when* the module will execute. Consider the following code:

```html
<!-- no guarantee which one of these will execute first -->
<script type="module" async src="module1.js"></script>
<script type="module" async src="module2.js"></script>
```

In this example, there are two module files loaded asynchronously. It's not possible to tell which module will execute first simply by looking at this code. If `module1.js` finishes downloading first (including all of its `import` resources), then it will execute first. If `module2.js` finishes downloading first, then that module will execute first instead.

#### Loading Modules as Workers

Workers, such as web workers and service workers, execute JavaScript code outside of the web page context. Creating a new worker involves creating a new instance `Worker` (or another class) and passing in the location of JavaScript file. The default loading mechanism is to load files as scripts, like this:

```js
// load script.js as a script
let worker = new Worker("script.js");
```

To support loading modules, the developers of the HTML standard added a second argument to these constructors. The second argument is an object with a `type` property with a default value of `"script"`. You can set `type` to `"module"` in order to load module files:

```js
// load module.js as a module
let worker = new Worker("module.js", { type: "module" });
```

This example loads `module.js` as a module instead of a script by passing a second argument with `"module"` as the `type` property's value. (The `type` property is meant to mimic how the `type` attribute of `<script>` differentiates modules and scripts.) The second argument is supported for all worker types in the browser.

Worker modules are generally the same as worker scripts, but there are a couple of exceptions. First, worker scripts are limited to being loaded from the same origin as the web page in which they are referenced, but worker modules aren't quite as limited. Although worker modules have the same default restriction, they can also load files that have appropriate Cross-Origin Resource Sharing (CORS) headers to allow access. Second, while a worker script can use the `self.importScripts()` method to load additional scripts into the worker, `self.importScripts()` always fails on worker modules because you should use `import` instead.

### Browser Module Specifier Resolution

All of the examples to this point in the chapter have used a relative module specifier path such as `"./example.js"`. Browsers require module specifiers to be in one of the following formats:

* Begin with `/` to resolve from the root directory
* Begin with `./` to resolve from the current directory
* Begin with `../` to resolve from the parent directory
* URL format

For example, suppose you have a module file located at `https://www.example.com/modules/module.js` that contains the following code:

```js
// imports from https://www.example.com/modules/example1.js
import { first } from "./example1.js";

// imports from https://www.example.com/example2.js
import { second } from "../example2.js";

// imports from https://www.example.com/example3.js
import { third } from "/example3.js";

// imports from https://www2.example.com/example4.js
import { fourth } from "https://www2.example.com/example4.js";
```

Each of the module specifiers in this example is valid for use in a browser, including the complete URL in the final line (you'd need to be sure `ww2.example.com` has properly configured its Cross-Origin Resource Sharing (CORS) headers to allow cross-domain loading). These are the only module specifier formats that browsers can resolve by default (though the not-yet-complete module loader specification will provide ways to resolve other formats). That means some normal looking module specifiers are actually invalid in browsers and will result in an error, such as:

```js
// invalid - doesn't begin with /, ./, or ../
import { first } from "example.js";

// invalid - doesn't begin with /, ./, or ../
import { second } from "example/index.js";
```

Each of these module specifiers cannot be loaded by the browser. The two module specifiers are in an invalid format (missing the correct beginning characters) even though both will work when used as the value of `src` in a `<script>` tag. This is an intentional difference in behavior between `<script>` and `import`.


## Summary

ECMAScript 6 adds modules to the language as a way to package up and encapsulate functionality. Modules behave differently than scripts, as they don't modify the global scope with their top-level variables, functions, and classes, and `this` is `undefined`. To achieve that behavior, modules are loaded using a different mode.

You must export any functionality you'd like to make available to consumers of a module. Variables, functions, and classes can all be exported, and there is also one default export allowed per module. After exporting, another module can import all or some of the exported names. These names act as if defined by `let` and operate as block bindings that can't be redeclared in the same module.

Modules need not export anything if they are manipulating something in the global scope. You can actually import from such a module without introducing any bindings into the module scope.

Because modules must run in a different mode, browsers introduced `<script type="module">` to signal that the source file or inline code should be executed as a module. Module files loaded with `<script type="module">` are loaded as if the `defer` attribute is applied to them. Modules are also executed in the order in which they appear in the containing document once the document is fully parsed.
