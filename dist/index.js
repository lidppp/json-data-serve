// 引入express
var express = require("express")
/*post方法*/
var bodyParser = require('body-parser');
// 引入命令行同步输入工具 进行配置端口号与api接口开头
var readline = require('readline-sync');
// 引入自己编写的读取JSON文件
var readJson = require("./json-handle")
// 启动express
var app  = express()
// 定义url开头与端口号
var urlStar,port;
// urlStar 校验失败后执行的方法
function urlStarFn(){
        console.log("Please enter the API request header(请输入API请求首)(For example '/api')(比如 '/api')")
        console.log("(You can press enter to not configure.Default is '/')(你可以按回车不进行配置.默认为 '/')")
        console.log("Request must start with \"/\",And it is composed of [a-zA-Z0-9]")
        console.log("请求首必须以\"/\"开始,并且以[a-zA-z0-9]组成")
        urlStar = readline.question("> ") || "/";
        console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+")
    // 校验失败后递归调用本方法直到校验成功
    if(!(/^(\/)([a-zA-Z0-9])*$/.test(urlStar))){
        urlStarFn(true)
    }
}
// 端口号校验失败后执行的方法
function portFn(flag){
        console.log("Please specify port.(You can press enter to not configure. The default port is 3000)")
        console.log("请指定端口.(你可以按回车不进行配置. 默认端口为3000)")
        console.log("Port must be a pure number and  Port should be >= 0 and < 65536")
        console.log("端口必须为纯数字,端口号需要  >= 0 并且 < 65536")
        port = (readline.question("> ") || "3000");
        console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+")
    // 校验失败后递归调用本方法直到校验成功
    if(!(/^[0-9]+$/.test(port)) || !(parseInt(port)>=0 && parseInt(port)< 65536)){
        portFn(true)
    }
}
// 这里 process.argv 获取系统变量
//  [ 'D:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\15122\\AppData\\Roaming\\npm\\node_modules\\JSONDataServe\\index.js',
//   '3000' ]
// 从下标为3开始为用户自己填入的参数
// 默认先传端口号再传urlStar
port = process.argv[2]|| "3000"
urlStar = process.argv[3] || "/"

// 执行端口号与urlStat的校验
if(!(/^[0-9]+$/.test(port)) || !(parseInt(port)>=0 && parseInt(port)< 65536)){
    portFn(true)
}
if(!(/^(\/)([a-zA-Z0-9])*$/.test(urlStar))){
    urlStarFn(true)
}

// 配置跨域请求
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));
// 处理浏览器请求图标
app.use("/favicon.ico",function(req,res,next){
    res.status(500).send()
})
// json文件处理中间件
// 中间件中将匹配紧随其后的任何路径，并带有“ /”。例如：app.use('/apple', ...)将匹配“ / apple”，“ / apple / images”，“ / apple / images / news”，等等。
// req.path会将 urlStar 去掉 只剩下后面的路径
// 如 app.use('/apple', ...)将匹配“ / apple”  , “ / apple / images”  但是 “ / apple / images”请求过来的路径 中间件中的req.path 为 "/image"
app.use(urlStar,function(req,res,next){
    // 定义请求体
    let queryObj;
    // 获取query对象的长度,如果为0则使用body对象,由此来判断是否为Get或者Post方法
    // 如果都为空,那没事,在json-handle中处理了
    if(Object.keys(req.query).length){
        queryObj = req.query
    }else{
        console.log(req.body)
        queryObj = req.body
    }
    // console.log('path',req.path)
    // 此处可以加 .json 也可以不加.json  会自动补齐
    readJson(req.path,queryObj).then(function(data){
        res.send(data)
    }).catch(function (err) {
        // 这里直接跳转到全局err处理函数中
        next(err)
    })
})

// 全局err处理
// 注意 全局err处理函数中的回调函数必须为四个参数, 否则将会被当做普通的use被处理
app.use(function(err,req,res,next){
    res.status(500).set("Content-Type","text/html").send(`
    <style>
        @keyframes myfirst
        {
        from {top:0}
        to {top:300px}
        }
    </style>
    <div style='animation: myfirst 2s;-moz-animation: myfirst 2s;	-webkit-animation: myfirst 2s;-o-animation: myfirst 2s;animation-fill-mode: forwards;position: absolute;left: 0;right: 0;top: 300px;text-align: center;font-weight: 700;'> Can Not Find File </div>
    `)
})
app.listen(parseInt(port),function (data) {
    console.log(`Request address is http://localhost:${port}${urlStar}`)
})