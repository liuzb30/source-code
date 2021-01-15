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
    it('2.2.3.1 onRejected 必须在promise的状态是rejected之后被调用',done=>{
        let called = false
        const promise = new Promise((resolve,reject)=>{
            reject()
            setTimeout(()=>{
                assert(called===true)
                done()
            })
        })
        promise.then(null, ()=>{called = true})
    })
    it('2.2.3.3 onRejected不能被多次调用', done=>{
        const fn = sinon.fake()
        const promise = new Promise((resolve,reject)=>{
            reject()
            reject()
        })
        promise.then(null, fn)
        setTimeout(()=>{
            assert(fn.calledOnce)
            done()
        },0)
    })
    it('2.2.4 onFulfilled必须在当前执行上下文执行完之后才被调用',done=>{
        const fn = sinon.fake()
        const promise = new Promise((resolve,reject)=>{
            resolve()
        })
        promise.then(fn)
        assert.isFalse(fn.called)
        setTimeout(()=>{
            assert(fn.called)
            done()
        },0)
    })
    it('2.2.4 onRejected 必须在当前执行上下文执行完之后才被调用',done=>{
        const fn = sinon.fake()
        const promise = new Promise((resolve,reject)=>{
            reject()
        })
        promise.then(null, fn)
        assert.isFalse(fn.called)
        setTimeout(()=>{
            assert(fn.called)
            done()
        },0)
    })
    it('2.2.5 onFulfilled and onRejected必须被当做函数调用，且没有this',done=>{
        const promise = new Promise((resolve,reject)=>{
            resolve()
        })
        promise.then(function (){
            'use strict' // 严格模式下 this 应该是undifined
            assert(this===undefined)
            done()
        })
    })

    it('2.2.6.1 then 可以被多次调用，且onFulfilled 按顺序执行',()=>{
        const promise = new Promise((resolve,reject)=>{ resolve()})
        const callbacks = [sinon.fake(),sinon.fake(),sinon.fake()]
        promise.then(callbacks[0])
        promise.then(callbacks[1])
        promise.then(callbacks[2])

        setTimeout(()=>{
            assert(callbacks[0].called)
            assert(callbacks[1].calledAfter(callbacks[0]))
            assert(callbacks[2].calledAfter(callbacks[1]))
        },0)
    })
    it('2.2.6.2 then 可以被多次调用，onRejected  按顺序执行',()=>{
        const promise = new Promise((resolve,reject)=>{ reject()})
        const callbacks = [sinon.fake(),sinon.fake(),sinon.fake()]
        promise.then(null, callbacks[0])
        promise.then(null, callbacks[1])
        promise.then(null, callbacks[2])

        setTimeout(()=>{
            assert(callbacks[0].called)
            assert(callbacks[1].calledAfter(callbacks[0]))
            assert(callbacks[2].calledAfter(callbacks[1]))
        },0)
    })
    it('2.2.7 then必须返回一个promise',()=>{
        const promise = new Promise((resolve,reject)=>{resolve()})
        const promise2 = promise.then(null)
        // @ts-ignore
        assert(promise2 instanceof Promise)
    })
    it('2.2.7.1 如果onFulfilled or onRejected返回一个值X,则要传给promise2', done=>{
        const promise = new Promise((resolve,reject)=>{resolve()})
        const promise2 = promise.then(()=>'成功')
        promise2.then(x=>{
            assert(x==='成功')
            done()
        })
    })
    it('2.2.7.2 如果onFulfilled or onRejected抛出一个异常e,则promise2 rejected e', done=>{
        const promise = new Promise((resolve,reject)=>{resolve()})
        const error = new Error()
        const promise2 = promise.then(()=>{throw error}, ()=>{})
        promise2.then(null, e=>{
            assert(e===error)
            done()
        })
    })
    it('2.2.7.3 如果onFulfilled不是一个函数，promsise1的状态是fulfilled，promise2返回和promise1相同的值',done=>{
        const promise = new Promise((resolve,reject)=>{resolve('成功')})
        const promise2 = promise.then(null, ()=>{})
        promise2.then(x=>{
            assert(x==='成功')
            done()
        })
    })
    it('2.2.7.4 如果onRejected 不是一个函数，并且promsise1的状态是rejected，promise2 reject 相同的值', done=>{
        const promise = new Promise((resolve,reject)=>{reject('失败')})
        const promise2 = promise.then(()=>{},null)
        promise2.then(null, r=>{
            assert(r==='失败')
            done()
        })
    })

})