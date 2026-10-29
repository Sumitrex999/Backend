// import the "dns" from node:dns
import dns from "node:dns"
// Public DNS resolver for "cloudflare" & "Google"
dns.setServers(['1.1.1.1','8.8.8.8'])
// import the app to server 
import app from "./app/app.js";
// import the "port" from the env.js
import {PORT} from './config/env.js'
// import the "database" from the db.js
import {connectDB} from "./config/db.js"


// Write a function to connect the DB before starting the server
async function startServer(){
    try {
        await connectDB();
        console.log("Database is connected first!! ");
        
        // Start the "HTTP server" to listen the incoming "requests"
        app.listen(PORT,()=>{
            console.log(`Server is running on the port ${PORT} of your computer`)
        });
    } catch (error) {
        console.error("Failed to start the server", error.message);
        // Exit with a failure code
        process.exit(1);
    }
}

// Start the server..
startServer();

