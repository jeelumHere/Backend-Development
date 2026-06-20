// creates the server

const express = require("express")
const noteModel= require("./model/note.model")


const app = express()
app.use(express.json())

/*
POST =>  /Note =>   create a note
GET  =>  /Note =>   Get all notes
DELETE=> /Note/:id  Delete a note on server
PATCH => /NOTE/:id  Update anote on the server
 */



module.exports = app
