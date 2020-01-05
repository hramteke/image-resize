const fs = require('fs')
const sharp = require('sharp')
const request = require('request')

module.exports = function resize(path, format, width, height, isUrl) {
    let outputFileName
    if(width && height) {
        outputFileName = path.substring(0, path.lastIndexOf('.')) + '_' + width + 'x' + height + '.' + format
    } else if (width) {
        outputFileName = path.substring(0, path.lastIndexOf('.')) + '_' + width + 'x' + width + '.' + format
    } else if (height) {
        outputFileName = path.substring(0, path.lastIndexOf('.')) + '_' + height + 'x' + width + '.' + format
    } else {
        outputFileName = path
    }
    
    let readStream
    if(!fs.existsSync(outputFileName)) {
        readStream = fs.createReadStream(path)
        let transform = sharp()

        if (format) {
            transform = transform.toFormat(format)
        }
    
        if (width || height) {
            transform = transform.resize(width, height).toFile(outputFileName, (err, info) => {
                if(err) {
                    console.log(err)
                }
            })
        }

        return readStream.pipe(transform)
    } else {
        readStream = fs.createReadStream(outputFileName)
        return readStream
    }
}
