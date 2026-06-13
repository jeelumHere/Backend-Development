// this file is used to start the server

const express = require("express")

const app = express() // server instant is created 

app.use(express.json()); // using middleware

module.exports = app
