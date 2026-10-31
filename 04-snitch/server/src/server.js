import dns from "node:dns"
dns.setServers(["1.1.1.1","8.8.8.8"])

import app from "./app/app.js"
import {PORT} from "./config/env.js"
import{connectDB} from "./config/db.js"


// write a function to connect to database before starting function 
async function startServer(){
    try {
        await connectDB()
        app.listen(PORT, ()=>{
        console.log(`Server is running on the port ${PORT} of your computer`)
        })
    } catch (error) {
        console.error("Sry! There is some trouble in starting the server", error.message)
        process.exit(1);
    }
}

startServer();