import User from '../models/User.js'
import jwt from 'jsonwebtoken'

require('dotenv').config()
const jwtToken = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {

    const authHeader = req.headers.authorization
    // Bearer token
    const token = authHeader && authHeader.split(" ")[1]

    // check if header has a token
    if (!token) {
        res.status(401).json({
            errors: ["No token provided"]
        })
        return 
    }

    // validate token
    try {
        const decoded = jwt.verify(token, jwtToken) 
        req.user = await User.findById(decoded.id).select("-password")
        next()
    } catch (error) {
        res.status(401).json({
            errors: ["Invalid token"]
        })
    }
}

export default authGuard