class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
  show(){
    console.log(this.length,this.width);
  }

}

new Rectangle(12,23).show()

// console.log(this);