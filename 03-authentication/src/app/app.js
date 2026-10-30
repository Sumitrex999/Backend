import express from "express"
import morgan from "morgan"
import authRouter from "../routes/auth.routes.js"

const app = express();

app.use(express.json());

// To console log the complete "HTTP cycle" in the terminal ,
//  the "dev" argument tells the morgan which pre-define formatting you should use 
// GET / 200 1.473 ms - 15{size of res body in bytes}
app.use(morgan("dev")); 

app.get("/api/v1/health",(req,res)=>{
    return res.status(200).json({
        status:"ok",
        message:"Still learing the backend Buddy ? So proud of you!!"
    });
});

app.use("/api/v1", authRouter)

export default app;