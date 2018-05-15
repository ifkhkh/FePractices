var fs = require('fs')

var sendHtml = (path, response) => {
    var options = {
        encoding: 'utf-8',
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        response.send(data)
    })

}

var registerRoutes = (app, routes) => {
    for (let i = 0; i < routes.length; i++) {
        var route = routes[i]
        app[route.method](route.path, route.func)
    }
}

var routeUtils = {
    registerRoutes,
    sendHtml,
}

module.exports = routeUtils