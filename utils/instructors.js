const fs = require('fs')
const data = require('../data/data.json')

exports.post = (req,res) =>{
    const keys = Object.keys(req.body)
    
    for(key of keys){
       if (req.body[key] === "")
        return res.send("Please, fill all fields")
    }

    //desestruturando req.body
    let {avatarUrl,name,birth,gender,services} = req.body

    //criando uma chave id
    const id = Number(data.instructors.length + 1)
    // modificando data
    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    
    data.instructors.push({
        id,
        avatarUrl,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("./data/data.json", JSON.stringify(data,null,2),function(err){
        if (err){
            console.log(err)
            return res.send("write file erro")
        }

        return res.redirect("/instructors")
    })
    
}