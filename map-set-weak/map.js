/**
 * Created by hui on 16/1/6.
 */
"use strict";
var map = new Map([["name", "张三"], ["title", "Author"]]);
console.log(map.size); // 2
console.log(map.get("name")); // "张三"
console.log(map.get("title")); // "Author"

map.set("age", 18);
console.log(map);

//console.log(map.has("age"));
//console.log(map.delete("age"));

map.set("age", 18);
map.set("age2", 18);
map.set("age3", 18);

map.forEach(function (value, key) {
  console.log(key + " = " + value);
}, map)

for (var key of map.keys()) {
  console.log(key);
}
// Will show 2 logs; first with "0" and second with "1"

for (var value of map.values()) {
  //noinspection JSUnresolvedVariable
  console.log(value);
}
// Will show 2 logs; first with "zero" and second with "one"

for (var item of map.entries()) {
  console.log(item[0] + " = " + item[1]);
}