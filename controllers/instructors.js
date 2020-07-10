const fs = require('fs')
const Intl = require('intl')
const data = require('../data/data.json')
const {age, date} = require('../utils')


//index
exports.index = (req,res) => {

    const instructors = data.instructors.map(instructor => instructor = {
            ... instructor,
            services: instructor.services.split(',')
    })

    return res.render('instructors/index', {instructors})
}

//show
exports.show = (req,res) =>{
    //req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    if(!foundInstructor) return res.send('instructor not found')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
    }

    return res.render('instructors/show', {instructor})

}
//post
exports.post = (req,res) => {
    const keys = Object.keys(req.body)
    
    //validação
    for(key of keys){
       if (req.body[key] === "")
        return res.send("Please, fill all fields")
    }

    //tratamento
    //desestruturando req.body - para pegar apenas os valores que necessita
    let {avatarUrl,name,birth,gender,services} = req.body

    let id = 1
    const lastInstructor = data.instructors[data.instructors.length -1]

    if(lastInstructor){
        id = lastInstructor.id + 1
    }

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
            return res.send("write file error")
        }

        return res.redirect("/instructors")
    })
    
}

//edit
exports.edit = (req,res) => {
    const { id } = req.params

    const foundInstructor = data.instructors.find(instructor => instructor.id == id)

    if(!foundInstructor) return res.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        birth : date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor })

}

//put
exports.put = (req,res) => {

    const {id} = req.body
    let index = 0

    const foundInstructor = data.instructors.find((instructor,foundIndex) => {
        if(instructor.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor) res.send('Instructor not found!')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id : Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("./data/data.json",JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        return res.redirect(`/instructors/${id}`)
    })

}

//delete
exports.delete = (req,res) => {
    const {id} = req.body

    const filteredInstructors = data.instructors.filter(instructor => instructor.id != id)

    data.instructors = filteredInstructors

    fs.writeFile('./data/data.json', JSON.stringify(data,null,2), function(err){
        if(err) res.send('File write error!')

        return res.redirect('/instructors')
    })

}


//create - render
exports.create = (req,res)=>{
    res.render('instructors/create')
}