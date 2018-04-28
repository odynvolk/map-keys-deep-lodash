"use strict";

var _require = require("lodash"),
    isPlainObject = _require.isPlainObject,
    mapKeys = _require.mapKeys,
    mapValues = _require.mapValues;

module.exports = function mapKeysDeepLodash(obj, cb, isRecursive) {
  if (!obj) {
    return {};
  }

  if (!isRecursive) {
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
      return {};
    }
  }

  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return mapKeysDeepLodash(item, cb, true);
    });
  }

  if (!isPlainObject(obj)) {
    return obj;
  }

  var result = mapKeys(obj, cb);

  return mapValues(result, function (value) {
    return mapKeysDeepLodash(value, cb, true);
  });
};