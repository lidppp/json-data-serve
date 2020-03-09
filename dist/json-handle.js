// 引入文件操作模块
var fs = require("fs")
// 引入path 路径操作模块
var path = require("path")

function readJson(url, queryObj) {
    // 处理url 默认路径为/的时候去寻找index.json
    if (url === "/") {
        url = path.join("./", "index.json")
    } else {
        // 否则判断是否拥有.json后缀
        if(url.indexOf(".json")=== -1){
            url = path.join("./", url) + ".json"
        }else{
            url = path.join("./", url)
        }
    }
    // 获取可枚举的对象的key值
    var arr = Object.keys(queryObj)
    // 封装Promise对象进行后续处理
    return new Promise(function (resolve, reject) {
        // readFile是异步函数
        fs.readFile(url, "utf8", function (err, data) {
            if (err) {
                // 如果报错 抛出异常到catch中
                return reject(err)
            }
            if (arr.length == 0) {
                // 如果query查询为空 直接返回json全部内容
                return resolve(data)
            }
            // 否则返回匹配到的对象
            var mateObj = []
            var dataObj = JSON.parse(data)
            // 此处 先循环json中的数据
            // 再循环query中的数据
            // 最后判断匹配
            for (let i = 0; i < dataObj.length; i++) {
                let flag = 0
                for (let j = 0; j < arr.length; j++) {
                    if (dataObj[i][arr[j]] == queryObj[arr[j]]) {
                        flag ++
                    }
                    console.log(flag,arr.length-1)
                    if(flag === arr.length){
                        mateObj.push(dataObj[i])
                    }
                }
            }
            return resolve(JSON.stringify(mateObj))
        })
    })
}
// 老生常谈的话题,可以直接exports.xxx = xxx
// 但是 exports 指向 module.exports , 而实际导出的是 module.exports
// 如果直接赋值会改变exports的指向,从而无法导出
// 所以如果只想导出一个 变量或者方法或者类 需要加module
module.exports = readJson