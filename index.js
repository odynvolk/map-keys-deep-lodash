'use strict';

const _ = require("lodash");

module.exports = function mapKeysDeepLodash(obj, cb) {
  if (_.isUndefined(obj)) {
    throw new Error(`map-keys-deep-lodash expects an object but got ${typeof obj}`);
  }

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
