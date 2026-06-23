const mongoose = require("mongoose")


async function connectDB(){
    await mongoose.connect("mongodb+srv://Sharjeel:MongShar$$%40786@database-backend.aijczvm.mongodb.net/Movies")
    console.log('server is connected to datbase movies');
}

module.exports = connectDB

