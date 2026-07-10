import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  // 1. Link the session to the specific user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  refreshTokenHash : {
    type : String,
    required : true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String 
  },
  revoked: {
    type: Boolean,
    default: false 
  }
}, { timestamps: true });


const sessionModel = mongoose.model('Session', sessionSchema);

export default sessionModel
