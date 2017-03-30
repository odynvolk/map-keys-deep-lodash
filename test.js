"use strict";

const assert = require("assert");
const expect = require("chai").expect;

const mapKeysDeep = require("./index.js");
const camelCase = require("lodash/fp/camelCase");

describe(".mapKeysDeep()", () => {
  it('converts to camel case', () => {
    const out = mapKeysDeep(camelCase, { "display-name": true })
    expect(out.displayName).to.be.equal(true)
  })

  it('converts an array', () => {
    const out = mapKeysDeep(camelCase, [1, true, { "display-name": true }, null])
    expect(out[0]).to.be.equal(1)
    expect(out[1]).to.be.equal(true)
    expect(out[2].displayName).to.be.equal(true)
    expect(out[3]).to.be.equal(null)
  })

  it('converts deep object properties', () => {
    const out = mapKeysDeep(camelCase, { "foo-bar": { "baz-buzz": { "wat-wat": true } } })
    expect(out.fooBar.bazBuzz.watWat).to.be.equal(true)
  })

  it('converts deep arrays', () => {
    const out = mapKeysDeep(camelCase, [ [ [ { "foo-bar": "bazz-buzz" } ] ] ])
    expect(out[0][0][0].fooBar).to.be.equal('bazz-buzz')
  })

});
