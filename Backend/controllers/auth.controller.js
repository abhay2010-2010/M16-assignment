const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const register = async (req, res, next) => {
    const { name, email, password } = req.body
    console.log(name, email, password);
    
    try {
        const isUserExit = await User.findOne({ email })
        if (isUserExit) {
            return res.status(400).json({ success: false, message: "Email is already registerd" });
        }

        const newUser = await User.create({ name, email, password })

        const newUserDetails = {
            token: await newUser.generateToken(),
            userId: newUser._id.toString()
        }

        return res.status(201).json({
            sucess: true,
            message: "Registration Successful",
            newUserDetails
        })

    } catch (error) {
        next(error)
    }
}



const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const isUserExist = await User.findOne({ email })

        if (!isUserExist) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        const isValidPassword = isUserExist.compare(password)

        if (!isValidPassword) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }

        const userDetails = {
            token: await isUserExist.generateToken(),
            userId: isUserExist._id.toString(),
        }

        return res.status(200).json({
            success: true,
            message: "Login Successful backend",
            userDetails,
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login }