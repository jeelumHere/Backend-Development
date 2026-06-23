const express = require("express")
const movie = require("./model/post.model")

const app = express()
app.use(express.json())


app.post("/movie", async (req, res) => {
    try {
        const data = req.body
        const newMovie = await movie.create(data)

        res.status(201).send({
            status: true,
            message: "Movie data posted successfully"
        })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            error: err.message
        })
    }
})

app.get("/movie", async (req, res) => {
    try {
        const data = await movie.find()

        res.status(200).send({
            status: true,
            data: data
        })
    }
    catch(err){
        res.status(500).send({
            status : false,
            error : err.message
        })
    }
})

module.exports = app