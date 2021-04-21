//定义一个bind方法
// 思路:
// 改变this指向：call或者apply
// 如何判断函数是否被new：this instanceof returnFn
// 保留原函数的原型： returnFn.prototype = fn.prototype
// 新版API
function bind(thisArg, ...args) {
    const fn = this  //获取被绑定的函数
    function returnFn(...args2) {
        return fn.call((this instanceof returnFn) ? this : thisArg, ...args, ...args2)  //通过call来改变this指向
    }
    returnFn.prototype = fn.prototype  // 把新函数的原型指向原函数的原型
    return returnFn
}
// 旧版API
function bind(thisArg) {
    const fn = this  //获取被绑定的函数
    const args = Array.prototype.slice.call(arguments, 1)
    function returnFn() {
        const args2 = Array.prototype.slice.call(arguments, 0)
        return fn.apply((this instanceof returnFn) ? this : thisArg, args.concat(args2))  //通过call来改变this指向
    }
    returnFn.prototype = fn.prototype  // 把新函数的原型指向原函数的原型
    return returnFn
}
//导出bind
module.exports = bind