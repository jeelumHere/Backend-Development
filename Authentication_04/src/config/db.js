import mongoose from "mongoose"
import config from "./config.js"

async function connectDB(){
    await mongoose.connect(config.mongoString)
    console.log('server is connected to database');
}

export default connectDB