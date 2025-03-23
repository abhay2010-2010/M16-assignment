import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AddEmployee.css";
import { createEmployee } from "../redux/actions/Employee.actions";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emp_id: "",
    department: "",
    position: "",
    salary: "",
    phone: "",
    address: "",
    isActive: true, // ✅ Default to true
    avatar: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, avatar: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const employeeData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        employeeData.append(key, formData[key]);
      }
    });

    try {
      await dispatch(createEmployee(employeeData));
      toast.success("✅ Employee added successfully!");
      navigate("/");
    } catch (error) {
      console.error("❌ Error adding employee:", error);
      toast.error("❌ Failed to add employee!");
    }
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="emp_id" placeholder="Employee ID" onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
        <input type="text" name="position" placeholder="Position" onChange={handleChange} required />
        <input type="number" name="salary" placeholder="Salary" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        
        {/* ✅ Avatar Upload */}
        <input type="file" name="avatar" onChange={handleChange} required />

        {/* ✅ Active Status */}
        <label className="checkbox-container">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
          Active Employee
        </label>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
