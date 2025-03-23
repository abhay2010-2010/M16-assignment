const employeeController = require("../controllers/employee.controller")
const upload = require("../middlewares/multer.middleware")


const employeeRouter = require("express").Router()



employeeRouter.route("/create").post(upload.single("avatar"), employeeController.addEmployee)

employeeRouter.route("/").get(employeeController.getEmployees)
employeeRouter.route("/:id").get(employeeController.getEmployeeById)

employeeRouter.route("/update/:id").patch(employeeController.updateEmployee)
employeeRouter.route("/delete/:id").delete(employeeController.deleteEmployee)

module.exports = employeeRouter