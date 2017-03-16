'use strict';

const betterMatch = require('.');

console.log('画', ['花甲', '花架', '回家', '会瞎']);
console.log('单词匹配结果：', betterMatch('画家', ['花甲', '花架', '回家', '会瞎']));
console.log('列表匹配结果：', betterMatch('画家', ['花甲', '花架', '回家', '会瞎'], true));

console.log();

console.log('画', ['花甲', '花架', '回家', '会瞎']);
console.log('搜索匹配结果：', betterMatch('画', ['花甲', '花架', '回家', '会瞎'], true, 3, true));
console.log('普通匹配结果：', betterMatch('画', ['花甲', '花架', '回家', '会瞎'], true));
