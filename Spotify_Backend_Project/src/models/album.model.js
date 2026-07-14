import mongoose from "mongoose"

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        url: {
            type: String
        }
    },
    tracks: [
        {
            title: {
                type: String,
                required: true
            },
            audioUrl: {
                type: String,
                required: true
            },
            music : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "musics",
                required :true
            }
        }
    ],
    releaseDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const albumModel = mongoose.model("Album", albumSchema)

export default albumModel