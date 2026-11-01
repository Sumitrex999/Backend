import {Router} from "express"
import {register, login} from "../controller/auth.controller.js"

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

export default router;