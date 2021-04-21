const apply = require('../src')

test1('fn.myApply可用')
test2('Function.prototype.myApply()返回undefined')
test3('可以绑定上下文')
test4('不传上下文则this指向全局')
test5('能获取到参数')

function test1(msg) {
    console.log(msg);
    Function.prototype.myApply = apply
    console.assert(typeof Function.prototype.myApply === 'function')
}
function test2(msg) {
    console.log(msg);
    console.assert(Function.prototype.myApply() === undefined)
}
function test3(msg) {
    console.log(msg);
    function fn() { return this }
    const result = fn.myApply({ name: 'lzb' })
    console.assert(result.name === 'lzb')
}
function test4(msg) {
    console.log(msg);
    function fn() { return this }
    const result = fn.myApply()
    console.assert(result === global)
}
function test5(msg) {
    console.log(msg);
    function fn(name) { this.name = name; return this }
    const result = fn.myApply({}, ['lzb'])
    console.assert(result.name === 'lzb')
}