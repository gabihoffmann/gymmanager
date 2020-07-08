const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()
// habilitando o body request de qualquer tipo
server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views",{
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5555, function(){
    console.log('Server is running on the port 5555')
})