// creates the sever

const express = require("express")
const noteModel = require("./model/note.model")



const app = express()
app.use(express.json())

module.exports = app