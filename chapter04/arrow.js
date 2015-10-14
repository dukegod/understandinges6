'use strict';

var test = val => val;
console.log(test(99));


// duo ge 
var test1 = (x, y) =>{
	return x+y;
} 
console.log(test1(4,4));

// empty function
var empfun = () => {}
console.log(empfun);

// key val 
var objfun = id => ({id: id , name: 'dk'});
console.log(objfun(90).name);


// 立即执行函数

// let person = function(name){

// 	return {
// 		getName(){
// 			return name;
// 		}
// 	}

// }('duke');

// console.log(person.getName());

// 箭头函数执行

let per = ((name) => {

	return {
		getName() {
			return name;
		}
	};
})('duke2');
console.log(per.getName());


//  this 绑定

var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", function(event) {
            this.doSomething(event.type);     // error
        }, false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
















