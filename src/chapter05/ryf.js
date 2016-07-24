'use strict';

var obj = {
	name: 'duke',
	age: '18',

	ability(){
		console.log('fly ...');
	},
	setAddress(address){
		this.address = address;
	},
	getAddress(){
		console.log(this.name + ':'+ this.address);
	}

}
obj.ability();
obj.setAddress('anhui');
obj.getAddress();




