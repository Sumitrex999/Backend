import jwt from "jsonwebtoken"
import config from "../config/config.js"


function authenticate(req, res, next){
    // Get the token from the headers.authorization
    // try:
    // Check weather the token exists , unauthorized 401
    // jwt verify the token 
    // populate the req with user and call next
    // catch: Invalid or expire token
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Token is not found"
        })
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        // console.log(decoded);
        req.user = decoded
        next()

    } catch (err) {
        return err.status(401).json({
            message:"Invalid or expired token"
        })
    }
}

export default authenticate;

