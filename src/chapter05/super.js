'use strict';

let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
// let friend = {
//     __proto__: person,
//     getGreeting() {
//         // same as this.__proto__.getGreeting.call(this)
//         return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
//     }
// };

// 优化：：：：：：

let friend = {
    __proto__: person,
    getGreeting(){
        return super.getGreeting() + 'hihi';
    }
}





console.log(friend.getGreeting());                      // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === person);  // true
console.log(friend.__proto__ === person);               // true

// set prototype to dog
friend.__proto__ = dog;
console.log(friend.getGreeting());                      // "Woof, hi!"
console.log(friend.__proto__ === dog);                  // true
console.log(Object.getPrototypeOf(friend) === dog);     // true

