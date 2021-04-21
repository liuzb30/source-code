const MyJson = {
    parse: function (str) {
        return eval('(' + str + ')')
    },
    stringify: function (obj) {
        let result = ''
        const type = Object.prototype.toString.call(obj)
        switch (type) {
            case '[object Object]':
                result = '{'
                // 遍历key
                Object.keys(obj).forEach(key => {
                    const value = this.stringify(obj[key])
                    if (value !== undefined) {
                        result = result + `"${key}":${value},`
                    }

                })
                if (result !== '{') {
                    result = result.slice(0, -1)
                }
                result += '}'
                break;
            case '[object Array]':
                retult = '['
                obj.forEach(item => {
                    result = result + this.stringify(item) + ','
                })
                if (result !== '[') {
                    result = result.slice(0, -1)
                }
                result += ']'
                break;

            case '[object Boolean]':
            case '[object Number]':
                result = obj.toString()
                break;
            case '[object String]':
                result = '"' + obj + '"'
                break;
            case '[object Null]':
                result = String(obj)
                break;
            default:
                result = undefined
        }

        return result
    }
}
const obj = {
    n: 1,
    s: '123',
    b: true,
    u: undefined,
    null: null,
    o: { b: 111 },
    a: [1, 2, 3]
}

console.log(MyJson.stringify(obj));