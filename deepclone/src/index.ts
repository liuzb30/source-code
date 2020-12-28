type Dictionary= {[key:string]:any}
function deepClone(source:any, cache=new Map()){
    if(source instanceof Object){
        if(cache.has(source)){
            return cache.get(source)
        }else{
            let result:Dictionary;
            if(source instanceof Array){
                result= []
            }else if(source instanceof Function){
                result = function (this:any){
                    return source.apply(this,arguments)
                }
            }else if(source instanceof RegExp){
                result = new RegExp(source.source, source.flags)
            }else if(source instanceof Date){
                result = new Date(source)
            }else{
                result = new Object()
            }
            cache.set(source,result)
            for (let key in source){
                if(source.hasOwnProperty(key)) {
                    result[key] = deepClone(source[key],cache)
                }
            }
            return result
        }


    }
    return source
}

export default deepClone;