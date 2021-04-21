const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    status = PENDING
    value = null
    reason = null
    onFulfilledCallbacks = []
    onRejectedCallbacks = []
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            while (this.onFulfilledCallbacks.length) {
                this.onFulfilledCallbacks.shift()(value)
            }
        }
    }
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            while (this.onRejectedCallbacks.length) {
                this.onRejectedCallbacks.shift()(reason)
            }
        }
    }
    then(onFulfilled, onRejected) {
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        const promise2 = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    try {
                        // 获取成功回调函数的执行结果
                        const x = realOnFulfilled(this.value);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            const rejectedMicrotask = () => {
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    try {
                        // 调用失败回调，并且把原因返回
                        const x = realOnRejected(this.reason);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            // 判断状态
            if (this.status === FULFILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTED) {
                rejectedMicrotask()
            } else if (this.status === PENDING) {
                // 等待
                // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
                // 等到执行成功失败函数的时候再传递
                this.onFulfilledCallbacks.push(fulfilledMicrotask);
                this.onRejectedCallbacks.push(rejectedMicrotask);
            }
        })

        return promise2
    }

    static resolve(x) {
        if (x instanceof MyPromise) {
            return x
        }
        return new MyPromise((resolve, reject) => {
            resolve(x)
        })
    }
    static reject(r) {
        return new MyPromise((resolve, reject) => {
            reject(r)
        })
    }
}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        return reject(new TypeError('The promise and the return value are the same'));
    }
    if (typeof x === 'object' || typeof x === 'function') {
        if (x === null) {
            return resolve(x)
        }
        let then
        try {
            then = x.then
        } catch (e) {
            return reject(e)
        }
        if (typeof then === 'function') {
            let called
            try {
                then.call(
                    x,
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(promise, y, resolve, reject);
                    },
                    r => {
                        if (called) return
                        called = true
                        reject(r)
                    }
                )
            } catch (e) {
                if (called) return;
                reject(e)
            }
        } else {
            resolve(x)
        }
    } else {
        resolve(x)
    }
}

MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}

module.exports = MyPromise