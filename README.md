# betterMatch

### Introduction
对输入的一段文字进行模糊匹配，对输入的字符串和目标字符串之间选取最相近的最高匹配度的部分。

### Usage
``` javascript
console.log(betterMatch('不好', ['好', '不好'], false));
// '不好'
console.log(betterMatch('不好', ['好', '不好'], true));
// [ '不好' ]
console.log(betterMatch('呀，不高', ['好', '不好'], true));
// [ '不好', '好' ]
console.log(betterMatch('呀，不高', ['好', '不好'], false));
// 不好
```

### 匹配

|Origin|Match|Similarity|
|:---:|:---:|:---:|
|想嫁|香蕉|1|
|香膏|香蕉|2|
|想招|香蕉|2|
|奖包|香蕉|3|
|不系|不是|2|
|我要跋涉|八十|1|
