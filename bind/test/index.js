const bind = require('../src/bind')


test1("fn.bind 能用");
test2("绑定this");
test3("能获取绑定时的参数");
test4("获取绑定后函数的参数");
test5("new 的时候绑定了 p1, p2");
test6("new 的时候绑定了 p1, p2，并且 fn 有 prototype.sayHi");
test7("不用 new 但是用类似的对象");

function test1(msg) {
    Function.prototype.bind2 = bind
    console.assert(typeof Function.prototype.bind2 === 'function') //断言bind2是一个函数
    console.log(msg);
}


function test2(msg) {
    const fn = function () { return this } // 返回this
    const newFn = fn.bind2({ name: 'xxx' }) // 绑定对象{name:'xxx'}
    console.assert(newFn().name === 'xxx') //断言返回的对象的name等于'xxx'
    console.log(msg)
}

function test3(message) {
    console.log(message);
    Function.prototype.bind2 = bind;
    const fn2 = function (p1, p2) {
        return [this, p1, p2];
    };

    const newFn2 = fn2.bind2({ name: "xxx" }, 124, 456);
    console.assert(newFn2()[0].name === "xxx", "this");
    console.assert(newFn2()[1] === 124, "p1");
    console.assert(newFn2()[2] === 456, "p2");
}

function test4(message) {
    console.log(message);
    Function.prototype.bind2 = bind;
    const fn2 = function (p1, p2) {
        return [this, p1, p2];
    };
    const anotherFn2 = fn2.bind2({ name: "xxx" }, 123);
    console.assert(anotherFn2(245)[0].name === "xxx", "this");
    console.assert(anotherFn2(245)[1] === 123, "p1");
    console.assert(anotherFn2(245)[2] === 245, "p2");
}

function test5(message) {
    console.log(message);
    Function.prototype.bind2 = bind;
    const fn = function (p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    };
    const fn2 = fn.bind2(undefined, "x", "y");
    const object = new fn2();
    console.assert(object.p1 === "x", "x");
    console.assert(object.p2 === "y", "y");
}

function test6(message) {
    console.log(message);
    Function.prototype.bind2 = bind;
    const fn = function (p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    };
    fn.prototype.sayHi = function () { };
    const fn2 = fn.bind2(undefined, "x", "y");
    const object = new fn2();
    console.assert(object.p1 === "x", "x");
    console.assert(object.p2 === "y", "y");
    // console.assert(object.__proto__ === fn.prototype);
    console.assert(fn.prototype.isPrototypeOf(object));
    console.assert(typeof object.sayHi === "function");
}

function test7(message) {
    console.log(message);
    Function.prototype.bind2 = bind;
    const fn = function (p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    };
    fn.prototype.sayHi = function () { };
    const object1 = new fn("a", "b");
    const fn2 = fn.bind2(object1, "x", "y");
    const object = fn2(); // 没有new
    console.assert(object === undefined, "object 为空");
    console.assert(object1.p1 === "x", "x");
    console.assert(object1.p2 === "y", "y");
}