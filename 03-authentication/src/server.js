import dns from "node:dns"
dns.setServers(["1.1.1.1","8.8.8.8"])

import {PORT} from "./config/env.js"
import {connectDB} from "./config/db.js"
import app from "./app/app.js"

//write a function to connect DB before starting the server
async function startServer(){
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Hello Rex, your app is running on port ${PORT} of your computer`)
        })
    } catch (error) {
        console.error("Failed to start the server",error.message);
        // exit with failure code
        process.exit(1);
    }
}

startServer();