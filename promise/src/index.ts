
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
type ThenObject={
    then:Function
}

Promise.prototype.then = function (success?, fail?) {
    success = typeof success ==='function' ? success : data=>data
    fail = typeof fail ==='function' ? fail : error=>{throw new Error(error)}

    const promise2 = new Promise((resolve,reject)=>{
        this.successCallbackArr.push((data)=>{
            try{
                let result = success(data)
                resolvePromise(promise2, result, resolve,reject)
            }catch (e){
                reject(e)
            }

        })
        this.failCallbackArr.push((reason)=>{
            try{
                let result = fail(reason)
                resolvePromise(promise2, result, resolve,reject)
            }catch (e){
                reject(e)
            }
        })
    })
    return promise2
}

const resolvePromise = function (promise2, result:ThenObject, resolve, reject){
    if(promise2===result){
        return reject(new TypeError('error due to circular reference'))
    }
    if(result instanceof Promise){
        result.then(resolve, reject)
    }else{
        resolve(result)
    }
}

function nextTick(fn) {
    if (process !== undefined && typeof process.nextTick === 'function') {
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