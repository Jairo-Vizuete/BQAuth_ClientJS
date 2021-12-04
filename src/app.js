var soapRoutes = require('./soap.router')
var express = require('express')
var app = express()
app.set('port',4000)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/soap",soapRoutes)

module.exports = app