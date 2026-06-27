const express = require("express")

const postModel = require("./model/post.model")
const multer = require("multer")
const uploadFile = require("./services/storage.service")


const app = express()
const upload = multer({storage : multer.memoryStorage()})

app.post("/create-post", upload.single("image"), async (req, res) => {
    try {
        const result = await uploadFile(req.file.buffer)  // ✅ req.file.buffer
        console.log(result);

        const post = postModel.create({
            image : result.url,
            conten : req.body.Content
        })

        res.status(200).json({
            message: "data sent successfully"
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })  // ✅ actual response
    }
})

module.exports = app