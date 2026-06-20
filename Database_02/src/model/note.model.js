const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: string,
    description: string,
})

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel