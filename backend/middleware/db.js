import mongoose from "mongoose";


export async function DBConnect() {
    
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected succesfully")
}