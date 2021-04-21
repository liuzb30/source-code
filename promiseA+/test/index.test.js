const Promise = require('../src')
const chai = require('chai')
const assert = chai.assert

describe('promise', () => {
    it('是一个类', () => {
        assert.isFunction(Promise)
        assert.isObject(Promise.prototype)
    })

})