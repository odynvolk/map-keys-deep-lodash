"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require("lodash");

module.exports = function mapKeysDeepLodash(obj, cb) {
  if (_.isUndefined(obj)) {
    throw new Error("map-keys-deep-lodash expects an object but got " + (typeof obj === "undefined" ? "undefined" : _typeof(obj)));
  }

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