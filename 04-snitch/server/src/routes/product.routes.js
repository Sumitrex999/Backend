import {Router} from "express"
import { createProduct } from "../controller/product.controller.js";
import authenticate from "../middlewares/auth.middleware.js"

const router = Router();

/* 
CREATE PRODUCT ROUTE
POST /products
*/
router.post("/products", authenticate, createProduct)

export default router