// 思路：
// 改变this指向：把目标函数作为对象的属性调用（为了解决属性冲突，可以用Symbol保证属性唯一)
// 获取不定长的参数：可以用arguments、ES6的解构
// 将不定长的参数传递给函数：eval、apply、ES6的解构
// 删除增加的属性
function call(ctx, ...args) {
    if (this === Function.prototype) {
        return undefined // 用于防止 Function.prototype.myCall() 直接调用
    }
    ctx = ctx || window || global
    const fn = Symbol()
    ctx[fn] = this
    const result = ctx[fn](...args)
    delete ctx[fn]
    return result
}

module.exports = call