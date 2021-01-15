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
        if(this.state!=='pending') return
        this.state = 'rejected'
        setTimeout(() => {
            this.onRejected()
        }, 0)
    }

    then(onFulfilled?, onRejected?) {
        if (typeof onFulfilled === 'function') {
            this.onFulfilled = onFulfilled
        }
        if(typeof onRejected === 'function'){
            this.onRejected = onRejected
        }
    }
}

export default Promise