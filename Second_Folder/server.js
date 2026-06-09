const express = require('express')

const app = express()

app.get("/",(req,res)=>{
    res.send("Hello World Again!!Tumm Tumm ")
})

app.get('/home',(req,res)=>{
    res.send("Home Page")
})

app.get('/contact',(req,res)=>{
    res.send("Contact Page")
})

app.listen(3000)