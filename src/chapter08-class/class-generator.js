class MyClass {

  * createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }

}

let instance = new MyClass();
let iterator = instance.createIterator();