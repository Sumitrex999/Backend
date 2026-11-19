import Product from "../models/product.model.js"
import {uploadFile} from "../services/storage.service.js"

export async function createProduct(req,res){

    const user = req.user
    if(user.role !== "seller"){
        return res.status(403).json({
            message:"Only sellers can create a product"
        })
    }

    const {
        title,
        description,
    } = req.body

    const { amount, currency } = JSON.parse(req.body.price);
    const sizes = JSON.parse(req.body.sizes);
    const categories = JSON.parse(req.body.categories);

    const errors = [];

    if(!title){
        errors.push({
            field:"title",
            message:"Title is required"
        })
    }

    if(title && (title.length < 3 || title.length > 100)){
        errors.push({
            field:"title",
            message:"Title must be in the range of 3-100 characters"
        })
    }

    if(!description){
        errors.push({
            field:"description",
            message:"description is required"
        })
    }

    if(description && (description.length < 10 || description.length > 1000)){
        errors.push({
            field:"description",
            message:"Description must be between 10 and 1000 characters"
        })
    }

    if(amount === undefined || amount === null ){
        errors.push({
            field:"amount",
            message:"amount must be a there "
        })
    }

    if(amount !== undefined && amount !== null && (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0 )){
        errors.push({
            field:"price.amount",
            message:"Price amount must be a non-negative number"
        })
    }

    if(!currency){
        errors.push({
            field:"price.currency",
            message:"price currency is required"
        })
    }

    if(currency && !["INR", "USD", "CAD", "EUR"].includes(currency)){
        errors.push({
            field:"price.currency",
            message:"Prince currency must be one amoung these INR, USD, CAD, EUR"
        })
    }

    if(!categories || !Array.isArray(categories) || categories.length === 0){
        errors.push({
            field: "categories",
            message: "At least one category is required"
        })
    } else{
        categories.forEach((category, index)=>{
            if(typeof category !== "string" || !category.trim() ){
                errors.push({
                    field:`categories[${index}]`,
                    message: "Category must be a non-empty string"
                })
            } else if(category.trim().length < 3 || category.trim().length > 50){
                errors.push({
                    field: `categories[${index}]`,
                    message: "Category must be between 3 and 50 characters"
                })
            }
        })
    }

    if(!sizes || !Array.isArray(sizes) || sizes.length === 0){
        errors.push({
            field: "sizes",
            message: "At least one size is required"
        });
    } else {
        sizes.forEach((sizeObj, index)=>{
            if(!sizeObj || !["XS", "S", "M", "L", "XL", "XXL"].includes(sizeObj.size)){
                errors.push({
                    field: `sizes[${index}].size`,
                    message: "Invalid product size"
                });
            }
            if(!sizeObj || !Number.isFinite(sizeObj.stock) || sizeObj.stock < 0){
                errors.push({
                    field: `sizes[${index}].stock`,
                    message: "Stock must be a non-negative integer"
                });
            }
        })
    }

    const files = req.files

    if(!files || files.length === 0){
        errors.push({
            field: "images",
            message: "At least one image is required"
        })
    }

    if(errors.length > 0){
        res.status(400).json({
            message:"Validation errors",
            errors
        })
    }

    const urls = await Promise.all(
        req.files.map(async (file, index)=>{
            const fileName = `${Date.now()}-${file.originalname}`
            const respose = await uploadFile(
                file.buffer.toString("base64"),
                fileName
            )
            return {
                url:respose.url,
                imagekitId:respose.fileId,
                order:index+1
            }
        })
    )

    const product = await Product.create({
        title,
        description,
        price: { amount, currency },
        categories,
        images: urls,
        sizes,
        seller: user.id
    });

    return res.status(201).json({
        message:"Product created successfully",
        product
    });
}