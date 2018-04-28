const {isPlainObject, mapKeys, mapValues} = require("lodash");

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
    return obj.map(item => mapKeysDeepLodash(item, cb, true));
  }

  if (!isPlainObject(obj)) {
    return obj;
  }

  const result = mapKeys(obj, cb);

  return mapValues(result, value =>
    mapKeysDeepLodash(value, cb, true)
  );
};
