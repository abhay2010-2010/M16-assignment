

const authRouter = require("express").Router()
const authController = require("../controllers/auth.controller")
// const isValidate = require("../middlewares/isValidate.middleware")
// const { signupSchema, loginSchema } = require("../utils-validation/auth.validation")


authRouter.route("/register").post(authController.register)

authRouter.route("/login").post(authController.login)


module.exports = authRouter
