const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        emp_id: { type: String, required: true, unique: true, trim: true },
        department: { type: String, required: true, trim: true },
        position: { type: String, required: true, trim: true },
        salary: { type: Number, required: true, min: 0 },
        phone: { type: String, required: true, unique: true, trim: true },
        address: { type: String, required: true, trim: true },
        isActive: { type: Boolean, default: true, },

        // image upload
        avatar: { type: String, }
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
