import mongoose from "mongoose"
import config from "./config.js";

// write a function to connect to the Database !!
export async function connectDB(){
    await mongoose.connect(config.MONGO_URI);
    console.log("Congrats! Your server is connected to the Database")
}