
function Promise(excutor: Function) {
    if (typeof excutor !== 'function') {
        throw new Error('不是一个函数')
    }
    this.state = 'pending'
    this.successCallbackArr = []
    this.failCallbackArr = []


    const reject = (reason) => {
        if (this.state !== 'pending') return
        this.state = 'rejected'
        nextTick(() => {
            this.failCallbackArr.forEach(fn => fn(reason))
        })
    }
    const resolve = (data) => {
        if (this.state !== 'pending') return
        this.state = 'fulfilled'
        nextTick(() => {
            this.successCallbackArr.forEach(fn => fn(data))
        })
    }
    excutor(resolve, reject)
}

Promise.prototype.then = function (success?, fail?) {

    if (typeof success === 'function') {
        this.successCallbackArr.push(success)
    }
    if (typeof fail === 'function') {
        this.failCallbackArr.push(fail)
    }
}

function nextTick(fn) {
    // @ts-ignore
    if (process !== undefined && typeof process.nextTick === 'function') {
        // @ts-ignore
        return process.nextTick(fn)
    } else {
        let counter = 1
        const observer = new MutationObserver(fn)
        const textNode = document.createTextNode(String(counter))
        observer.observe(textNode, {characterData: true})
        counter += 1
        textNode.data = String(counter)
    }
}

export default Promise