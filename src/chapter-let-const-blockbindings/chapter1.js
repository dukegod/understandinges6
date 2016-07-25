'use strict';

for (var i = 0; i <= 3; i++) {
  setTimeout(function() {
    console.log('i:' + i);
  }, 0);
}
console.log('obj' + 1);


for (let i = 0; i <= 3; i++) {
  setTimeout(function() {
    console.log('let+i:' + i);
  }, 0);
}
