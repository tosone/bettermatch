# betterMatch

### Introduction
对输入的一段文字进行模糊匹配，对输入的字符串和目标字符串之间选取最相近的最高匹配度的部分。

### Usage
``` javascript
// 不好
console.log(betterMatch('小红毛', ['小红帽'], true));
// [ '小红帽' ]
console.log(betterMatch('不好', ['好', '不好'], false));
// 不好
console.log(betterMatch('呀，不高', ['好', '不好'], true));
// [ '不好', '好' ]
console.log(betterMatch('呀，不高', ['好', '不好'], false));
// 不好
console.log(betterMatch('张叉', ['装叉']));
// 装叉
console.log(betterMatch('画家', ['花甲', '花架', '回家', '会瞎'], true));
// [ '花甲', '花架', '回家', '会瞎' ]
```

### 匹配

|Match|Origin|Similarity|
|:---:|:---:|:---:|
|画家|花甲|0|
|画家|花架|0|
|画家|回家|1|
|画家|会瞎|2|
|画家|麾下|2|
|画家|慧霞|2|
|张叉|装叉|1|
