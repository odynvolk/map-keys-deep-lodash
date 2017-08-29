const assert = require("assert");
const expect = require("chai").expect;

const mapKeysDeep = require("../lib/index");

describe(".mapKeysDeep()", () => {
  it("should throw exception when undefined", () => {
    expect(() => {
      mapKeysDeep(undefined);
    }).to.throw("map-keys-deep-lodash expects an object but got undefined");
  });

  it("should return correct object with different subkeys", () => {
    const foo = mapKeysDeep({
      a: "b",
      c: "d",
      e: {
        c: "f",
        g: {
          c: "h"
        }
      }
    }, (value, key) => {
      if (key === "c") return "zzz";

      return key;
    });

    assert.deepEqual(foo, {
      a: "b",
      zzz: "d",
      e: {
        zzz: "f",
        g: {
          zzz: "h"
        }
      }
    });
  });

  it("should return correct object with same subkeys", () => {
    const bar = mapKeysDeep({
      a: {
        a: {
          a: "b"
        }
      }
    }, (value, key) => {
      if (key === "a") return "zzz";

      return key;
    });

    assert.deepEqual(bar, {
      zzz: {
        zzz: {
          zzz: "b"
        }
      }
    });
  });
});
