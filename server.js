const express = require('express')
const server = express()
const resize = require('./resize')

server.listen(8000, () => {
  console.log('Server started!')
})

server.get('/image', (req, res) => {
    const widthString = req.query.width
    const heightString = req.query.height
    const format = req.query.format
    
    let width, height
    if (widthString) {
      width = parseInt(widthString)
    }
    if (heightString) {
      height = parseInt(heightString)
    }

    res.type(`image/${format || 'jpg'}`)
    resize('images\\water.jpg', format, width, height).pipe(res);
})