# betterMatch

### Introduction
对输入的一段文字进行模糊匹配，对输入的字符串和目标字符串之间选取最相近的最高匹配度的部分。

### Usage

`betterMatch(Origin, Matches [, Whole] [, Similarity])`

- `Origin` [String] 原始的字符串
- `Matches` [Array] 希望匹配的关键词列表
- `Whole` [Boolean] 是否进行全匹配，默认否，若不进行全部匹配，则当匹配到某个字符串的时候，符合要求就返回，若进行全匹配，那么会将所有的关键词列表匹配一遍，将所有符合条件的关键词以匹配度的精确程度排名组成一个数组返回。
- `Similarity` [Number] 相似度，默认相似度超过 3，就认为不满足条件。

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
