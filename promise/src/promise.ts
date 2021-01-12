class Promise {
    state = 'pending'
    callbacks = []

    constructor(fn: Function) {
        if (typeof fn !== 'function') {
            throw new Error('fn必须是个函数')
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(data) {
        this.resolveOrReject('fulfilled', data, 0)
    }

    reject(reason) {
        this.resolveOrReject('rejected', reason, 1)
    }

    then(success?, fail?) {
        const handle = []
        handle[0] = typeof success === 'function' ? success : (data)=>data
        handle[1] = typeof fail === 'function' ? fail : error => { throw error }
        this.callbacks.push(handle)
        handle[2] = new Promise(() => {})
        return handle[2]
    }

    private resolveOrReject(state, data, i) {
        if (this.state !== 'pending') return
        this.state = state
        nextTick(() => {
            this.callbacks.forEach(handle => {
                if (typeof handle[i] === 'function') {
                    let x;
                    try{
                        x = handle[i].call(undefined, data)
                    }catch (e){
                        return handle[2].reject(e)
                    }
                    handle[2].resolveWith(x);
                }
            })
        })
    }
    resolveWithPromise(x){
        x.then(result=>this.resolve(result), reason=>this.reject(reason))
    }
    private resolveWith(x){
        if (this === x) {
            this.resolveWithSelf();
        } else if (x instanceof Promise) {
            this.resolveWithPromise(x);
        } else if (x instanceof Object) {
            this.resolveWithObject(x);
        } else {
            this.resolve(x);
        }
    }
    resolveWithSelf(){
        this.reject(new TypeError());
    }
    resolveWithObject(x) {
        let then = this.getThen(x);
        if (then instanceof Function) {
            this.resolveWithThenable(x);
        } else {
            this.resolve(x);
        }
    }
    resolveWithThenable(x){
        try{
            x.then(result=> this.resolve(result), reason=>this.reject(reason))
        }catch (e){
            this.reject(e)
        }
    }
    private getThen(x){
        let then
        try{
            then = x.then
        }catch (e){
            return this.reject(e)
        }
        return then
    }
}

export default Promise

function nextTick(fn) {
    // @ts-ignore
    if (process !== undefined && typeof process.nextTick === 'function') {
        // @ts-ignore
        return process.nextTick(fn)
    } else if (MutationObserver !== undefined) {
        let counter = 1
        const observer = new MutationObserver(fn)
        const textNode = document.createTextNode(String(counter))
        observer.observe(textNode, {characterData: true})
        counter += 1
        textNode.data = String(counter)
    } else {
        return setTimeout(fn)
    }
}