var fs = require('fs')


var loadHouses = () => {
    var path = './db/Jiangning.json'
    var file = fs.readFileSync(path, 'utf-8')
    var data = JSON.parse(file)
    return data
}

var house = {
    data: loadHouses(),
}

module.exports = house