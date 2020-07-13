
const Intl = require('intl')
const {age, date, blood} = require('../../lib/utils')

module.exports = {
    index(req,res){
        const members = data.members.map(member => member = {
            ... member,
            services: member.services.split(',')
    })

    return res.render('members/index', {members})
    },

    create(req,res){
        res.render('members/create')
    },

    post(req,res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
           if (req.body[key] === "")
            return res.send("Please, fill all fields")
        }
    
        let {avatarUrl,name,birth,gender,services} = req.body

        return
    },

    show(req,res){
        return 
    },

    edit(req,res){
        return
    },

    put(req,res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
           if (req.body[key] === "")
            return res.send("Please, fill all fields")
        }
    
        let {avatarUrl,name,birth,gender,services} = req.body

        return
    },
    
    delete(req,res){
        return
    },
}

