import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User id is required"]
    },
    otpHash: {
        type: String,
        required: [true, "Otp Hash is required"]
    }
}, {
    timestamps: true
})

export default mongoose.model("otps",otpSchema)