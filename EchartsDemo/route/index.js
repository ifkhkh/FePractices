var routeUtils = require('../utils/routeUtils')

var index = {
    path: '/',
    method: 'get',
    func: (request, response) => {
        var path = 'index.html'
        routeUtils.sendHtml(path, response)
    }
}

var routes = [
    index,
]

module.exports.routes = routes