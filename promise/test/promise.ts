import chai from 'chai'
import sinonChai from "sinon-chai";
import sinon from 'sinon'
import {describe} from 'mocha'
chai.use(sinonChai)

const assert = chai.assert
import Promise from "../src/index";

describe('Promise',()=>{
    it('是一个类',()=>{
        assert.isFunction(Promise)
        assert.isObject(Promise.prototype)
    })
    it('构造函数的参数必须是一个函数',()=>{
        assert.throw(()=>{
            // @ts-ignore
            new Promise(1)
        })
        assert.throw(()=>{
            // @ts-ignore
            new Promise(false)
        })
    })
    it('实例有then方法', ()=>{
        const promise = new Promise(()=>{})
        // @ts-ignore
        assert.isFunction(promise.then)
    })
    it('then方法有两个参数, onFulfilled和onRejected是可选的',()=>{
        const promise = new Promise(()=>{})
        promise.then(null)
        assert(1===1)
    })

})