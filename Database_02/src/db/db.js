const mongoose = require("mongoose")


async function connectDB(){
    await mongoose.connect("mongodb+srv://Sharjeel:MongShar$$%40786@database-backend.aijczvm.mongodb.net/halley")

    console.log('Connected To Database');
}

module.exports = connectDB
