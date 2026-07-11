import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"username is required"],
        unique : true
    },
    email : {
        type : String,
        required : [true,"email is required"],
        unique : false
    },
    password : {
        type : String,
        required : [true,"password is required"],
        select : false
    },
    verified : {
        type : Boolean,
        default : false
    },
    // An array that holds multiple avatar objects
    avatars: [{
        url : {type:String},
        fileId : {type:String}
    }]
},{
    timestamps : true
})

export default mongoose.model("Users",userSchema)