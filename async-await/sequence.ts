const promise1= new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1')
    }, 4000)
})
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2')
    }, 3000)
})

type Task = {
    name:string;
    data:any;
}

const callbackList:Array<Task> = []
const sequence:Array<string> = []

sequence.push('p1')
promise1.then(res => callbackList.push({name: 'p1',data:res}))

sequence.push('p2')
promise2.then(res => callbackList.push({name: 'p2',data:res}))

console.log(sequence)

const timeId = setInterval(() => {
    if(sequence.length){
        const top = sequence[0]
        // 如果函数回调，则执行该函数，并删除
        const index = callbackList.findIndex(item=>item.name===top)
        if(index>=0){
            console.log(top)
            callbackList.splice(index,1)
            sequence.shift()
        }
    }else{
        clearInterval(timeId)
    }

}, 1000)