/**
 * Created by hui on 16/7/15.
 */
'use strict';
let promise = Promise.resolve(42);

promise.then(function(value) {
  console.log(value);         // 42
});