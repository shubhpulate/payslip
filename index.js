const express = require('express')
var app = express()
const bodyParser = require('body-parser');
//const _ = require('lodash')
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())  //Example of 3rd party middleware
const salary = require('./controller/salary')

app.post('/salary',salary.handler)

app.listen(3000,console.log("Server started"))

module.exports = app;