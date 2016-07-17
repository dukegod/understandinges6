# Promises and Asynchronous Programming

js最重要的一环就是简单的处理了异步调用编程，作为一门为了web而生的语言,js应该对了点击或者按键异步操作有更好的处理机制，Node通过回调机制更好的处理异步编程，随着越来越多的程序开始异步操作,事件和回调不在有效的处理开发者的需求了.Promises 应运而生。

promise是另一个选择对于异步编程。

为了更好的理解promise工作机制，我们需要了解一些更加基础的内容。

## 异步编程的背景

js是一门单线程事件循环。JavaScript引擎在同一时间只能执行一段代码，所以他们需要跟踪代码是运行。该代码保存在一个作业队列中。每当一个代码准备好被执行时，它就被添加到作业队列中。当JavaScript引擎执行完代码，事件循环队列中的下一步工作的执行。事件循环是一个过程，在JavaScript引擎监视代码执行和管理作业队列。记住，作为一个队列，作业执行从队列中的第一个作业运行到最后一个。

### 事件模型

当用户点击一个按钮或按下键盘上的一个键，就会触发一样的onclick事件。该事件可能通过添加新的作业到作业队列的回交互作出响应。这是JavaScript的最异步编程的基本形式。事件处理程序代码不执行，直到事件触发，并且当它运行，它将拥有适当的上下文，如：

```js
let button = document.getElementById("my-btn");
button.onclick = function(event) {
    console.log("Clicked");
};
```

事件的工作以及简单的互动，但将多个独立的异步调用起来更加复杂，因为你必须追踪活动目标（`按钮`在前面的例子中）每个事件。此外，您需要确保所有适当的事件处理程序在第一次发生事件之前被添加。例如，如果`按钮被点击`之前` onclick `分配，什么也不会发生。因此，虽然事件是有用的响应用户的交互和类似的罕见的功能，他们不是很灵活的更复杂的需求。

## 回调模式

当Node.js创建，它先进的异步编程模型的推广规划回调模式。回调模式类似于事件模型，因为异步代码不执行，直到下一个节点就绪。这是不同的，因为调用的函数是作为一个参数传递的，如下：

```js
readFile("example.txt", function(err, contents) {
    if (err) {
        throw err;
    }

    console.log(contents);
});
console.log("Hi!");
```

下面的例子使用了传统的Node.js *error-first* 误差回调风格的readfil()函数的目的是从磁盘上的文件中读取（指定为第一个参数），然后执行回调（二）完成时。如果有一个错误，“Err”的回调参数是一个错误对象，否则，“内容”参数包含作为一个字符串的文件内容。

使用回调模式，` readfile() `开始执行立即暂停启动时从硬盘读取。这意味着“控制台”日志（“嗨！”）`输出后立即` readfile() `称，之前`控制台日志（内容）`打印任何东西。当` readfile() `饰面，它增加了一个新的工作，用回调函数及其参数的任务队列的结束。那份工作是在完成所有其他工作之前完成的。

回调模式是比事件更灵活,因为通过回调的链式调用方便，例如:

```js
readFile("example.txt", function(err, contents) {
    if (err) {
        throw err;
    }

    writeFile("example.txt", function(err) {
        if (err) {
            throw err;
        }

        console.log("File was written!");
    });
});
```

在这段代码中，以` readfile() `结果在另一个异步调用一个成功，这一次的` writefile() `功能。请注意，在这两个函数中都存在相同的检查“Err”的基本模式。当` readfile() `是完整的，它增加了一个工作任务队列，结果` writefile() `被称为（假设没有错误）。然后，` writefile() `添加一项任务到任务队列完成时。

回调是没有问题的，*callback hell*，例如：

```js
method1(function(err, result) {

    if (err) {
        throw err;
    }

    method2(function(err, result) {

        if (err) {
            throw err;
        }

        method3(function(err, result) {

            if (err) {
                throw err;
            }

            method4(function(err, result) {

                if (err) {
                    throw err;
                }

                method5(result);
            });

        });

    });

});
```

嵌套多个方法调用，这个例子确实创建一个复杂的代码网，这是很难理解和调试。回调还存在的问题时，你想实现更复杂的功能。如果你想要两个异步操作并行运行，并通知你，当他们都完成了什么？如果你想在一个时间启动两个异步操作，但只采取第一个完成的结果是什么？

在这些情况下，你需要跟踪多个回调和清理操作，并promises大大改善这种情况。

## Promise 基础

promise是异步调用的替代者，而订阅一个事件或传递一个回调函数，该函数可以返回一个promise，这样：

```js
// readFile promises to complete at some point in the future
let promise = readFile("example.txt");
```

在这段代码中，` readfile() `实际上并没有开始阅读文件，将发生后立即。相反，函数返回一个代表异步读操作的promise对象，所以你可以在未来与它一起工作。确切地说，当你将能够与这个结果完全取决于如何promise的生命周期发挥了。

### promise 生命周期

每一个promise生命周期都以“pending”开始，代表异步操作没有执行完成。一旦执行完成，出现以下两种状态：

1. *Fulfilled*: 执行成功
1. *Rejected*: 未成功

`[[PromiseState]]`的三个属性`"pending"`, `"fulfilled"`, or `"rejected"`代表promise不同的属性。此属性不暴露在Promise的对象，所以你不能确定哪个国家的Promise是在编程。但你可以采取具体行动的Promise改变状态时用` then() `方法。

` then() `方法是目前所有的promise接受两个参数。第一个参数是当promise完成时调用的函数。与异步操作有关的任何附加数据都传递给此实现函数。第二个参数是一个函数调用时的promise被拒绝。类似于实现函数，拒绝函数传递任何与拒绝有关的附加数据。

I> Any object that implements the `then()` method in this way is called a *thenable*. All promises are thenables, but all thenables are not promises.

Both arguments to `then()` are optional, so you can listen for any combination of fulfillment and rejection. For example, consider this set of `then()` calls:

```js
let promise = readFile("example.txt");

promise.then(function(contents) {
    // fulfillment
    console.log(contents);
}, function(err) {
    // rejection
    console.error(err.message);
});

promise.then(function(contents) {
    // fulfillment
    console.log(contents);
});

promise.then(null, function(err) {
    // rejection
    console.error(err.message);
});
```

All three `then()` calls operate on the same promise. The first call listens for both fulfillment and rejection. The second only listens for fulfillment; errors won't be reported. The third just listens for rejection and doesn't report success.

Promises also have a `catch()` method that behaves the same as `then()` when only a rejection handler is passed. For example, the following `catch()` and `then()` calls are functionally equivalent:

Promises也有catch()方法表现一样then()只有拒绝处理是通过。例如，下面的catch()和then()通话功能等效：

```js
promise.catch(function(err) {
    // rejection
    console.error(err.message);
});

// is the same as:

promise.then(null, function(err) {
    // rejection
    console.error(err.message);
});
```

在` then() `和` catch() `的意图是要结合使用它们来妥善处理异步操作的结果。这个系统比事件和回调因为它使操作是否成功或失败完全清楚。（事件发生中断时有一个错误，并在回调你必须记住检查错误论点。）只知道，如果你不重视拒绝处理一个promise，所有的失败会默默存在。总是附加一个拒绝处理程序，即使处理程序只是记录故障。

一个实现或拒绝处理程序仍然会被执行，即使它被添加到工作队列之后的promise已经解决。这可以让你在任何时候添加新的实现和拒绝处理程序，并保证它们将被调用。例如:

```js
let promise = readFile("example.txt");

// original fulfillment handler
promise.then(function(contents) {
    console.log(contents);

    // now add another
    promise.then(function(contents) {
        console.log(contents);
    });
});
```

在此代码中，完成处理程序将另一个实现处理程序添加到相同的Promise。该Promise已经在这一点上完成了，所以新的完成处理程序将被添加到作业队列中，并在准备就绪时调用。拒绝处理程序的工作方式相同。

I> Each call to `then()` or `catch()` creates a new job to be executed when the promise is resolved. But these jobs end up in a separate job queue that is reserved strictly for promises. The precise details of this second job queue aren't important for understanding how to use promises so long as you understand how job queues work in general.

### 创建Promise

使用“Promise”构造函数创建了新的Promise。此构造函数接受一个单一的参数：一个称为“执行”*的函数，它包含了初始化Promise的代码。执行器是通过两个函数命名` resolve() `和` reject() `作为参数。的` resolve() `函数在执行成功的信号，Promise可以解决完，而` reject() `函数表明，执行失败。

下面是一个在node环境下实现的读取文件的函数方法：

```js
// Node.js example

let fs = require("fs");

function readFile(filename) {
    return new Promise(function(resolve, reject) {

        // trigger the asynchronous operation
        fs.readFile(filename, { encoding: "utf8" }, function(err, contents) {

            // check for errors
            if (err) {
                reject(err);
                return;
            }

            // the read succeeded
            resolve(contents);

        });
    });
}

let promise = readFile("example.txt");

// listen for both fulfillment and rejection
promise.then(function(contents) {
    // fulfillment
    console.log(contents);
}, function(err) {
    // rejection
    console.error(err.message);
});
```

在这个例子中，node js ` fs.readfile() `异步调用是包裹在一个Promise。遗嘱执行人可以通过错误对象的` reject() `函数或传递文件内容的` resolve() `功能。

记住，executor立即执行运行当` readfile() `被调用的时候。无论` resolve() `或` reject() `被调用，工作是添加到作业队列解决promise。这就是所谓的任务调度，如果你曾经使用过的` settimeout() `或` setinterval() `功能，那么你已经熟悉了它。在作业调度，你添加一个新的工作任务队列说，“不执行这个现在，但执行它。”例如，在` settimeout() `功能允许您指定在作业添加到队列延迟：

```js
// add this function to the job queue after 500ms have passed
setTimeout(function() {
    console.log("Timeout");
}, 500)

console.log("Hi!");
```

500ms后才加入到工作队列中,输出如下:

```
Hi!
Timeout
```

多亏了500ms的延迟,传入到`setTimeout()`中的参数在`console.log("Hi!")` 执行后被调用输出.

Promises工作的原理类似,Promises执行器是所有的之前代码中立即执行.例如:

```js
let promise = new Promise(function(resolve, reject) {
    console.log("Promise");
    resolve();
});

console.log("Hi!");
```

输出:

```
Promise
Hi!
```

`resolve()`也调用异步操作, 传入到 `then()` 与 `catch()` 的函数是异步执行的,因为他们也要添加到工作队列,例如

```js
let promise = new Promise(function(resolve, reject) {
    console.log("Promise");
    resolve();
});

promise.then(function() {
    console.log("Resolved.");
});

console.log("Hi!");
```

The output for this example is:

```
Promise
Hi!
Resolved
```

Note that even though the call to `then()` appears before the `console.log("Hi!")` line, it doesn't actually execute until later (unlike the executor). That's because fulfillment and rejection handlers are always added to the end of the job queue after the executor has completed.

即使`console.log("Hi!")`在‘then()’以后，实际上并不是后这行的（不像立即执行器）。因为完成或者拒绝方法总是在执行器完成了以后才会执行。

### 创建完成的Promises

`Promise`构造函数是用来动态的创建未解决的`Promise`。如果用来代表一个已知的`Promise`是没有多大意义的。相反，有两个方法可以创建特定的值。

#### Using Promise.resolve()

`Promise.resolve()`方法接受一个特定的参数用来返回完成的状态。并没有任务调度出现，你需要添加一个或更多完成方法取回数值。如：

```js
let promise = Promise.resolve(42);

promise.then(function(value) {
    console.log(value);         // 42
});
```

我们创建一个完成的promise方法取回42，如果你创建一个拒绝的promise，这个方法将永远不会被调用。

#### Using Promise.reject()

你可以用Promise.reject()创界一个拒绝的promise。类似上面resolve方法

```js
let promise = Promise.reject(42);

promise.catch(function(value) {
    console.log(value);         // 42
});
```

Any additional rejection handlers added to this promise would be called, but not fulfillment handlers.

I> If you pass a promise to either the `Promise.resolve()` or `Promise.reject()` methods, the promise is returned without modification.

#### Non-Promise Thenables

`Promise.resolve()` and `Promise.reject()`可以接受 non-promise thenables的参数。

A non-promise thenable is created when an object has a `then()` method that accepts a `resolve` and a `reject` argument, like this:

```js
let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
```

The `thenable` object in this example has no characteristics associated with a promise other than the `then()` method. You can call `Promise.resolve()` to convert `thenable` into a fulfilled promise:

```js
let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);     // 42
});
```

In this example, `Promise.resolve()` calls `thenable.then()` so that a promise state can be determined. The promise state for `thenable` is fulfilled because `resolve(42)` is called inside the `then()` method. A new promise called `p1` is created in the fulfilled state with the value passed from `thenable` (that is, 42), and the fulfillment handler for `p1` receives 42 as the value.

The same process can be used with `Promise.reject()` to create a rejected promise from a thenable:

```js
let thenable = {
    then: function(resolve, reject) {
        reject(42);
    }
};

let p1 = Promise.reject(thenable);
p1.catch(function(value) {
    console.log(value);     // 42
});
```

This example is similar to the last except that `Promise.reject()` is used on `thenable`. When `thenable.then()` executes, a new promise is created in the rejected state with a value of 42. That value is then passed to the rejection handler for `p1`.

`Promise.resolve()` and `Promise.reject()` work like this to allow you to easily work with non-promise thenables. A lot of libraries used thenables prior to promises being introduced in ECMAScript 6, so the ability to convert thenables into formal promises is important for backwards-compatibility with previously existing libraries. When you're unsure if an object is a promise, passing the object through `Promise.resolve()` or `Promise.reject()` (depending on your anticipated result) is the best way to find out because promises just pass through unchanged.

### Executor Errors

如果在执行器中出现错误，Promise的rejection将会被调用如：

```js
let promise = new Promise(function(resolve, reject) {
    throw new Error("Explosion!");
});

promise.catch(function(error) {
    console.log(error.message);     // "Explosion!"
});
```

在每一个执行器中都有一个“try-catch”，用来捕获错误信息，并传递到rejection中。等价于：

```js
let promise = new Promise(function(resolve, reject) {
    try {
        throw new Error("Explosion!");
    } catch (ex) {
        reject(ex);
    }
});

promise.catch(function(error) {
    console.log(error.message);     // "Explosion!"
});
```

执行程序句柄捕获任何引发的错误，以简化常见的情况，但在执行程序引发的错误时，拒绝处理程序存在只报告。否则，被抑制的误差。这在使用承诺成为开发商的一个问题早就和JavaScript环境通过捕捉rejected promises提供挂钩解决。

## Global Promise Rejection Handling

其中有一个争议点就是promise的错误捕获问题。错误信息并不是立即就被处理，而是在以后被then()或者catch（）处理。

```js
let rejected = Promise.reject(42);

// at this point, rejected is unhandled

// some time later...
rejected.catch(function(value) {
    // now rejected has been handled
    console.log(value);
});
```

ECMAscript已经捕获了这个开发者痛点，以后应该会解决。

### Node.js Rejection Handling

在node中，有两个事件监听 “promise”的拒绝处理过程：

* `unhandledRejection`: 当一个失败发生了，并且在一个事件循环中没有相关的处理事件时候触发这个方法
* `rejectionHandled`: 在一个拒接中产生，有相关的处理是触发。

这些方法都是用来检测没有被处理的promise拒绝状态的。

`unhandledRejection`把拒绝的原因和promise类型作为参数传递过去。

```js
let rejected;

process.on("unhandledRejection", function(reason, promise) {
    console.log(reason.message);            // "Explosion!"
    console.log(rejected === promise);      // true
});

rejected = Promise.reject(new Error("Explosion!"));
```
错误信息和promise都将被处理

`rejectionHandled`事件方法只传递一个方法。

```js
let rejected;

process.on("rejectionHandled", function(promise) {
    console.log(rejected === promise);              // true
});

rejected = Promise.reject(new Error("Explosion!"));

// wait to add the rejection handler
setTimeout(function() {
    rejected.catch(function(value) {
        console.log(value.message);     // "Explosion!"
    });
}, 1000);
```

`rejectionHandled`事件会被触发当拒绝处理最终被调用。如果直接把事件写在“rejected”被创建之后，事件将不会被触发。

为了更好地捕捉没有处理的拒绝。两个结合使用。

```js
let possiblyUnhandledRejections = new Map();

// when a rejection is unhandled, add it to the map
process.on("unhandledRejection", function(reason, promise) {
    possiblyUnhandledRejections.set(promise, reason);
});

process.on("rejectionHandled", function(promise) {
    possiblyUnhandledRejections.delete(promise);
});

setInterval(function() {

    possiblyUnhandledRejections.forEach(function(reason, promise) {
        console.log(reason.message ? reason.message : reason);

        // do something to handle these rejections
        handleRejection(promise, reason);
    });

    possiblyUnhandledRejections.clear();

}, 60000);
```

上面是一个简单的捕获处理拒绝的方法：通过map收集拒绝类型，每一个promise就是一个key，错误类型就是一个value。每一次“unhandledRejection”被触发，这个promise将会添加到map中。每一次“rejectionHandled”被触发，相关的处理的promise会被移除。通过“setInterval()”方法，周期的检测所有的未处理类型。

然而上面的例子是针对node环境的，浏览器实习了一个类似的处理机制

### Browser Rejection Handling

浏览器同样有两个方法检测未处理的rejection，与Node类似。

* `unhandledrejection`: 在一个事件循环中处理
* `rejectionhandled`: 在一个事件结束后处理

然后Node完成传递一个参数给事件方法，浏览器通过以下的属性接受事件类型：

* `type`: The name of the event (`"unhandledrejection"` or `"rejectionhandled"`).
* `promise`: The promise object that was rejected.
* `reason`: The rejection value from the promise.

不同的是，在浏览器实现了拒绝的原因都是可以被事件处理的。

```js
let rejected;

window.onunhandledrejection = function(event) {
    console.log(event.type);                    // "unhandledrejection"
    console.log(event.reason.message);          // "Explosion!"
    console.log(rejected === event.promise);    // true
});

window.onrejectionhandled = function(event) {
    console.log(event.type);                    // "rejectionhandled"
    console.log(event.reason.message);          // "Explosion!"
    console.log(rejected === event.promise);    // true
});

rejected = Promise.reject(new Error("Explosion!"));
```

This code assigns both event handlers using the DOM Level 0 notation of `onunhandledrejection` and `onrejectionhandled`. (You can also use `addEventListener("unhandledrejection")` and `addEventListener("rejectionhandled")` if you prefer.) Each event handler receives an event object containing information about the rejected promise. The `type`, `promise`, and `reason` properties are all available in both event handlers.

The code to keep track of unhandled rejections in the browser is very similar to the code for Node.js, too:

```js
let possiblyUnhandledRejections = new Map();

// when a rejection is unhandled, add it to the map
window.onunhandledrejection = function(event) {
    possiblyUnhandledRejections.set(event.promise, event.reason);
};

window.onrejectionhandled = function(event) {
    possiblyUnhandledRejections.delete(event.promise);
};

setInterval(function() {

    possiblyUnhandledRejections.forEach(function(reason, promise) {
        console.log(reason.message ? reason.message : reason);

        // do something to handle these rejections
        handleRejection(promise, reason);
    });

    possiblyUnhandledRejections.clear();

}, 60000);
```

也是通过周期性检测与收集去处理未处理的rejection

## Chaining Promises

在这节中，我们可以结合使用callback与“setTimeout()”函数使promise更加的强大。更确切的说，有很多的异步方法实现promise。

每一次调用“then()”或者“catch()”实际上创建了另一个promise对象。第二个promise对象只有在第一个promise被处理后才会被处理。

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

p1.then(function(value) {
    console.log(value);
}).then(function() {
    console.log("Finished");
});
```

The code outputs:

```
42
Finished
```
下面的方法不用链式调用实现的

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = p1.then(function(value) {
    console.log(value);
})

p2.then(function() {
    console.log("Finished");
});
```

In this unchained version of the code, the result of `p1.then()` is stored in `p2`, and then `p2.then()` is called to add the final fulfillment handler. As you might have guessed, the call to `p2.then()` also returns a promise. This example just doesn't use that promise.

### Catching Errors

Promise chaining 收集上一个promise中出现的成功或者拒绝的相关信息：

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

p1.then(function(value) {
    throw new Error("Boom!");
}).catch(function(error) {
    console.log(error.message);     // "Boom!"
});
```

收集完成后的promise信息

```js
let p1 = new Promise(function(resolve, reject) {
    throw new Error("Explosion!");
});

p1.catch(function(error) {
    console.log(error.message);     // "Explosion!"
    throw new Error("Boom!");
}).catch(function(error) {
    console.log(error.message);     // "Boom!"
});
```

收集p1拒绝后的信息

I> 总是在最后用一个拒绝处理的方法，以免有相关的遗漏。

### Returning Values in Promise Chains

你还可以通过promise传递特定的值到下一个promise

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

p1.then(function(value) {
    console.log(value);         // "42"
    return value + 1;
}).then(function(value) {
    console.log(value);         // "43"
});
```
value值将在不同的promise中传递

拒绝的promise中，value值也可以相互传递

```js
let p1 = new Promise(function(resolve, reject) {
    reject(42);
});

p1.catch(function(value) {
    // first fulfillment handler
    console.log(value);         // "42"
    return value + 1;
}).then(function(value) {
    // second fulfillment handler
    console.log(value);         // "43"
});
```
拒绝的value可以被下一个promise成功接收，在fulfillment与rejection中传递

### Returning Promises in Promise Chains

方法最初的value在完成与拒绝之间传递。如果你传递的是一个promise，需要额外的步骤决定他进行的程序。

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});

p1.then(function(value) {
    // first fulfillment handler
    console.log(value);     // 42
    return p2;
}).then(function(value) {
    // second fulfillment handler
    console.log(value);     // 43
});
```

以上，“p1”调度一个任务处理了42。'p1'的完成状态返回’p2',一个promise已经一个完成状态。第一个fulfillment处理将会被调用。如果'p2'被拒绝了，第二个fulfillment将不会被调用。

重要是要认识到一个问题是，第二个fulfillment没有添加到'p2'中，二是第三个promise。第二个完成状态绑定到第三个promise。

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});

let p3 = p1.then(function(value) {
    // first fulfillment handler
    console.log(value);     // 42
    return p2;
});

p3.then(function(value) {
    // second fulfillment handler
    console.log(value);     // 43
});
```

Here, it's clear that the second fulfillment handler is attached to `p3` rather than `p2`. This is a subtle but important distinction, as the second fulfillment handler will not be called if `p2` is rejected. For instance:

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
    reject(43);
});

p1.then(function(value) {
    // first fulfillment handler
    console.log(value);     // 42
    return p2;
}).then(function(value) {
    // second fulfillment handler
    console.log(value);     // never called
});
```

In this example, the second fulfillment handler is never called because `p2` is rejected. You could, however, attach a rejection handler instead:

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
    reject(43);
});

p1.then(function(value) {
    // first fulfillment handler
    console.log(value);     // 42
    return p2;
}).catch(function(value) {
    // rejection handler
    console.log(value);     // 43
});
```

Here, the rejection handler is called as a result of `p2` being rejected. The rejected value 43 from `p2` is passed into that rejection handler.

Returning thenables from fulfillment or rejection handlers doesn't change when the promise executors are executed. The first defined promise will run its executor first, then the second promise executor will run, and so on. Returning thenables simply allows you to define additional responses to the promise results. You defer the execution of fulfillment handlers by creating a new promise within a fulfillment handler. For example:

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

p1.then(function(value) {
    console.log(value);     // 42

    // create a new promise
    let p2 = new Promise(function(resolve, reject) {
        resolve(43);
    });

    return p2
}).then(function(value) {
    console.log(value);     // 43
});
```

In this example, a new promise is created within the fulfillment handler for `p1`. That means the second fulfillment handler won't execute until after `p2` is fulfilled. This pattern is useful when you want to wait until a previous promise has been settled before triggering another promise.

## Responding to Multiple Promises

Up to this point, each example in this chapter has dealt with responding to one promise at a time. Sometimes, however, you'll want to monitor the progress of multiple promises in order to determine the next action. ECMAScript 6 provides two methods that monitor multiple promises: `Promise.all()` and `Promise.race()`.

### The Promise.all() Method

The `Promise.all()` method accepts a single argument, which is an iterable (such as an array) of promises to monitor, and returns a promise that is resolved only when every promise in the iterable is resolved. The returned promise is fulfilled when every promise in the iterable is fulfilled, as in this example:

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});

let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});

let p4 = Promise.all([p1, p2, p3]);

p4.then(function(value) {
    console.log(Array.isArray(value));  // true
    console.log(value[0]);              // 42
    console.log(value[1]);              // 43
    console.log(value[2]);              // 44
});
```

Each promise here resolves with a number. The call to `Promise.all()` creates promise `p4`, which is ultimately fulfilled when promises `p1`, `p2`, and `p3` are fulfilled. The result passed to the fulfillment handler for `p4` is an array containing each resolved value: 42, 43, and 44. The values are stored in the order the promises resolved, so you can match promise results to the promises that resolved to them.

If any promise passed to `Promise.all()` is rejected, the returned promise is immediately rejected without waiting for the other promises to complete:

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
    reject(43);
});

let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});

let p4 = Promise.all([p1, p2, p3]);

p4.catch(function(value) {
    console.log(Array.isArray(value))   // false
    console.log(value);                 // 43
});
```

In this example, `p2` is rejected with a value of 43. The rejection handler for `p4` is called immediately without waiting for `p1` or `p3` to finish executing (They do still finish executing; `p4` just doesn't wait.)

The rejection handler always receives a single value rather than an array, and the value is the rejection value from the promise that was rejected. In this case, the rejection handler is passed 43 to reflect the rejection from `p2`.

### The Promise.race() Method

The `Promise.race()` method provides a slightly different take on monitoring multiple promises. This method also accepts an iterable of promises to monitor and returns a promise, but the returned promise is settled as soon as the first promise is settled. Instead of waiting for all promises to be fulfilled like the `Promise.all()` method, the `Promise.race()` method returns an appropriate promise as soon as any promise in the array is fulfilled. For example:

```js
let p1 = Promise.resolve(42);

let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});

let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});

let p4 = Promise.race([p1, p2, p3]);

p4.then(function(value) {
    console.log(value);     // 42
});
```

In this code, `p1` is created as a fulfilled promise while the others schedule jobs. The fulfillment handler for `p4` is then called with the value of 42 and ignores the other promises. The promises passed to `Promise.race()` are truly in a race to see which is settled first. If the first promise to settle is fulfilled, then the returned promise is fulfilled; if the first promise to settle is rejected, then the returned promise is rejected. Here's an example with a rejection:

```js
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = Promise.reject(43);

let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});

let p4 = Promise.race([p1, p2, p3]);

p4.catch(function(value) {
    console.log(value);     // 43
});
```

Here, `p4` is rejected because `p2` is already in the rejected state when `Promise.race()` is called. Even though `p1` and `p3` are fulfilled, those results are ignored because they occur after `p2` is rejected.

### Asynchronous Task Running

In Chapter 8, I introduced generators and showed you how you can use them for asynchronous task running, like this:

```js
let fs = require("fs");

function run(taskDef) {

    // create the iterator, make available elsewhere
    let task = taskDef();

    // start the task
    let result = task.next();

    // recursive function to keep calling next()
    function step() {

        // if there's more to do
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function(err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }

                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }

        }
    }

    // start the process
    step();

}

// Define a function to use with the task runner

function readFile(filename) {
    return function(callback) {
        fs.readFile(filename, callback);
    };
}

// Run a task

run(function*() {
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});
```

There are some pain points to this implementation. First, wrapping every function in a function that returns a function is a bit confusing (even this sentence was confusing). Second, there is no way to distinguish between a function return value intended as a callback for the task runner and a return value that isn't a callback.

With promises, you can greatly simplify and generalize this process by ensuring that each asynchronous operation returns a promise. That common interface means you can greatly simplify asynchronous code. Here's one way you could simplify that task runner:

```js
let fs = require("fs");

function run(taskDef) {

    // create the iterator
    let task = taskDef();

    // start the task
    let result = task.next();

    // recursive function to iterate through
    (function step() {

        // if there's more to do
        if (!result.done) {

            // resolve to a promise to make it easy
            let promise = Promise.resolve(result.value);
            promise.then(function(value) {
                result = task.next(value);
                step();
            }).catch(function(error) {
                result = task.throw(error);
                step();
            });
        }
    }());
}

// Define a function to use with the task runner

function readFile(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, contents) {
            if (err) {
                reject(err);
            } else {
                resolve(contents);
            }
        });
    });
}

// Run a task

run(function*() {
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});
```

In this version of the code, a generic `run()` function executes a generator to create an iterator. It calls `task.next()` to start the task and recursively calls `step()` until the iterator is complete.

Inside the `step()` function, if there's more work to do, then `result.done` is `false`. At that point, `result.value` should be a promise, but `Promise.resolve()` is called just in case the function in question didn't return a promise. (Remember, `Promise.resolve()` just passes through any promise passed in and wraps any non-promise in a promise.) Then, a fulfillment handler is added that retrieves the promise value and passes the value back to the iterator. After that, `result` is assigned to the next yield result before the `step()` function calls itself.

A rejection handler stores any rejection results in an error object. The `task.throw()` method passes that error object back into the iterator, and if an error is caught in the task, `result` is assigned to the next yield result. Finally, `step()` is called inside `catch()` to continue.

This `run()` function can run any generator that uses `yield` to achieve asynchronous code without exposing promises (or callbacks) to the developer. In fact, since the return value of the function call is always coverted into a promise, the function can even return something other than a promise. That means both synchronous and asynchronous methods work correctly when called using `yield`, and you never have to check that the return value is a promise.

The only concern is ensuring that asynchronous functions like `readFile()` return a promise that correctly identifies its state. For Node.js built-in methods, that means you'll have to convert those methods to return promises instead of using callbacks.




















