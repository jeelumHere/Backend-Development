import mongoose from "mongoose"

const userSchema = new mongoose.Schema({ 
  username: { 
    type: String, 
    required: [true, "username is required"], 
    unique: true,
    trim: true
  }, 
  email: { 
    type: String, 
    required: [true, "email is required"], 
    unique: true, 
    trim: true,
    lowercase: true
  }, 
  password: { 
    type: String, 
    required: [true, "password is required"],
    select : false
  }, 
  verified: { 
    type: Boolean, 
    default: false 
  }, 
  role: { 
    type: String, 
    enum: ["user", "artist"], 
    default: "user" 
  } 
}, { 
  timestamps: true 
});

export default mongoose.model('User', userSchema);

