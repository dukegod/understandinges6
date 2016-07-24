'use strict';
class QueryList{
	constructor(list){
		this.collection = list;
	}
	*[Symbol.iterator](){
		for(let obj of this.collection){
			yield obj;
		}
	}
}

var list = ['item1','item2','item3'];
var ql = new QueryList(list);
for(let item of ql){
	console.log(item);
}

