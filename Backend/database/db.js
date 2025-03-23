const mongoose = require("mongoose")

require("dotenv").config()



const URI = process.env.MONGO_URL
const connectDB =mongoose.connect(URI)

module.exports = connectDB