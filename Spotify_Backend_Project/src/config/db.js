import mongoose from "mongoose"
import config from "../config/config.js"

const connectDB = async () => {
    await mongoose.connect(config.mongoString);
    console.log('Database is connected to server');
}

export default connectDB