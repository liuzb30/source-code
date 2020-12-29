type Dictionary = {[key:string]:any}
function deepClone(target:any){
    // 判断是否对象类型
    if(target instanceof Object){
        let cloneTarget:Dictionary
        if(target instanceof Array){
            cloneTarget = [] //如果是数组，则初始化为空数组
        }else{
            cloneTarget = {} //否则初始化为空对象
        }
        for(let key in target){
            // 遍历每个属性并返回复制后的值
            cloneTarget[key] = deepClone(target[key])
        }
        return cloneTarget
    }
    return target  // 普通类型只要直接返回即可
}
export default deepClone