import sinonChai from "sinon-chai";
import chai from 'chai'
import {describe} from 'mocha'
import deepClone from "../src";

const assert = chai.assert;
chai.use(sinonChai);

type Dictionary = { [key: string]: any }
describe('deepClone', () => {
    it('是一个函数', () => {
        assert.isFunction(deepClone)
    })
    it("能够复制基本类型", () => {
        const n = 1;
        const n2 = deepClone(n)
        assert(n === n2)

        const s = '112'
        const s2 = deepClone(s)
        assert(s === s2)

        const b = true
        const b2 = deepClone(b)
        assert(b === b2)

        const u = undefined
        const u2 = deepClone(u)
        assert(u === u2)

        const empty = null
        const empty2 = deepClone(empty)
        assert(empty === empty2)

        const sym = Symbol()
        const sym2 = deepClone(sym)
        assert(sym === sym2)
    });
    describe('对象', () => {
        it('能复制普通对象', () => {
            const a = {name: 'lzb', address: {zipCode: '000000'}}
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a.name === a2.name)
            assert(a.address !== a2.address)
            assert(a.address.zipCode === a2.address.zipCode)
        })
        it('能复制数组对象', () => {
            const a = [[11, 12], [21, 22], [31, 32]]
            const a2 = deepClone(a)
            assert(a2 !== a)
            assert(a2[0] !== a[0])
            assert(a2[1] !== a[1])
            assert(a2[2] !== a[2])
            assert.deepEqual(a, a2)
        })
    })

})