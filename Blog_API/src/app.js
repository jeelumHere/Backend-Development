// creates the sever

const express = require("express")
const noteModel = require("./model/note.model")



const app = express()
app.use(express.json())

app.post("/blog", async (req, res) => {
  try {
    // code that might fail goes here
    const data = req.body
    await noteModel.create({
      title: data.title,
      content: data.content,
      author: data.author,
      tags: data.tags
    })
    res.status(201).json({ message: "Data saved successfully" })

  } catch {
    // if anything in try fails, it jumps here
    res.status(500).json({ error: "Data Not received" })
  }
})


app.get("/blog", async (req, res) => {


  try {
    const data = await noteModel.find()
    res.status(201).json({
      message: "Data Received Successfully",
      Data: data
    })
  }
  catch {
    res.status(500).send({
      message: "Error Data Not Received Successfully"
    })
  }
})

app.delete("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
      message: "Data deleted successfully",
      deleted_id: id
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.patch("/blog/:id", async (req, res) => {

  try {
    const id = req.params.id

   await noteModel.findByIdAndUpdate({ _id: id }, {

      "title": "Why Use Express.js? - Updated",
      "content": "Express.js is a fast, unopinionated, minimalist web framework for Node.js. It is widely used for building RESTful APIs and web applications with ease."

    })

    res.status(200).json({
      message: "Data updated successfully"
    })
  }

  catch (err){
    message_error : err.message
  }

})

module.exports = app