// 新版api
function bind(thisArg,...arg1){
    const fn = this
    function returnFn(...arg2){
        return fn.call((this instanceof returnFn) ? this : thisArg,...arg1,...arg2)
    }
    returnFn.prototype = fn.prototype
    return returnFn
}
// 旧版api
function bind(thisArg){
    const fn = this
    const arg1 = Array.prototype.slice.call(arguments,1)
    function returnFn(){
        const arg2 = Array.prototype.slice.call(arguments,0)
        return fn.apply((this instanceof returnFn)?this:thisArg, arg1.concat(arg2))
    }
    returnFn.prototype = fn.prototype
    return returnFn
}



module.exports = bind