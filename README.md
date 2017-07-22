# map-keys-deep-lodash
> Map/rename keys recursively

Sometimes we need to map keys from an object recursively. map-keys-deep-lodash solves this and uses only lodash as external
dependency.

The code for this module uses new features in the Javascript language, but the code is transpiled by Babel to ES2015 so most projects who needs it should be able to use it.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i map-keys-deep-lodash --save
```

## Usage

```js
const mapKeysDeep = require("map-keys-deep-lodash");

mapKeysDeep({a: "b", c: "d", e: {c: "f", g: {c: "h"}}}, (value, key) => {
  if (key === "c") {
    return "zzz";
  }

  return key;
});
//=> {a: "b", zzz: "d", e: {zzz: "f", g: {zzz: "h"}}}
```

## Related projects

* [lodash](https://github.com/lodash/lodash): The only external dependency. [more](https://github.com/lodash/lodash)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/odynvolk/map-keys-deep-lodash/issues/new)

## Author

+ [github/odynvolk](https://github.com/odynvolk)

## License

Released under the MIT license.

