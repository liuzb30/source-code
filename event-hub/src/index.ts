type Fn = (data:unknown)=>void

export class EventHub {
    catch:{[key:string]:Array<Fn>} = {}

    on(eventName:string, fn:Fn) {
        this.catch[eventName] = this.catch[eventName] || []
        this.catch[eventName].push(fn)
    }

    emit(eventName:string, data?:unknown) {
        this.catch[eventName]?.forEach(fn => fn(data))
    }

    off(eventName:string, fn:Fn) {
        let index = indexOf(this.catch[eventName], fn)
        if (index !== -1) {
            this.catch[eventName].splice(index, 1)
        }
    }
}

/**
 * 帮助函数 indexOf
 * @param array
 * @param item
 */
function indexOf(array:any[], item:Fn){
    if (array == null) return -1
    let index = -1
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            index = i
        }
    }
    return index
}