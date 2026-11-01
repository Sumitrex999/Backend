import config from "../config/config.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


// register user function 
export async function register(req,res){
    const {name, email, password} = req.body

    const errors = [];

    if(!name){
        errors.push({
            message:"Name is required",
            field:"name"
        })
    }

    if(name?.length<3){
        errors.push({
            message:"Name must be atleast 3 characters long",
            field:"name"
        })
    }

    if(!email){
        errors.push({
            message:"Email is required",
            field:"email"
        })
    }

    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        errors.push({
            message:"Email is not valid",
            field:"email"
        })
    }

    if(!password){
        errors.push({
            message:"Password is required",
            field:"email"
        })
    }

    if(password?.length<6){
        errors.push({
            message:"Password length must be 6 characters",
            field:"password"
        })
    }

    if(errors.length > 0){
        return res.status(400).json({
            message:"Validation errors",
            errors: errors
        })
    }

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

    const errors = []

    if(!email){
        errors.push({
            message:"Email is required",
            field:"email"
        })
    }
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        errors.push({
            message:"email is not valid",
            field:"email"
        })
    }
    if(!password){
        errors.push({
            message:"Password is required",
            field:"password"
        })
    }
    if(errors.length > 0){
        return res.status(400).json({
            message:"Validation errors",
            errors:errors
        })
    }

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