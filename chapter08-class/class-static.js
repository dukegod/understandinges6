class PersonClass {

  // equivalent of the PersonType constructor
  constructor(name) {
    this.name = name;
  }

  // equivalent of PersonType.prototype.sayName
  sayName() {
    console.log(this.name);
  }

  // equivalent of PersonType.create
  static create(name) {
    return new PersonClass(name);
  }
}

let person = PersonClass.create("Nicholas");
person.sayName();