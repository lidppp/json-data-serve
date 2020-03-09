## JSON-data-serve
[English explanation](./README.md) 

[GitHub](https://github.com/lidppp/json-data-serve) 

如果您喜欢这个插件请给我一个star,万分感谢
### 安装
```powershell
npm install json-data-serve -g
```
**您需要在JSON文件夹目录中启动该命令**
### 使用
#### 默认参数启动
默认端口为 **3000** 默认请求地址为 **'/'**
```powershell
> json-serve
Request address is http://localhost:3000/
```

#### 配置请求地址
```powershell
> json-serve 3000 /api
```
> 注意不能省略 **'/'**  
> 如果您配置了请求地址,则必须配置端口号

#### 配置端口口号
```powershell
> json-serve 3000 
```
> 可以不进行请求地址的配置 

> 默认请求地址为 **'/'**

#### Example

如果我在`D:/json`有json文件,并且需要开启服务 
 
命令行代码
```powershell
D:/json> json-serve 8888 /api
```

JavaScript 代码 
```javascript
$.ajax({
    url:"http://localhost:8888/api/db.json",
    type: "POST",
    success: function(msg){
     console.log(msg)
   }
})
// 或者
$.ajax({
    url:"http://localhost:8888/api/db.json",
    type: "GET",
    success: function(msg){
     console.log(msg)
   }
})
```
`GET` 方法和 `POST` 方法返回值是一样的
```json
[
    {
        "id": 1,
        "name": "张一",
        "sex": "1"
    },
    {
        "id": 2,
        "name": "张二",
        "sex": "0"
    },
    {
        "id": 3,
        "name": "张三",
        "sex": "1"
    },
    {
        "id": 4,
        "name": "张四",
        "sex": "0"
    }
]
```
您也可以这么做
```javascript
$.ajax({
    url:"http://localhost:8888/api/db.json?sex=1&id=1",
    type: "GET",
    success: function(msg){
     console.log(msg)
   }
})
// perhaps
$.ajax({
    url:"http://localhost:8888/api/db.json",
    type: "POST",
    data:{sex:1,id:1},
    success: function(msg){
     console.log(msg)
   }
})
```
输出
```json
[
    {
        "id": 1,
        "name": "张一",
        "sex": "1"
    }
]
```

#### Explain 
本插件仅支持GET请求和POST请求 
 
如果是PUT请求或者DELETE请求,一样会返回查询后的结果,并不会对JSON文件进行修改 

并且GET请求的优先级大于POST请求 

如果同时传入URL查询和POST请求体，则返回GET请求中的查询
```javascript
$.ajax({
    url:"http://localhost:8888/api/db.json?sex=1&id=1",
    type: "POST",
    data:{id:2},
    success: function(msg){
     console.log(msg)
   }
})
```
输出
```json
[
    {
        "id": 1,
        "name": "张一",
        "sex": "1"
    }
]
```
>你可以省略文件后缀名 `.json`
```javascript
$.ajax({
    url:"http://localhost:8888/api/db",
    type: "POST",
    data:{id:2},
    success: function(msg){
     console.log(msg)
   }
})
```
```json
[
    {
        "id": 2,
        "name": "张二",
        "sex": "0"
    }
]
```
### 最后，如果您有任何建议，可以发送到1512282028@qq.com

