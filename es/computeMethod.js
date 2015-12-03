 var method = 'duke';

 class Foo {
 	constructor(){}
 	['call'+'me'](){
 		console.log('call me ');
 	}
 	[method](){
 		console.log('method duke ');
 	}
 }

 var foo = new Foo();
 console.log(foo.callme());
 console.log(foo.duke());