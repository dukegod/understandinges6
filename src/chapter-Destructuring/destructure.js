let foo = () => {
  return [1, 2, 3]
}

let [a, b, c] = foo();

console.log(a, b, c); // 1 2 3



let f = () => {
  return {
    x: 1,
    y: 2
  }
}

let { x: x, y: y } = f();

console.log(x, y);
