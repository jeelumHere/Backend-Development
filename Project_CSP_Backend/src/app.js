const express = require("express")

const postModel = require("./model/post.model")
const multer = require("multer")
const uploadFile = require("./services/storage.service")


const app = express()
const upload = multer({storage : multer.memoryStorage()})

app.post("/create-post",upload.single("image"), async (req,res)=>{
    try{
        console.log(req.body);
        console.log(req.file);

        console.log('result is coming');
        const result = await uploadFile(req.body.buffer)
        console.log('just arriving');
        console.log(result);
        console.log(`look above it's arrived`);

        res.status(200).json({
            message : "data send successfully"
        })
    }
    catch(err){
        error : err.message
    }
})

module.exports = app