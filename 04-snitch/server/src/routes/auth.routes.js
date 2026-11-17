import {Router} from "express"
import {register, login, getMe} from "../controller/auth.controller.js"
import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

/* 
REGISTER USER ROUTE
POST /register
*/
router.post("/register", register);

/* 
LOGIN USER ROUTE
POST /login
*/
router.post("/login", login);

/* 
FETCH USER ROUTE
GET /me
*/
router.get("/me", authenticate, getMe)

export default router;