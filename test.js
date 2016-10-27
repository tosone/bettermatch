'use strict';

const betterMatch = require('.');

console.log(betterMatch('小红毛', ['小红帽'], true));
console.log(betterMatch('不好', ['好', '不好'], false));
console.log(betterMatch('呀，不高', ['好', '不好'], true));
console.log(betterMatch('呀，不高', ['好', '不好'], false));
