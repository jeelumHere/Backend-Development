import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: [true,"user is required"] 
    },
    refreshTokenHash : {
        type : String,
        required : [true, "Refresh token hash is required"]
    },
    ip : {
        type : String,
        required : [true, "IP address is required"]
    },
    userAgent : {
        type :String,
        required : [true, "User Agent is required"]
    },
    revoked : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

export default mongoose.model("session",sessionSchema)