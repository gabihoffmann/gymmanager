const fs = require('fs')
const Intl = require('intl')
const {age, date, blood} = require('../utils')
const data = require('../data/data.json')


exports.index = (req,res) =>{
    const members = data.members.map(member => member = {
        ...member,
    })
    res.render('members/index', { members })
}

exports.create = (req,res) => {
    res.render('members/create')
}

exports.show = (req,res) => {
    const {id} = req.params

    const foundMember = data.members.find(member => member.id == id)

    if(!foundMember) res.send('Member not founded!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        blood: blood(foundMember.blood)
    }

    return res.render('members/show', { member })
}

exports.edit = (req,res) => {
    const {id} = req.params

    const foundMember = data.members.find(member => member.id == id)

    if(!foundMember) res.send('Members not founded!')

    const member = {
        ...foundMember,
        birth :  date(foundMember.birth).iso
    }

    res.render('members/edit', { member })
}

exports.post = (req,res) => {
    
    const keys = Object.keys(req.body)

    for(key of keys){
        if (req.body[key] == "")
            return res.send("Please, fill all fields!")
    }

    let id = 1;
    const lastMember = data.members[data.members.length - 1]

    if(lastMember){
        id = lastMember.id + 1
    }
    
    birth = Date.parse(req.body.birth)

    data.members.push({
        id,
        ...req.body,
        birth,
    })

    fs.writeFile("./data/data.json", JSON.stringify(data,null,2), function(err){
        if(err){
            console.log(err)
            return res.send('write file error')
        }
    })

    return res.redirect('/members')
}

exports.put = (req,res)=> {
    const keys = Object.keys(req.body)

    for(key of keys){
        if (req.body[key] == "")
            return res.send("Please, fill all fields!")
    }

    const {id} = req.body
    let index = 0

    const foundMember = data.members.find((member,foundIndex) => {
        if(member.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundMember) res.send("Member not found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth : Date.parse(req.body.birth),
        id : Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("./data/data.json", JSON.stringify(data,null,2), function(err){
        if(err) res.send('Write file error')

        return res.redirect('/members')
    })

}

exports.delete = (req,res) => {
    const {id} = req.body

    const filteredMembers = data.members.filter(member => member.id != id)

    data.members = filteredMembers

    fs.writeFile('./data/data.json', JSON.stringify(data,null,2), function(err){
        if(err) res.send('File write error!')

        return res.redirect('/members')
    })
}