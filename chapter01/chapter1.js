'use strict';

var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };
for (let key in object) {
    funcs.push(function() {
        console.log(key);
    });
}

funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});




for(var i = 0; i<=3; i++){
	setTimeout(function(){
		console.log('i:'+ i);
	}, 0);
}






