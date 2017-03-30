"use strict";

const isObject = require("lodash/fp/isObject");
const isArray = require("lodash/fp/isArray");
const mapKeys = require("lodash/fp/mapKeys");

const toKeyValuePair = (obj) => (key) => ({ key, val: obj[key] });

const mapKeyValueToObject = (cb) => (mutateObj, {key, val}) => {
  mutateObj[cb(key)] = mapKeysDeep(cb)(val);
  return mutateObj;
};

const mapKeysObject = (cb, obj) => Object.keys(obj).map(toKeyValuePair(obj)).reduce(mapKeyValueToObject(cb), {}); 

const mapKeysDeep = (cb) => (val) => {
  if(!val) { return val; }
  if(isArray(val)) { return mapKeysArray(cb, val); }
  if(isObject(val)) { return mapKeysObject(cb, val); }
  return val;
};

const mapKeysArray = (cb, arr) => arr.map(mapKeysDeep(cb));

module.exports = (callBack, value) => mapKeysDeep(callBack)(value);
