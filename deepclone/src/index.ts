type Dictionary = {[key:string]:any}
// 用map来缓存访问过的对象
const map = new Map()
function deepClone(target:any){
    // 判断是否对象类型
    if(target instanceof Object){
        // 判断是否缓存过
        if(map.has(target)){
            // 有则直接返回
            return map.get(target)
        }else{
            let cloneTarget:Dictionary
            if(target instanceof Array){
                cloneTarget = [] //如果是数组，则初始化为空数组
            }else if(target instanceof Function){
                cloneTarget = function (this:any){
                    return target.apply(this, arguments)
                }
            }else if(target instanceof RegExp){
                // 正则表达式对象会有两个属性，source和flags，分别对应构造函数的两个参数
                cloneTarget = new RegExp(target.source, target.flags)
            }else if(target instanceof Date){
                cloneTarget = new Date(target)
            }else{
                cloneTarget = {} //否则初始化为空对象
            }
            // 需要在递归之前缓存
            map.set(target,cloneTarget)
            for(let key in target){
                // 过滤原型属性
                if(target.hasOwnProperty(key)) {
                    // 遍历每个属性并返回复制后的值
                    cloneTarget[key] = deepClone(target[key])
                }
            }
            return cloneTarget
        }

    }
    return target  // 普通类型只要直接返回即可
}
export default deepClone