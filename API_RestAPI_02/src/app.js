// this file is used to start the server

const express = require("express")

const app = express() // server instant is created 

app.use(express.json()); // using middleware

const note = []

app.post("/note",(req,res)=>{
    console.log(req.body);
    note.push(req.body);

    res.status(201).json({
        message : "note created successfully"
    })
})

app.get("/note",(req,res)=>{
    res.status(200).json({
        message : "Notes fethed successfully",
        note : note
    })
})


module.exports = app
