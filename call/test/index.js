const call = require('../src')


test1('fn.myCall能用')
test2('能绑定this')
test3('能获取到参数')
test4('直接调用返回undefined')

function test1(msg) {
    console.log(msg);
    Function.prototype.myCall = call
    console.assert(typeof Function.prototype.myCall === 'function')
}

function test2(msg) {
    console.log(msg);
    function fn() { return this }
    const result = fn.myCall({ name: 'lzb' })
    console.assert(result.name, 'lzb')
}

function test3(msg) {
    console.log(msg);
    function fn(name) { this.name = name; return this }
    const result = fn.myCall({}, 'lzb')
    console.assert(result.name, 'lzb')
}

function test4(msg) {
    console.log(msg);
    Function.prototype.myCall = call
    console.assert(Function.prototype.myCall() === undefined)
}