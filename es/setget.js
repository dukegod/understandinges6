'use strict';
class GetThing{
	constructor (size){
		this.length = size;
	}
	get Length(){
		console.log(this.length);
		return this.length;
	}
	set Length(val){
		this.length = val;
		console.log('value has been changed');
		// console.log(this.length);
	}
}

var sg = new GetThing(990);
sg.Length;
sg.Length = 1000;
sg.Length;