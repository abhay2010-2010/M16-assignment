const employeeController = require("../controllers/employee.controller")
const authMiddleware = require("../middlewares/Auth.middleware")
const upload = require("../middlewares/multer.middleware")


const employeeRouter = require("express").Router()



employeeRouter.route("/create").post(authMiddleware, upload.single("avatar"), employeeController.addEmployee);

employeeRouter.route("/").get(authMiddleware ,employeeController.getEmployees)
employeeRouter.route("/:id").get(authMiddleware, employeeController.getEmployeeById)

employeeRouter.route("/update/:id").patch(authMiddleware,employeeController.updateEmployee)
employeeRouter.route("/delete/:id").delete(authMiddleware, employeeController.deleteEmployee)

module.exports = employeeRouter

