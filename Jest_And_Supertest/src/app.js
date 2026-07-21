const express = require("express")

const app = express()

app.use(express.json())


app.post("/post",(req,res)=>{
    res.status(201).json({
        message : "resource created successfully"
    })
})

app.post("/user",(req,res)=>{
    const {email,name} = req.body


    if(!email){
        return res.status(400).json({
            message: 'Email not found'
        })
    }


    if(!name){
        return res.status(400).json({
            message: 'Name not found'
        })
    }


    return res.status(201).json({
        message : "User created"
    })

})

module.exports = app
