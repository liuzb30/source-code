type Dictionary= {[key:string]:any}
function deepClone(target:any, cache=new Map()){
    if(target instanceof Object){
        if(cache.has(target)){
            return cache.get(target)
        }else{
            let cloneTarget:Dictionary;
            const targetType = getType(target)
            switch (targetType){
                case '[object Array]':
                    cloneTarget = []
                    break
                case '[object Function]':
                    cloneTarget = function (this:any){return target.apply(this,arguments)}
                    break
                case '[object RegExp]':
                    cloneTarget = new RegExp(target.source, target.flags)
                    break
                case '[object Date]':
                    cloneTarget = new Date(target)
                    break
                default:
                    cloneTarget = new Object()
            }
            cache.set(target,cloneTarget)
            for (let key in target){
                if(target.hasOwnProperty(key)) {
                    cloneTarget[key] = deepClone(target[key],cache)
                }
            }
            return cloneTarget
        }


    }
    return target
}

function getType(target:any){
    return Object.prototype.toString.call(target)
}

export default deepClone;