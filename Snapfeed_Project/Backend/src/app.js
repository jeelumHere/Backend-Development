const express = require("express")
const uploadFile = require("./service/storage.service")
const postModel = require("./model/post.model")
const multer = require("multer")

const upload = multer({ storage: multer.memoryStorage() })

const app = express()
app.use(express.json())

app.post("/create-post", upload.array("images", 5), async (req, res) => {
    try {
        const result = await Promise.all(
            req.files.map(file => uploadFile(file))
        )

        const images = result.map(data => ({
            url: data.url,
            fileId: data.fileId
        }))

        const post = await postModel.create({
            images: images,
            title: req.body.title,
            caption: req.body.caption
        })

        res.status(201).json({
            message: "Data posted successfully",
            post: post
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = app