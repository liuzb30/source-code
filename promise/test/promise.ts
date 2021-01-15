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
    it('new Promise(fn)中的fn执行的时候接受resolve和reject两个函数',done=>{
        new Promise((resolve,reject)=>{
            assert.isFunction(resolve)
            assert.isFunction(reject)
            done()
        })
    })
    it('实例有then方法', ()=>{
        const promise = new Promise(()=>{})
        // @ts-ignore
        assert.isFunction(promise.then)
    })
    it('2.2.1 then方法有两个参数, onFulfilled和onRejected是可选的',()=>{
        const promise = new Promise(()=>{})
        promise.then(null)
        assert(1===1)
    })
    it('2.2.2.1 onFulfilled必须在promise的状态是fulfilled之后被调用',done=>{
        let called = false
        const promise = new Promise((resolve,reject)=>{
            resolve()
            setTimeout(()=>{
                assert(called===true)
                done()
            })
        })
        promise.then(()=>{called = true})
    })
    it('2.2.2.3 onFulfilled不能被多次调用', done=>{
        const fn = sinon.fake()
        const promise = new Promise(resolve=>{
            resolve()
            resolve()
        })
        promise.then(fn)
        setTimeout(()=>{
            assert(fn.calledOnce)
            done()
        },0)
    })

})