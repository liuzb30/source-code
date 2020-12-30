type Dictionary = { [key: string]: any }
// 用map来缓存访问过的对象
const map = new Map()

function deepClone(target: any) {
    const stack: any = []
    if (target instanceof Object) {
        // 把根节点入栈
        const root = {parent: null, key: null, value: target}
        stack.push(root)
        let current = stack.pop()
        let cloneTarget
        while (current) {
            const nodeValue = current.value
            // 根据对象类型不同创建不同的对象
            const temp: Dictionary = createObject(nodeValue)
            // 缓存对象
            map.set(nodeValue, temp)
            // 遍历属性
            for (let k in nodeValue) {
                if (!nodeValue.hasOwnProperty(k)) continue
                // 如果属性值已经缓存，则把缓存的值返回
                if (map.has(nodeValue[k])) {
                    temp[k] = map.get(nodeValue[k])
                } else if (nodeValue[k] instanceof Object) {
                    // 如果属性值是一个对象，则先入栈，后续再处理
                    stack.push({parent: temp, key: k, value: nodeValue[k]})
                } else {
                    // 属性值是普通类型，则直接赋值
                    temp[k] = nodeValue[k]
                }
            }
            // 父节点不存在则把临时变量赋值给cloneTarget，存在则把临时变量赋值给父节点的key
            current.parent ? (current.parent[current.key] = temp) : (cloneTarget = temp)
            // 处理下一个节点
            current = stack.pop()
        }
        return cloneTarget
    }
    return target

}

const createObject = (target: Object) => {
    let cloneTarget: Dictionary
    if (target instanceof Array) {
        cloneTarget = [] //如果是数组，则初始化为空数组
    } else if (target instanceof Function) {
        cloneTarget = function (this: any) {
            return target.apply(this, arguments)
        }
    } else if (target instanceof RegExp) {
        // 正则表达式对象会有两个属性，source和flags，分别对应构造函数的两个参数
        cloneTarget = new RegExp(target.source, target.flags)
    } else if (target instanceof Date) {
        cloneTarget = new Date(target)
    } else {
        cloneTarget = {} //否则初始化为空对象
    }
    return cloneTarget
}

export default deepClone