class Promise {
    state = 'pending'
    onFulfilled = null
    onRejected = null

    constructor(fn: Function) {
        if (typeof fn !== 'function') {
            throw new Error('fn必须是一个函数')
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve() {
        if(this.state!=='pending') return
        this.state = 'fulfilled'
        setTimeout(() => {
            this.onFulfilled()
        }, 0)
    }

    reject() {
    }

    then(onFulfilled?, onRejected?) {
        if (typeof onFulfilled === 'function') {
            this.onFulfilled = onFulfilled
        }
    }
}

export default Promise