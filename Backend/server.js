const express = require("express")
const connectDB = require("./database/db")
const errorMiddleware = require("./middlewares/error.middleware")
const authRouter = require("./routes/auth.route")
const employeeRouter = require("./routes/employee.route")
const app = express()



//! middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))




// ! routes
app.use("/api/auth", authRouter)
app.use("/api/employee", employeeRouter)


// ! error handling part
app.use(errorMiddleware)

const PORT = process.env.PORT

app.listen(PORT,async()=>{
    try {
        await connectDB;
        console.log(`Server running on port ${PORT}`)
    } catch (error) {
        console.error("Error connecting to database:", error.message)
        process.exit(1)
    }  
 
})