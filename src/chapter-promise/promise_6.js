/**
 * Created by hui on 16/7/17.
 */
'use strict';
let fs = require("fs");

function run(taskDef) {

  // create the iterator, make available elsewhere
  let task = taskDef();

  // start the task
  let result = task.next();

  // recursive function to keep calling next()
  function step() {

    // if there's more to do
    if (!result.done) {
      if (typeof result.value === "function") {
        result.value(function(err, data) {
          if (err) {
            result = task.throw(err);
            return;
          }

          result = task.next(data);
          step();
        });
      } else {
        result = task.next(result.value);
        step();
      }

    }
  }

  // start the process
  step();

}

// Define a function to use with the task runner

function readFile(filename) {
  return function(callback) {
    fs.readFile(filename, callback);
  };
}

// Run a task

run(function*() {
  let contents = yield readFile("example.txt");
  doSomethingWith(contents);
  console.log("Done");
});