// 思路：
// 改变this指向：可以把目标函数作为这个对象的属性
// 将数组参数传递给函数：eval、ES6的解构
// 不能删除对象的属性，所以在结尾要删除
// 新版API 
function apply(ctx, arr) {
    if (this === Function.prototype) {
        return undefined
    }
    ctx = ctx || global || window
    ctx.fn = this
    const result = arr ? ctx.fn(...arr) : ctx.fn()
    delete ctx.fn
    return result
}

// 旧版API
function apply(ctx, arr) {
    if (this === Function.prototype) {
        return undefined
    }
    ctx = ctx || global || window
    ctx.fn = this
    let result
    if (!arr) {
        result = ctx.fn()
    } else {
        var args = []
        for (var i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('ctx.fn(' + args + ')')
    }
    delete ctx.fn
    return result
}

module.exports = apply