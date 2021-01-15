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
            this.resolveWithSelf(x)
        } else if (x instanceof Promise) {
            this.resolveWithPromise(x)
        } else if (x instanceof Object) {
            this.resolveWithObject(x)
        } else {
            this.resolve(x)
        }
    }

    resolveWithSelf(x){
        this.reject(new TypeError())
    }

    resolveWithPromise(x){
        x.then(result => this.resolve(result), reason => this.reject(reason))
    }

    resolveWithObject(x){
        let then = this.getThen(x)
        if(then instanceof Function){
            this.resolveWithThenable(x)
        }else{
            this.resolve(x)
        }
    }
    resolveWithThenable(x){
        try{
            x.then(result => this.resolve(result), reason => this.reject(reason))
        }catch (e){
            this.reject(e)
        }
    }
    getThen(x){
        let then
        try{
            then = x.then
        }catch (e){
            this.reject(e)
        }
        return then
    }


    then(onFulfilled?, onRejected?) {
        const handle = []
        if (typeof onFulfilled === 'function') {
            handle[0] = onFulfilled
        }
        if (typeof onRejected === 'function') {
            handle[1] = onRejected
        }
        handle[2] = new Promise(() => {})
        this.callbacks.push(handle)
        return handle[2]
    }
}

export default Promise