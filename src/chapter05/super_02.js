// super another methed 
'use strict';
class Human{
	constructor(name){
		this.name = name;
	}
	showName(){
		console.log('consists of society environment:::::::'+this.name);
	}

}

class Person extends Human{
	constructor(name,age){
		// 继承父类的属性
		super(name);
		this.age = age;
	}
	showName(){
		// 直接继承 父类的方法
		super.showName();
		console.log(this.name+ this.age);
	}
}

var per = new Person('duke',18);
per.showName();
