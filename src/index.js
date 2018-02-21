const _ = require("lodash");

module.exports = function mapKeysDeepLodash(obj, cb) {
  if (_.isUndefined(obj)) {
    throw new Error(`map-keys-deep-lodash expects an object but got ${typeof obj}`);
  }
  if (_.isArray(obj)) {
    return obj.map(item => mapKeysDeepLodash(item, cb));
  }
  if (!_.isPlainObject(obj)) {
    return obj;
  }

  const result = _.mapKeys(obj, cb);
  return _.mapValues(result, value =>
    mapKeysDeepLodash(value, cb)
  );
};
