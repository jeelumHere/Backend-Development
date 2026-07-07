import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username : {
        type:       String,
        required:   [true, "Username is required"],
        unique:     [true, "Username must be unique"]
    },
    email : {
        type:       String,
        required:   [true, "email is required"],
        unique:     [true, "email must be unique"]
    },
    password : {
        type:       String,
        required:   [true, "password is required"],
        unique:     [true, "password must be unique"]
    }
})

const userModel = mongoose.model("users",userSchema)

export default userModel;
