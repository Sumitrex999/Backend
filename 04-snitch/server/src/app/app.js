import express from "express"
import morgan from "morgan"
import authRouter from "../routes/auth.routes.js"

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// write an health api 
app.get("/api/v1/health",(req,res)=>{
    res.status(200).json({
        status:"ok",
        message:"Still working on the backend buddy? So, Proud of myself"
    })
})

// Write User registeration API
app.use("/api/v1", authRouter);




export default app;