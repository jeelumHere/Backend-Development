const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    image : String,
    content : String
})

const postModel = mongoose.model("post",postSchema)

module.exports = postModel