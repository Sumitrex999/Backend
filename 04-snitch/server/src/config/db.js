import mongoose from "mongoose"
import { MONGO_URI } from "./env.js";

// write a function to connect to the Database !!
export async function connectDB(){
    await mongoose.connect(MONGO_URI);
    console.log("Congrats! Your server is connected to the Database")
}