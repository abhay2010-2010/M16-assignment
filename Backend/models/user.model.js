const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const userSchema = new mongoose.Schema({
    name: { type: String, },
    email: { type: String, },
    password: { type: String, },
    avatar: { type: String },
})


userSchema.pre("save", async function (req, res, next) {
    try {
        const user = this;

        if (!user.isModified("password")) {
            return next()
        }

        const saltRound = await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(user.password, saltRound)

        user.password = hashedPassword

    } catch (error) {
        console.error(error);
    }
})


userSchema.methods.generateToken = function (next) {
    try {
        return (
            jwt.sign({
                userId: this._id.toString(),
                email: this.email,
            },
                process.env.SECRET_KEY,
                {
                    expiresIn: "30d"
                }
            )
        )
    } catch (error) {
        next(error)
    }
}


userSchema.methods.compare = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", userSchema)

module.exports = User