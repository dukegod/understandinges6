function* range(start,end){
	for(var i = start;i < end; i++){
		yield i;
	}
}
// var i = range(1,4);
// console.log('i'+i);

function go(){
	for(var v of range(1,4)){
		console.log('i'+v);
	}
}
go();
