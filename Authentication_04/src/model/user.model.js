import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false, // never returned unless explicitly requested
    },
    images: [{
      url: { type: String },
      fileId: { type: String }, // ImageKit fileId, needed for deletion
    }],
  },

  { timestamps: true }

);

export default mongoose.model("User", userSchema);


