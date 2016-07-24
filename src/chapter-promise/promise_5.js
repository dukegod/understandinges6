/**
 * Created by hui on 16/7/17.
 */
'use strict';
let rejected;

process.on("unhandledRejection", function(reason, promise) {
  console.log(reason.message);            // "Explosion!"
  console.log(rejected === promise);      // true
});

rejected = Promise.reject(new Error("Explosion!"));