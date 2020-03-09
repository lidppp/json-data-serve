## JSON-data-serve
[中文说明](./README_zh.md) 

[GitHub](https://github.com/lidppp/json-data-serve) 

Please give me a star if you like , thank you very much indeed

### Install
```powershell
npm install json-data-serve -g
```
**You need to start the command in the JSON folder directory**
### Use
#### Start with default settings 
The default port is **3000** and the default request address is **'/'**
```powershell
> json-serve
```

#### Configure request address
```powershell
> json-serve 3000 /api
```
> Attention cannot be omitted **'/'**  
> If the request address is configured, the port number cannot be omitted

#### Configure port number only 
```powershell
> json-serve 3000 
```
> Request address can be omitted
>  default request address is **'/'**

#### Example

Suppose I have a JSON file in the `D:/json` folder and need to open the service 
 
shell Code
```powershell
D:/json> json-serve 8888 /api
```

JavaScript Code 
```javascript
$.ajax({
    url:"http://localhost:8888/api/db.json",
    type: "POST",
    success: function(msg){
     console.log(msg)
   }
})
// perhaps
$.ajax({
    url:"http://localhost:8888/api/db.json",
    type: "GET",
    success: function(msg){
     console.log(msg)
   }
})
```
`GET` method and `POST` method output are the same
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
You can do the same 
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
outPut
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
This plug-in only receives GET requests and POST requests 

If you initiate a put request or a delete request, the query result will be returned, and the JSON file will not be modified

And GET requests take precedence over POST requests

If both URL query and POST request body are passed in, the query in GET request will be returned

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
outPut
```json
[
    {
        "id": 1,
        "name": "张一",
        "sex": "1"
    }
]
```
> You can omit the file suffix `.json`
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
### Finally, if you have any suggestions, you can send them to 1512282028@qq.com

