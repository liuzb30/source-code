const p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('p1')},4000)

})
const p2 = new Promise((resolve, reject) => {
    setTimeout(()=>{resolve('p2')},3000)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(()=>{resolve('p3')},5000)
})

const arr=[p1,p2,p3]

// arr.map(async p=> await p)

async function forLoop(){
    for(let i=0;i<arr.length;i++){
        const res = await arr[i]
        console.log(res)
    }
}

// arr.forEach(async p=>{
//     const res = await p
//     console.log(res);
// })

const mapLoop = async ()=>{
    const promises = arr.map(async p=>{
        const res = await p
        return res
    })
    const result = await Promise.all(promises)
    console.log(result)
}

// forLoop()
mapLoop()