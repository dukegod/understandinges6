/**
 * 通过return 实现数据的链式调用
 */

// let po = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // reject('Error');
//     resolve('ok');
//   }, 1000)
// })
// po.then((resolve) => {
//   console.log(1, resolve);
//   return 333;
//   // resolve();
// }, (error) => {
//   console.log(2, error);
// }).then((e) => {
//   console.log(3, e);
// }, (error) => {
//   console.log(4, error);
// })

let asy = (e) => {
  console.log(e);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      e = e * 2;
      resolve(e);
    }, 1000)
  })
}

let final = (value) => {
  console.log('完成: ', value);
}
// console.log(asy())
asy(1).then((e) => {
  console.log(1, e);
  return new Promise((resolve, reject) => {
    reject('e*5')
  })
}).then((e) => {
  console.log(2, e);
  console.error();
  return e;
}).then((e) => {
  console.log(3, e);
  console.error();
});
