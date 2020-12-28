function deepClone(source:any){
    if(source instanceof Object){
        if(source instanceof Array){
            const result:Array<any> = []
            for(let key in source){
                result[key] = deepClone(source[key])
            }
            return result
        }else if(source instanceof Function){
            const result:any = function (){
                return source.apply(this, arguments)
            }
            for(let key in source){
                result[key] = deepClone(source[key])
            }
            return result
        }else{
            let result:{[key in typeof source]:any} = {}
            for(let key in source){
                result[key] = deepClone(source[key])
            }
            return result
        }

    }
    return source
}

export default deepClone;