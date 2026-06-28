const mongoose = require("mongoose")

async function connectDB(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('server is connected to database');
}

module.exports = connectDB

