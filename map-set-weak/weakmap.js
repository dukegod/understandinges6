/**
 * Created by hui on 16/1/6.
 */
'use strict';
var wm1 = new WeakMap();
var o1 = {};

console.log(wm1.set(o1, 37));

console.log(wm1.get(o1)); // 37

console.log(wm1.has(o1)); // true
console.log(wm1.delete(o1));

//WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），
// 不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。
