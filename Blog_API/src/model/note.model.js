const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now   // ← no parentheses here
  }
})

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel
