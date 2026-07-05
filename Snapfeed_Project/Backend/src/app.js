const express = require("express")
const { uploadFile, deleteImage } = require("./service/storage.service")
const postModel = require("./model/post.model")
const multer = require("multer")
const cors = require("cors")

const upload = multer({ storage: multer.memoryStorage() })

const app = express()
app.use(express.json())
app.use(cors())

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

app.get("/post", async (req, res) => {
    try {
        const post = await postModel.find();
        console.log(post);

        const imagesData = post.map(data =>
            data.images.map(ele => ({
                url: ele.url,
                fileId: ele.fileId
            }))
        );
        console.log(imagesData);

        res.status(200).send({
            message: "Data received successfully",
            Data: post
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})


// delete entire post as well as all images of that post
app.delete("/post/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        if (post.images && post.images.length) {
            await Promise.all(
                post.images.map(img => deleteImage(img.fileId))
            );
        }

        await postModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Post and all images deleted successfully",
            DeletedDataId: id
        });
    }
    catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.delete("/post/:postId/image/:imageId", async (req, res) => {
    try {
        const { postId, imageId } = req.params;
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        const image = post.images.id(imageId); // Mongoose subdocument lookup by _id

        if (!image) {
            return res.status(404).json({ message: "Image Not Found" });
        }

        await deleteImage(image.fileId); // remove from ImageKit

        post.images.pull(imageId); // remove from array
        await post.save();

        res.status(200).json({
            message: "Image deleted successfully",
            DeletedImageId: imageId
        });
    }
    catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

module.exports = app
