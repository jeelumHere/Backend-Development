// starts the server

const express = require("express")

const app = express()

app.use(express.json())  // using middleware for reading

const note = []

app.post("/note",(req,res)=>{
    note.push(req.body);
})

app.get("/note",(req,res)=>{
    res.status(200).json({
        message : "Data fetched successfully",
        note : note    
    })    
})

// /note/:index   : is used with the dynamic value 

app.delete("/note/:index",(req,res)=>{

    const index = req.params.index // returns the index 

    delete note[ index ]

    res.status(200).json({
        message : "Note Deleted Successfully"
    })

})

module.exports = app