# 字符串 与 正则表达式

字符串和正则表达式比较重要。es6 进行了完善，新增了健壮的，期待已久的新的功能

## 更好的支持 unicode

### The codePointAt() Method

The first example of fully supporting UTF-16 is the `codePointAt()` method, which can be used to retrieve the Unicode code point that maps to a given position in a string. This method accepts the code unit position (not the character position) and returns an integer value:

```js
var text = "𠮷a";

console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
console.log(text.charCodeAt(2));    // 97

console.log(text.codePointAt(0));   // 134071
console.log(text.codePointAt(1));   // 57271
console.log(text.codePointAt(2));   // 97
```

### The normalize() Method