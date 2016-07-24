// class.js
'use strict';
class Person{
	constructor(name,age){
		this.name= name;
		this.age= age;
	}
	static live(){
		console.log('enjoy life '+ this.name);
	}

	speak(){
		console.log('person can speak language');
	}
	showInfo(){
		console.log('name:'+this.name+':'+this.age);
	}
	fight(){
		console.log('make love');
	}

}

class American extends Person{
	speak(){
		console.log('American can speak american ');
	}
	fight(){
		super.fight();
	}
}

var p = new Person();
p.name= 'lh';
p.age= 90;
p.speak();
p.showInfo();
Person.live();
console.log('static');
// p.live();



var ap= new American();
ap.speak();
ap.fight();


