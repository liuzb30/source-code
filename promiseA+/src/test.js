const MyPromise = require('./MyPromise2')
// 一、基本实现 then方法，executor马上执行，三个状态， 状态凝固

// const promise = new Promise((resolve, reject) => {
//     resolve('success')
//     reject('err')
// })

// promise.then(value => {
//     console.log('resolve', value)
// }, reason => {
//     console.log('reject', reason)
// })

// 二、在 Promise 类中加入异步逻辑
// const promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success')
//     }, 2000);
// })

// promise.then(value => {
//     console.log('resolve', value)
// }, reason => {
//     console.log('reject', reason)
// })
// 三、实现 then 方法多次调用添加多个处理函数
// const promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success')
//     }, 2000);
// })

// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
// })

// promise.then(value => {
//     console.log(2)
//     console.log('resolve', value)
// })

// promise.then(value => {
//     console.log(3)
//     console.log('resolve', value)
// })

// 四、实现 then 方法的链式调用.
// const promise = new MyPromise((resolve, reject) => {
//     // 目前这里只处理同步的问题
//     resolve('success')
// })

// function other() {
//     return new MyPromise((resolve, reject) => {
//         resolve('other')
//     })
// }
// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
//     return other()
// }).then(value => {
//     console.log(2)
//     console.log('resolve', value)
// })

// 五、是否返回自己
// const promise = new MyPromise((resolve, reject) => {
//     resolve('success')
// })

// // 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
// const p1 = promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
//     return p1
// })

// // 运行的时候会走reject
// p1.then(value => {
//     console.log(2)
//     console.log('resolve', value)
// }, reason => {
//     console.log(3)
//     console.log(reason.message)
// })

// 六、捕获错误
// const promise = new MyPromise((resolve, reject) => {
//     // resolve('success')
//     throw new Error('执行器错误')
// })

// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
// }, reason => {
//     console.log(2)
//     console.log(reason.message)
// })
// 2. then 执行错误
// const promise = new MyPromise((resolve, reject) => {
//     resolve('success')
//     // throw new Error('执行器错误')
// })

// // 第一个then方法中的错误要在第二个then方法中捕获到
// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
//     throw new Error('then error')
// }, reason => {
//     console.log(2)
//     console.log(reason.message)
// }).then(value => {
//     console.log(3)
//     console.log(value);
// }, reason => {
//     console.log(4)
//     console.log(reason.message)
// })

// 八、then 中的参数变为可选
// 情况一
// const promise = new MyPromise((resolve, reject) => {
//     resolve('succ')
// })

// promise.then().then().then(value => console.log(value))
// 情况二
// const promise = new MyPromise((resolve, reject) => {
//     reject('err')
// })

// promise.then().then().then(value => console.log(111, value), reason => console.log(222, reason))

// 九、实现 resolve 与 reject 的静态调用

MyPromise.resolve().then(() => {
    console.log(0);
    return MyPromise.resolve(4);
}).then((res) => {
    console.log(res)
})