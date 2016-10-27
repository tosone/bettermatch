'use strict';

const _ = require('lodash');
const pinyin = require('convertPinyin');

class BetterMatch {
  get(origin, match, whole, similarity) {
    if (origin.length === 0 || match.length === 0 || !_.isString(origin)) {
      return null;
    }
    this.similarity = similarity ? similarity : 3;
    this.whole = whole ? [] : false;
    this.origin = origin;
    this.match = _.isArray(match) ? this.sort(match) : match;
    let ret = this.wholeMatch(this.match, this.origin);
    if (ret) {
      if (this.whole) {
        return [ret];
      } else {
        return ret;
      }
    } else {
      let once = true;
      _.forEach(this.match, val => {
        if (this.whole) {
          let match = this.minmatch(val, this.origin);
          if (match <= this.similarity) {
            this.whole.push(val);
          }
        } else if (once) {
          once = false;
          let match = this.minmatch(val, this.origin);
          if (match <= this.similarity) {
            ret = val;
          }
        }
      });
    }
    if (this.whole) {
      return this.whole;
    } else {
      return ret;
    }
  }

  sort(arr) {
    arr.sort((a, b) => {
      return b.length - a.length;
    });
    return arr;
  }

  wholeMatch(arr, origin) {
    let ret = null;
    let once = true;
    _.forEach(arr, val => {
      if (once && origin.indexOf(val) !== -1) {
        once = false;
        ret = val;
      }
    });
    return ret;
  }
  minmatch(str1, str2) {
    let p_str1 = pinyin(str1);
    let p_str2 = pinyin(str2);
    let similarity = [];
    if (p_str1.length > p_str2.length) {
      return 1000;
    }
    let offset = p_str2.length - p_str1.length;
    for (let i = 0; i <= offset; i++) {
      let temp = 0;
      _.forEach(p_str1, (str, key) => {
        temp += this.simplyMatch(str, p_str2[key + i]);
      });
      similarity.push(temp);
    }
    return _.min(similarity);
  }

  simplyMatch(str1, str2) {
    let similarity = 0;
    let arr_str1 = str1.split('');
    let arr_str2 = str2.split('');
    for (let i in arr_str1) {
      if (arr_str2[i]) {
        if (arr_str1[i] !== arr_str2[i]) {
          similarity++;
        }
      } else {
        similarity++;
      }
    }
    if (arr_str1.length < arr_str2.length) {
      similarity += arr_str2.length - arr_str1.length;
    }
    return similarity;
  }
}

let betterMatch = new BetterMatch();
module.exports = betterMatch.get.bind(betterMatch);
