import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

require('dotenv').config()

const jwtToken = process.env.JWT_SECRET

// Generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtToken, {
        expiresIn: '7d'
    })
}

// Register user and sign in
const register = async (req, res) => {

    const { name, email, password } = req.body

    const checkIfUserExists = await User.findOne({ email })

    if (checkIfUserExists) {
        res.status(422).json({
            errors: ["User already exists"]
        })
        return 
    }

    // random string to make harder to break the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (!newUser) {
        return res.status(500).json({
            errors: ["Error creating user"]
        })
    }

    // If user was successfully created, generate token
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
    return 
}

const login = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })
        
    if (!user) {
        res.status(404).json({
            errors: ["User not found"]
        })
        return 
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        res.status(422).json({
            errors: ["Invalid password"]
        })
        return 
    }

    req.user = user

    res.status(200).json({
        _id: user._id,
        token: generateToken(user._id),
        profileImage: user.profileImage
    })
}

const getCurrentLoggedInUser = async (req, res) => {
    const user = req.user

    if (!user) {
        res.status(404).json({
            error: "User not found"
        })
        return 
    }

    res.status(200).json(user)
}

const update = async(req, res) => {

    const { name, password, bio } = req.body
    let profileImage = null

    if (req.file) {
        profileImage = req.file.filename
    }

    const { _id } = req.user
    const user = await User.findById(mongoose.Types.ObjectId(_id)).select("-password")

    if (name) user.name = name 
    if (password) {
        // random string to make harder to break the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)   
        user.password = hashedPassword
    }

    if (profileImage) user.profileImage = profileImage
    if (bio) user.bio = bio

    await user.save()

    const {password:removedPassword, ...userWithoutPassword} = user._doc

    res.status(200).json(userWithoutPassword)
}

const getUserById = async (req, res) => {
    const { id } = req.params 
    console.log(id)
    const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")

    if (!user) {
        res.status(404).json({
            error: "User not found"
        })
        return 
    }

    res.status(200).json(user)
}

export { 
    register, 
    generateToken, 
    login, 
    getCurrentLoggedInUser,
    update,
    getUserById
}