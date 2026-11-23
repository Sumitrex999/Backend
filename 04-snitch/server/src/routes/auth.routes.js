import {Router} from "express"
import {register, login, getMe} from "../controller/auth.controller.js"
import authenticate from "../middlewares/auth.middleware.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";

const router = Router();

/* 
REGISTER USER ROUTE
POST /register
*/
router.post("/register",registerValidator, register);

/* 
LOGIN USER ROUTE
POST /login
*/
router.post("/login",loginValidator, login);

/* 
FETCH USER ROUTE
GET /me
*/
router.get("/me", authenticate, getMe)

export default router;