/**
 * Created by hui on 16/7/15.
 */
'use strict';
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);     // 42
});