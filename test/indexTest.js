const {URL} = require("url");

const mapKeysDeep = require("../lib/index");

describe(".mapKeysDeep()", () => {
  describe("valid mappings", () => {
    it("should return correct object with different type of values", () => {
      const bar = mapKeysDeep({
        a: 1,
        b: 0,
        c: null,
        d: undefined,
        e: NaN,
        f: false
      }, (value, key) => {
        return `${key}2`;
      });

      bar.should.be.ok;
      bar.should.exist;
      bar.should.eql({
        a2: 1,
        b2: 0,
        c2: null,
        d2: undefined,
        e2: NaN,
        f2: false
      });
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

  describe("invalid mappings", () => {
    it("should return empty object when undefined", () => {
      const something = undefined;

      const bar = mapKeysDeep(something, () => {});

      bar.should.eql({});
    });

    it("should return empty object when null", () => {
      const something = null;

      const bar = mapKeysDeep(something, () => {});

      bar.should.eql({});
    });

    it("should return empty object when string", () => {
      const something = "something";

      const bar = mapKeysDeep(something, () => {});

      bar.should.eql({});
    });

    it("should return empty object when number", () => {
      const something = 123;

      const bar = mapKeysDeep(something, () => {});

      bar.should.eql({});
    });

    it("should return empty object when boolean", () => {
      const something = true;

      const bar = mapKeysDeep(something, () => {});

      bar.should.eql({});
    });

    it("should return same non plain object", () => {
      const url = new URL("http://www.google.com");

      const bar = mapKeysDeep(url, () => {});
      url.should.eql(bar);
    });
  });
});
