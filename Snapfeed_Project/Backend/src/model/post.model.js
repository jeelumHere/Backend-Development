const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [
        {
            url: { type: String, required: true },
            fileId: { type: String, required: true } // needed later for ImageKit delete
        }
    ],
    caption: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
