'use strict';
class Human {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return "hello, my name is " + this.name + ":";
  }
}

var hu = new Human('duke').toString();
console.log(hu);


class Person extends Human {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  toString() {
    return super.toString() + 'age:' + this.age;
  }
}

var per1 = new Person('liuhui', 18).toString();
console.log(per1);





