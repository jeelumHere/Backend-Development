const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    image : String,
    content : String
})

const postModel = mongoose.model("Data",postSchema)

module.exports = postModel