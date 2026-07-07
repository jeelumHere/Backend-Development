import mongoose from "mongoose"
import config from "../config/config.js"

async function connectDB() {
    await mongoose.connect(config.MONGO_STRING)
    console.log('Server is connected to database');
}

export default connectDB
