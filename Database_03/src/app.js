// creates the server

const express = require("express")
const noteModel  = require("./model/note.model")

const app = express()
app.use(express.json())

app.post("/note", async(req,res)=>{

    const data = req.body

    await noteModel.create({
        title : data.title,
        description : data.description
    })

    res.status(201).send({
        message : "Note reated successfully"
    })
})


// app.get("/note", async (req,res)=>{

//     const note = await noteModel.find()  // find method always return an array

//     res.status(201).json({
//         message : "Data fetched successfully",
//         notes : note
//     })
// })

app.get("/note", async (req,res)=>{
    const note =  await noteModel.find({
        title : "print development"
    })

    res.status(201).send({
        message : "Data fetched successfully",
        note : note
    })
})

module.exports = app
