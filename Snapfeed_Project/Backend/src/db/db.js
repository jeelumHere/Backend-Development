const mongoose = require("mongoose")

async function connectDB(){
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    console.log('database is connected to server');
}

module.exports = connectDB