var fs = require("fs")
var iconvLite = require("iconv-lite")

// var syncWriteFile = (path, data) => {
//     fs.writeFileSync(path, data)
// }
var syncWriteFile = fs.writeFileSync.bind(fs)

var readFileGBKSync = (path) => {
    var data = fs.readFileSync(path)
    var parseData = iconvLite.decode(data, "GB2312")
    return parseData
}

var checkFileExists = (path) => {
    var exists = fs.existsSync(path)
    return exists
}


// 创建目录
var createDir = (path) => {
    // 检查 path 是否存在
    var isExists = checkFileExists(path)
    if (isExists) {
        return
    }
    // 不存在就创建
    fs.mkdirSync(path)
}

var moveSpace = (string) => {
    var result = ''
    for (let i = 0; i < string.length; i++) {
        var char = string[i]
        if (char == ' ' || char == '\n') {
            continue
        }
        result += char
    }
    return result
}

var utils = {
    syncWriteFile,
    readFileGBKSync,
    checkFileExists,
    createDir,
    moveSpace,
}

module.exports = utils