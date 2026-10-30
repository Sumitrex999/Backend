// User "Router" class from "express" to handle specific set of route
import {Router} from "express"
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken"




// create the instance of the "express router"
const router = Router();

/* 
REGISTER USER ROUTE
POST /register
*/
router.post("/register",async (req,res)=>{
    const {name, email, password} = req.body
    const user = await User.create({
        name:name,
        email:email,
        passwordHash:password
    })
    // Create a token after successful registeration
    const token = jwt.sign(
        {
            id: user._id
        },
        JWT_SECRET
    )
    // Send a successfull registration respose
    res.status(201).json(
        {
            message:"User registered successfully",
            data:{
                user:{
                    name:user.name,
                    email:user.email
                }
            },
            token:token
        }
    )
})

/* 
GET USER ROUTE
GET /me
*/
router.get("/me",async (req,res)=>{
    // Extract token from the headers authorization of request
    const token = req.headers.authorization
    // Verify against the applications secret key
    const data = jwt.verify(token,JWT_SECRET);
    // Print the decoded JWT payload in the terminal
    console.log(data);
    // find the user in DB with id stored in the JWT payload
    const user = await User.findById(data.id);
    // returned authenticated user information in the front end
    res.status(200).json(
        {
            message:"user data fetched successfully",
            data:{
                user:{
                    name:user.name,
                    email:user.email
                }
            }
        }
    )

})

export default router;

