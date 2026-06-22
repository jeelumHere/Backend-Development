const mongoose = require("mongoose")

async function connectDB(){
    await mongoose.connect("")

    console.log('server is connected to database');
}

module.exports = connectDB