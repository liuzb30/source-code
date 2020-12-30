const p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{reject('p1')},4000)

})
const p2 = new Promise((resolve, reject) => {
    setTimeout(()=>{reject('p2')},3000)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(()=>{resolve('p3')},5000)
})

// Promise.all([p1,p2,p3]).then(res=>{
//     console.log('res',res)
// },err=>{
//     console.log('err',err)
// })
//
// Promise.allSettled([p1, p2, p3]).then(res => {
//     console.log('res', res)
// })
x = p => p.then(
    res => ({status: 'fulfilled', value: res}),
    err => ({status: 'rejected', reason: err}))
Promise.allSettled2 = promises => {
    return Promise.all(promises.map(x))
}

Promise.allSettled2([p1, p2, p3]).then(res => {
    console.log(res);
})