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
      if (this.whole) { return [ret]; } else { return ret; }
    } else {
      let once = true;
      _.forEach(this.match, val => {
        if (this.whole) {
          let match = this.minmatch(val, this.origin);
          if (match <= this.similarity) {
            this.whole.push({ text: val, similarity: match });
          }
        } else if (once) {
          once = false;
          let match = this.minmatch(val, this.origin);
          if (match <= this.similarity) { ret = val; }
        }
      });
    }
    if (this.whole) {
      let ret = [];
      _.forEach(_.sortBy(this.whole, [o => { return Number(o.similarity); }]), val => {
        ret.push(val.text);
      });
      return ret;
    } else { return ret; }
  }

  sort(arr) {
    arr.sort((a, b) => { return b.length - a.length; });
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
      for (let key in p_str1) {
        temp += this.simplyMatch(p_str1[key], p_str2[Number(key) + i]);
      }
      similarity.push(temp);
    }
    return _.min(similarity);
  }

  simplyMatch(str1, str2) {
    let similarity = 0;
    let arr_str1 = str1.split('');
    let arr_str2 = str2.split('');
    let once = true;
    _.forEach(arr_str1, (val, key) => {
      if (arr_str2[key]) {
        if (arr_str1[key] !== arr_str2[key] && once) {
          once = false;
          similarity++;
          if (arr_str1.length === arr_str2.length) {
            similarity += this.simplyMatch(str1.slice(Number(key) + 1), str2.slice(Number(key) + 1));
          } else if (arr_str1.length < arr_str2.length) {
            similarity += this.simplyMatch(str1.slice(Number(key)), str2.slice(Number(key) + 1));
          } else {
            similarity += this.simplyMatch(str1.slice(Number(key) + 1), str2.slice(Number(key)));
          }
        }
      }
    });

    return similarity;
  }
}

let betterMatch = new BetterMatch();
module.exports = betterMatch.get.bind(betterMatch);
