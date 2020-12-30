
// Promise.all([p1,p2,p3]).then(res=>{
//     console.log('res',res)
// },err=>{
//     console.log('err',err)
// })
//
// Promise.allSettled([p1, p2, p3]).then(res => {
//     console.log('res', res)
// })
// @ts-ignore
Promise.prototype.allSettled2 = (promises: Array<any>) => {
    return Promise.all(promises.map((p: Promise<any>) => p.then(
        res => ({status: 'fulfilled', value: res}),
        err => ({status: 'rejected', reason: err}))))
}


const testAllSettled = ()=>{
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('p1')
        }, 4000)

    })
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('p2')
        }, 3000)
    })

    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('p3')
        }, 5000)
    })

    // @ts-ignore
    Promise.allSettled2([p1, p2, p3]).then(res => {
        console.log(res);
    })
}

testAllSettled()