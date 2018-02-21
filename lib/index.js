"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require("lodash");

module.exports = function mapKeysDeepLodash(obj, cb) {
  if (_.isUndefined(obj)) {
    throw new Error("map-keys-deep-lodash expects an object but got " + (typeof obj === "undefined" ? "undefined" : _typeof(obj)));
  }
  if (_.isArray(obj)) {
    return obj.map(function (item) {
      return mapKeysDeepLodash(item, cb);
    });
  }
  if (!_.isPlainObject(obj)) {
    return obj;
  }

  var result = _.mapKeys(obj, cb);
  return _.mapValues(result, function (value) {
    return mapKeysDeepLodash(value, cb);
  });
};