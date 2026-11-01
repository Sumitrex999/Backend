import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            minLength:3,
            maxlength:50
        },
        email:{
            type:String,
            required:true,
            match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,  //Built-in schema validators to ensure the "String content" match "the regex format"
            maxlength:50
        },
        passwordHash:{
            type:String,
            required:true,
            select:false  //The password filed will not be retrive from the database {Hidden by default}
        },
        role:{
            type:String,
            required:true,
            default:"user",
            enum:["user","seller"]
        }

    },
    {timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;