// nmp init -y => nodejs application initiate
// npm i express => install express package
const express = require('express')


const app = express() // expresss() => creates an instance of a server saving instace in the app variable


app.get("/",(req,res)=>{
    res.send("Hello World Again!!Tumm Tumm ")
})

app.get('/home',(req,res)=>{
    res.send("Home Page")
})

app.get('/contact',(req,res)=>{
    res.send("Contact Page")
})

app.listen(3000)  // this line of code starts the server