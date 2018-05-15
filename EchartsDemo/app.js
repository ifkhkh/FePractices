//套路 引入 express, body-parser
// 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var routeUtils = require('./utils/routeUtils')
var log = console.log.bind(console)

//套路 配置静态文件目录(参数是文件根目录地址)
app.use(express.static('static'))
// 配置 bodyParser 把前端发过来的数据自动用 json 解析一下的套路
app.use(bodyParser.json())


// 注册响应函数
var indexRoutes = require('./route/index').routes
routeUtils.registerRoutes(app, indexRoutes)

var houseRoutes = require('./route/house').routes
routeUtils.registerRoutes(app, houseRoutes)



// listen 函数的第一个参数是我们要监听的端口, 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(9000, (...args) => {
    log('server', args, args.length)
    var host = server.address().address
    var port = server.address().port

    console.log(`本地服务器，访问地址为 http://${host}:${port}`)
})