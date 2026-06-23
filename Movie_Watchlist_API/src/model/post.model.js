const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  director: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: ["action", "comedy", "horror", "drama", "sci-fi"]
  },
  isWatched: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Movie = mongoose.model("Movie", movieSchema)
module.exports = Movie
