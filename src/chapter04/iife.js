'use strict';

let person = function(name){

	return {
		getName(){
			return name;
		}
	}

}('duke');

console.log(person.getName());

