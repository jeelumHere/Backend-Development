import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : [true, "username must be unique"]
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : [true, "email must be unique"]
    },
    password : {
        type : String,
        required : [true, "password is required"],
        unique : [true, "password must be unique"]
    },
    image : {
        trype : String,
    }
})

export default mongoose.model("user",userSchema)
