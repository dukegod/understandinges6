// abstract base class
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("This class cannot be instantiated directly.")
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    this.length = length;
    this.width = width;
  }
}

var x = new Shape(); // throws error

var y = new Rectangle(3, 4); // no error
console.log(y instanceof Shape); // true