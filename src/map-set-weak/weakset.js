/**
 * Created by hui on 16/1/6.
 */
'use strict';
//作为构造函数，WeakSet可以接受一个数组或类似数组的对象作为参数。
// （实际上，任何具有iterable接口的对象，都可以作为WeakSet的参数。）
// 该数组的所有成员，都会自动成为WeakSet实例对象的成员。
//WeakSet没有size属性，没有办法遍历它的成员。

var a = [[1,2], [3,4]];
var ws = new WeakSet(a);
console.log(ws);

var b = {};
ws.add(b);

var i = ws.has(b);
console.log(i);