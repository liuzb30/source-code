class Promise {
    state = 'pending'
    callbacks = []

    constructor(fn: Function) {
        if (typeof fn !== 'function') {
            throw new Error('fn必须是一个函数')
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(result) {
        if (this.state !== 'pending') return
        this.state = 'fulfilled'
        setTimeout(() => {
            this.callbacks.forEach(handle => {
                if (typeof handle[0] === 'function') {
                    try {
                        const x = handle[0].call(undefined, result)
                        handle[2].resolveWith(x)
                    } catch (e) {
                        handle[2].reject(e)
                    }

                }else{
                    handle[2].resolve(result)
                }
            })
        }, 0)
    }

    reject(reason) {
        if (this.state !== 'pending') return
        this.state = 'rejected'
        setTimeout(() => {
            this.callbacks.forEach(handle => {
                if (typeof handle[1] === 'function') {
                    try {
                        const x = handle[1].call(undefined, reason)
                        handle[2].resolveWith(x)
                    } catch (e) {
                        handle[2].reject(e)
                    }
                }else{
                    handle[2].reject(reason)
                }
            })
        }, 0)
    }

    resolveWith(x) {
        if (this === x) {
            this.reject(new TypeError())
        } else if (x instanceof Promise) {
            x.then(result => this.resolve(result), reason => this.reject(reason))
        } else if (x instanceof Object) {
            try {
                x.then(y => this.resolve(y), r => this.reject(r))
            } catch (e) {
                this.reject(e)
            }
        } else {
            this.resolve(x)
        }
    }


    then(onFulfilled?, onRejected?) {
        const handle = []
        if (typeof onFulfilled === 'function') {
            handle[0] = onFulfilled
        }
        if (typeof onRejected === 'function') {
            handle[1] = onRejected
        }
        handle[2] = new Promise(() => {
        })
        this.callbacks.push(handle)
        return handle[2]
    }
}

export default Promise