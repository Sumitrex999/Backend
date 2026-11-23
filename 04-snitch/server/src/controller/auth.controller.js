import config from "../config/config.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


// register user function 
export async function register(req,res){
    const {name, email, password} = req.body

    const isUserExists = await User.findOne({email})
    if(isUserExists){
        res.status(400).json({
            message:"User with email id already exists",
            errors:[
                {
                    message:"User already exists",
                    field:"email"
                }
            ]
        })
    }

    const hashPassword = await bcrypt.hash(password,10) // cause hashing is a CPU - intensive operation
    const user = await User.create({
        name,
        email,
        passwordHash:hashPassword
    })

    const token = jwt.sign(
        {
            id: user._id,
            role:user.role
        },
        config.JWT_SECRET
    )
    
    res.status(201).json({
        message:"User Created Successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },
        token
    })

}

export async function login(req,res) {

    const {email,password} = req.body

    const user = await User.findOne({email}).select("+passwordHash")

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password",
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            role:user.role
        },
        config.JWT_SECRET
    )

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            user: user._id,
            name: user.name,
            email:user.email
        },
        token
        
    })

}

export async function getMe(req,res){
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        return res.status(200).json({
            message:"User fetched successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
        
    } catch (err) {
         res.status(401).json({
            message:"Invalid token or expired token"
         })
    }
}