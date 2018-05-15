const house = require('../model/house')

const all = {
    path: '/api/house/all',
    method: 'get',
    func: (request, response) => {
        var info = house.data
        var data = JSON.stringify(info)
        response.send(data)
    }
}

var routes = [
    all,
]

module.exports.routes = routes