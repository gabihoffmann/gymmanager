const express = require('express')
const routes = express.Router()
const instructors = require('./utils/instructors')

routes.get('/', (req,res) => {
    res.redirect('/instructors')
})

routes.get('/instructors', (req,res) =>{
    res.render('instructors/index')
})

routes.get('/instructors/create', (req,res)=>{
    res.render('instructors/create')
})

routes.get('/members', (req,res)=>{
    res.send('hello members')
})

routes.post('/instructors', instructors.post)

module.exports = routes