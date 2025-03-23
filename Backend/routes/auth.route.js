const express=require("express");
// const authMiddleware = require("../middlewares/auth");
// const { login, register } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/Auth.middleware");
const {loginUser,registerUser}=require("../controllers/auth.controller")
const authRouter = express.Router()

authRouter.post("/register",registerUser)

authRouter.post("/login",loginUser)


module.exports = authRouter
