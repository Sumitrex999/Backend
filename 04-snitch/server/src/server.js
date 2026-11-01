import dns from "node:dns"
dns.setServers(["1.1.1.1","8.8.8.8"])

import app from "./app/app.js"
import config from "./config/config.js"
import{connectDB} from "./config/db.js"


// write a function to connect to database before starting function 
async function startServer(){
    try {
        await connectDB()
        app.listen(config.PORT, ()=>{
        console.log(`Server is running on the port ${config.PORT} of your computer`)
        })
    } catch (error) {
        console.error("Sry! There is some trouble in starting the server", error.message)
        process.exit(1);
    }
}

startServer();