var express = require('express')
var app = express()

//app.use(bodyParser.json())
app.all('/getJSON', ({req, res}:any) => {
  //res.json({ data: 'data' })
  res.send('hello world')
})

module.exports = app