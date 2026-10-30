import {MONGO_URI} from "./env.js"
import mongoose from "mongoose"

// write a function to connect to the database
export async function connectDB(){
    await mongoose.connect(MONGO_URI);
    console.log("Your server is connected to the Database!!")
}