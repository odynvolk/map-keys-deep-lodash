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

    foo.should.be.ok;
    foo.should.eql({
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

    bar.should.be.ok;
    bar.should.eql({
      zzz: {
        zzz: {
          zzz: "b"
        }
      }
    });
  });

  it("should not manipulate keys if there is not match", () => {
    const bar = mapKeysDeep({
      x: ["a", "b"]
    }, (value, key) => {
      if (key === "y") return "zzz";

      return key;
    });

    bar.should.be.ok;
    bar.should.eql({
      x: ["a", "b"]
    });
  });

  it("should return correct object with array at first level", () => {
    const bar = mapKeysDeep({
      x: ["a", "b"]
    }, (value, key) => {
      if (key === "x") return "zzz";

      return key;
    });

    bar.should.be.ok;
    bar.should.eql({
      zzz: ["a", "b"]
    });
  });

  it("should return correct object with array at deeper levels", () => {
    const bar = mapKeysDeep({
      x: {
        y: ["a", "b"]
      }

    }, (value, key) => {
      if (key === "y") return "zzz";

      return key;
    });

    bar.should.be.ok;
    bar.x.should.exist;
    bar.x.should.eql({
      zzz: ["a", "b"]
    });
  });
});
