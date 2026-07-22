import mongoose, { trusted } from "mongoose"

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:[true,"username is required"],
        unique:true
    },
    email : {
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password : {
        type : String,
        required : [true,"password is required"]
    }
})

export default mongoose.model("User",userSchema)

