import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    refreshTokenHash : {
        type : String,
        required : true
    },
    ipAddress : {
        type :String,
        required : true
    },
    userAgent : {
        type : String,
        required : true
    },
    revoked : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

export default mongoose.model("Sessions",sessionSchema)