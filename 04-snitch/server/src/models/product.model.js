import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:3,
        maxLength:100
    },
    description:{
        type:String,
        minLength:10,
        maxLength:10000,
        required: true
    },
    price:{
        amount:{
            type:Number,
            required:true,
            min:0
        },
        currency:{
            type:String,
            required: true,
            enum:["INR", "USD", "EUR", "CAD"],
            default:"INR"
        }
    },
    categories:[
        {
            type:String,
            required:true
        }
    ],
    images:[
        {
            imagekitId: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            order: {
                type: Number,
                required: true
            }
        }
    ],
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    sizes:[
        {
            size:{
                type:String,
                required:true,
                enum:["XS", "S", "M", "L", "XL", "XXL"]
            },
            stock:{
                type:Number,
                required:true,
                min:0
            }
        }
    ],
    isPublished:{
        type:Boolean,
        required:true,
        default:false
    }
    
},{timestamps:true})

const Product = mongoose.model("Product", productSchema);

export default Product;