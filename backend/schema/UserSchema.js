import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true},
  password: { type: String, required: true },
  publicKey: { type: String, required: true },
  privateKey: { type: String, required: true },
  
});

export const UserModel = new mongoose.model("User", UserSchema);
