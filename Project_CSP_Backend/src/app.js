const express = require("express")

const postModel = require("./model/post.model")
const multer = require("multer")



const app = express()
const upload = multer({storage : multer.memoryStorage()})

app.post("/create-post", async (req,res)=>{
    try{
        console.log(req.body);
        res.status(200).json({
            message : "data send successfully"
        })
    }
    catch(err){
        error : err.message
    }
})

module.exports = app