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

module.exports = app
