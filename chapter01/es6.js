
// traditional syx
// for (var i = 0; i < 5; i++) {
// 	console.log('inner'+i);
// };
// console.log('outline'+i);
// es6 
'use strict';
for (let i = 0; i < 5; i++) {
	console.log('inner'+i);
};
// console.log('outline'+i);// referenceError 



const person = {
    name: "Nicholas"
};

// works
person.name = "Greg";

// throws an error
// person = {
//     name: "Greg"
// };

const c = 78;
// c = 90;
// 不会改变c的值
console.log('const' + c);

let d = 'var';
(function(){
	let d = 'var';
	console.log('inner:' + d);
})()
console.log('out:'+ d);



// 在循环中比较
var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push(function() { console.log(i); });
}

funcs.forEach(function(func) {
    func();     // outputs the number "10" ten times
});



var funcs = [];

for (var i=0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)));
    console.log('i' + i);
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
});


// use let in loop 
console.log('let in loop');
var funcs = [];

for (let i=0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
})

console.log('const 变量问题');
var funcs = [];

// throws an error after one iteration
for (const i=0; i < 10; i++) {
    // funcs.push(function() {
    //     console.log(i);
    // });
}



var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };

// doesn't cause an error
for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});










