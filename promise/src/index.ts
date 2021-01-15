class Promise{
    constructor(fn:Function) {
        if(typeof fn !== 'function'){
            throw new Error('fn必须是一个函数')
        }
    }
    then(onFulfilled?, onRejected?){}
}

export default Promise