// const Employee = require("../models/employee.model");
// const uploadOnCloudinary = require("../utils-validation/cloudinary");

const Employee = require("../models/employee.model");
const uploadOnCloudinary = require("../utils-validation/cloudinary");

// 🔹 Add New Employee
const addEmployee = async (req, res, next) => {
    try {
        const { name, email, emp_id, department, position, salary, phone, address, isActive } = req.body;

        // ✅ Check if email or emp_id already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with this email already exists" });
        }

        // ✅ Handle image upload
        let avatarUrl = "";
        if (req.file?.path) {
            const avatar = await uploadOnCloudinary(req.file.path);
            if (!avatar) {
                return res.status(500).json({ message: "Failed to upload avatar" });
            }
            avatarUrl = avatar.url;
        }

        // ✅ Create employee
        const employee = await Employee.create({
            name, email, emp_id, department, position, salary, phone, address, isActive,
            avatar: avatarUrl,
        });

        return res.status(201).json({ success: true, message: "Employee added successfully", employee });
    } catch (error) {
        console.error("Error Adding Employee:", error);
        next(error);
    }
};

// 🔹 Get All Employees
const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ success: true, message: "Employees fetched successfully", employees });
    } catch (error) {
        console.error("Error Fetching Employees:", error);
        next(error);
    }
};

// 🔹 Get Employee By ID
const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee fetched successfully", employee });
    } catch (error) {
        console.error("Error Fetching Employee:", error);
        next(error);
    }
};

// 🔹 Update Employee
const updateEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;

        // ✅ Check if employee exists
        let employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        // ✅ Handle image update
        if (req.file?.path) {
            const avatar = await uploadOnCloudinary(req.file.path);
            if (!avatar) {
                return res.status(500).json({ message: "Failed to upload avatar" });
            }
            req.body.avatar = avatar.url;
        }

        // ✅ Update employee
        employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ success: true, message: "Employee updated successfully", employee });
    } catch (error) {
        console.error("Error Updating Employee:", error);
        next(error);
    }
};

// 🔹 Delete Employee
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;

        // ✅ Check if employee exists
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error Deleting Employee:", error);
        next(error);
    }
};

module.exports = { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };
