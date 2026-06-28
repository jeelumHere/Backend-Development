const express = require("express")
const postModel = require("./model/post.model")
const multer = require("multer")
const uploadFile = require("./service/storage.service")
const upload = multer({ storage: multer.memoryStorage() })


const app = express()

app.post("/create-post", upload.single('image'), async (req, res) => {

    try {
        const result = await uploadFile(req.file.buffer)
        console.log(req.body);
        console.log(result);
        const post = await postModel.create({
            image: result.url,
            content: req.body.content
        })

        res.status(201).json({
            message : "Data sent Successfully",
            data : post
        })
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
})

module.exports = app
