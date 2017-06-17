class MyClass {
  constructor(x) {
    this.x = x;
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log(`setter:${value}`);
  }
  showX() {
    console.log(this.x);
  }
}

const inst = new MyClass();

inst.prop = 123;
// setter: 123
