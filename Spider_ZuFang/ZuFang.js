var syncRequest = require("sync-request")
var cheerio = require("cheerio")

var utils = require("./utils")
var log = console.log.bind(console)

class House {
    constructor() {
        this.info = ''
        this.area = 0
        this.forward = ''
        this.position = ''
        this.price = ''
    }
}


var createCacheDir = () => {
    utils.createDir('houseCache')
}

var getHTML = (newUrl) => {
    var r = syncRequest('GET', newUrl)
    var body = r.getBody()
    return body
}

var houseFromUrl = () => {
    var baseUrl = 'http://zu.nanjing.fang.com/house-a0268/i3'
    for (let i = 1; i < 41; i++) {
        var newUrl = baseUrl + i
        // 发送请求到 url 得到 html
        var body = getHTML(newUrl)
        var path = `houseCache/${i}.html`
        // 写入缓存文件夹
        if (utils.checkFileExists(path)) {
            continue
        } else {
            utils.syncWriteFile(path, body)
        }
    }
}

var transElementToObject = (element) => {
    // 新建对象
    var house = new House()

    var e = cheerio.load(element)
    // 避开扫码广告
    var item = e('.saoma').text()
    if (item == '') {
        var infoString = e('.font16').text()
        infoString = utils.moveSpace(infoString)
        var infoArray = infoString.split('|')
        house.info = infoArray[1]
        house.area = Number(infoArray[2].slice(0, infoArray[2].length - 1))
        house.forward = infoArray[3]

        var infoPosition = e('.gray6').text()
        infoPosition = utils.moveSpace(infoPosition)
        house.position = infoPosition.split('-')[1]

        var priceElement = e('.price')
        house.price = Number(priceElement.text())
        return house
    }
}

var transHTMLToObject = (html) => {
    var houses = []
    // 变为可操作 DOM
    var e = cheerio.load(html)
    // 选取单页中全部 house
    var items = e('.info')
    for (let i = 0; i < items.length; i++) {
        var it = items[i]
        // 从单个 house 中解析数据
        var houseItem = transElementToObject(it)
        houses.push(houseItem)
    }
    return houses
}

var readHTML = () => {
    var houses = []
    // 循环读取每一个 html
    for (let i = 1; i < 41; i++) {
        var path = `houseCache/${i}.html`
        var html = utils.readFileGBKSync(path)
        // 将单个 html 操作成 数据
        var singelData = transHTMLToObject(html)
        houses = [...houses, ...singelData]
    }
    return houses

}

var saveHouse = (data) => {
    var s = JSON.stringify(data, null, 2)
    var path = 'Jiangning.json'
    utils.syncWriteFile(path, s)
}

var __main = () => {
    // 创建缓存目录
    createCacheDir()

    houseFromUrl()
    var data = readHTML()
    saveHouse(data)
}

__main()