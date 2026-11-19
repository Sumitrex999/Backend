import {Router} from "express"
import { createProduct } from "../controller/product.controller.js";
import authenticate from "../middlewares/auth.middleware.js"
import multer from "multer"

const upload = multer({
    storage: multer.memoryStorage()
})

const router = Router();

/* 
CREATE PRODUCT ROUTE
POST /products
*/
router.post("/products", authenticate, upload.array("images", 5), createProduct)

export default router