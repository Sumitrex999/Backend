import mongoose, { Schema } from "mongoose"


const userSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            maxlength:50,
            minlength:3
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true // MongoDB throws a database-level duplicate key error {index constraint}
        },
        passwordHash:{
            type:String,
            required:true,

        }
    },
    {
        timestamps:true
    }
);

const User = mongoose.model("User", userSchema);

export default User;