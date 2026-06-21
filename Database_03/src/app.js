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


app.get("/note", async (req,res)=>{

    const note = await noteModel.find()  // find method always return an array

    res.status(201).json({
        message : "Data fetched successfully",
        notes : note
    })
})

// app.get("/note", async (req,res)=>{
//     const note =  await noteModel.findOne({
//         title : "print development"
//     })

//     res.status(201).send({
//         message : "Data fetched successfully",
//         note : note
//     })
// })


app.delete("/note/:id",async (req,res)=>{

    const id = req.params.id;

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(201).json({
        message : "Data found in database and deleted",

        Deleted_id : id

    })

})

app.patch("/note/:id",async(req,res)=>{
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({
        _id :id
    },{
        description : description
    })

    res.status(201).json({
        message : "Data updated succesfully"
    })
})

module.exports = app
