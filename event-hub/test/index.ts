import {EventHub} from "../src";

type TestCase = (message:string)=>void;

const test1:TestCase = message => {
    const eventHub = new EventHub()
    console.assert(eventHub instanceof Object, 'eventHub是一个对象')
    console.log(message)
}

const test2:TestCase = message => {
    const eventHub = new EventHub()
    let called = false
    eventHub.on('xxx', (data) => {
        called = true
        console.assert(data==='发送的数据','接收的数据不匹配')
    })
    eventHub.emit('xxx','发送的数据')
    setTimeout(() => {
        console.assert(called, '事件被调用了')
    })
    console.log(message)
}

const test3:TestCase = message => {
    const eventHub = new EventHub()
    let called = false
    const fn = () => {
        called = true
    }
    eventHub.on('xxx', fn)
    eventHub.off('xxx', fn)
    eventHub.emit('xxx')
    setTimeout(() => {
        console.assert(!called, '事件被调用了，off无效')
    })
    console.log(message)
}

test1('eventHub是一个对象')
test2('eventHub可以监听事件')
test3('eventHub可以取消监听')