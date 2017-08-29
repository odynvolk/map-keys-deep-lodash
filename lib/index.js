"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require("lodash");

var isArray = require("lodash/fp/isArray");

module.exports = function mapKeysDeepLodash(obj, cb) {
  var mapKeysDeep = function mapKeysDeep(cb2) {
    return function (val) {
      if (!val) return val;
      if (isArray(val)) return mapKeysArray(val, cb2);

      return val;
    };
  };

  function mapKeysArray(arr, cb2) {
    return arr.map(mapKeysDeep(cb2));
  }

  if (_.isUndefined(obj)) {
    throw new Error("map-keys-deep-lodash expects an object but got " + (typeof obj === "undefined" ? "undefined" : _typeof(obj)));
  }

  if (isArray(obj)) return mapKeysArray(obj, cb);

  obj = _.mapKeys(obj, cb);

  var res = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      if (_.isObject(val)) {
        res[key] = mapKeysDeepLodash(val, cb);
      } else {
        res[key] = val;
      }
    }
  }

  return res;
};