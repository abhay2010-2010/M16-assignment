

const Employee = require("../models/employee.model");
const uploadOnCloudinary = require("../utils-validation/cloudinary");

const addEmployee = async (req, res, next) => {
    const { name, email, emp_id, department, position, salary, phone, address, isActive } = req.body;

    console.log(email);
    

    try {
        const avatarLocalPath = req.file?.path;
        
        
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar file is required" });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            return res.status(500).json({ message: "Failed to upload avatar" });
        }

        const employee = await Employee.create({
            name, email, emp_id, department, position, salary, phone, address, isActive,
            avatar: avatar.url,
        });

        return res.status(201).json({ message: "Employee Added successfully", employee });
    } catch (error) {
        next(error);
    }
};

const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ success: true, message: "Employees fetched successfully", employees });
    } catch (error) {
        next(error);
    }
};

const getEmployeeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee fetched successfully", employee });
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    
    try {
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee updated successfully", employee });
    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        next(error);
    }
};


module.exports = { getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };
