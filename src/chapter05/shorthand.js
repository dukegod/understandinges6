'use strict';

function createPerson(name, age) {
    return {
        name,
        age
    };
}

var t = new createPerson('duke','18');
console.log(t.name);

var p = {
	name: 'duke',
	age : 10
};
console.log(typeof p );
console.log('p'+p.name);
p.name = 'change name';
console.log('change:'+ p.name);

var Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};

