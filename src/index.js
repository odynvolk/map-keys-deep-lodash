const _ = require("lodash");

const isArray = require("lodash/fp/isArray");

module.exports = function mapKeysDeepLodash(obj, cb) {
  const mapKeysDeep = (cb2) => (val) => {
    if (!val) return val;
    if (isArray(val)) return mapKeysArray(val, cb2);

    return val;
  };

  function mapKeysArray(arr, cb2) {
    return arr.map(mapKeysDeep(cb2));
  }

  if (_.isUndefined(obj)) {
    throw new Error(`map-keys-deep-lodash expects an object but got ${typeof obj}`);
  }

  if (isArray(obj)) return mapKeysArray(obj, cb);

  obj = _.mapKeys(obj, cb);

  const res = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      if (_.isObject(val)) {
        res[key] = mapKeysDeepLodash(val, cb);
      } else {
        res[key] = val;
      }
    }
  }

  return res;
};
