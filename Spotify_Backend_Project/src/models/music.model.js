import mongoose from "mongoose"

const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: [true, "url is required"],
        trim: true
    },
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "url is required"],
        trim: true
    },
    genre: {
        type: String,
        enum: ["Pop", "Rock", "Hip-Hop", "R&B", "Country", "Jazz", "Classical", "Electronic (EDM)", "Blues", "Metal", "Reggae", "Folk", "Soul", "Funk", "Punk"],
        required : true
    }
},{
    timestamps : true
})

export default mongoose.model("Music",musicSchema)