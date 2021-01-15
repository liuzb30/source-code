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
        if(this.state!=='pending') return
        this.state = 'fulfilled'
        setTimeout(() => {
            this.callbacks.forEach(handle=>{
                handle[0] && handle[0].call(undefined,result)
            })
        }, 0)
    }

    reject(reason) {
        if(this.state!=='pending') return
        this.state = 'rejected'
        setTimeout(() => {
            this.callbacks.forEach(handle=>{
                handle[1] && handle[1].call(undefined,reason)
            })
        }, 0)
    }

    then(onFulfilled?, onRejected?) {
        const handle = []
        if (typeof onFulfilled === 'function') {
            handle[0] = onFulfilled
        }
        if(typeof onRejected === 'function'){
            handle[1] = onRejected
        }
        this.callbacks.push(handle)
    }
}

export default Promise