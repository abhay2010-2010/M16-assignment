import axios from "axios";
import { addEmployee, deleteEmployee, setEmployees, updateEmployee } from "../reducers/Employee.reducer";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for notifications

// const API_BASE_URL = "http://localhost:5000/api"; // Change if deployed

// 🔹 Fetch All Employees
export const fetchEmployees = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // ✅ Get Token
    const res = await axios.get(`${API_BASE_URL}/employee`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Send Token
    });
    dispatch(setEmployees(res.data.employees));
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
  }
};


// 🔹 Create Employee
export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("❌ No authentication token found!");
      return;
    }

    // ✅ Ensure FormData is used
    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      if (employeeData[key]) {
        formData.append(key, employeeData[key]);
      }
    });

    console.log("📝 Sending FormData:", formData);

    const res = await axios.post(
      `http://localhost:3000/api/employee/create`, // Ensure this matches your backend route
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(addEmployee(res.data.employee));
    toast.success("✅ Employee added successfully!");
  } catch (error) {
    console.error("❌ Error adding employee:", error);
    if (error.response) {
      console.error("🔍 Server Error:", error.response.data);
    }
    toast.error("❌ Failed to add employee!");
  }
};
// Async action for modifying an employee
export const modifyEmployee = (id, employeeData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("❌ No authentication token found!");
      return;
    }

    console.log("📝 Sending JSON:", employeeData);

    const res = await axios.patch(
      `${API_BASE_URL}/employee/update/${id}`,
      employeeData, // Send plain JSON
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set JSON content type
        },
      }
    );

    console.log("✅ Server Response:", res.data);
    dispatch(updateEmployee(res.data.employee));

    toast.success("✅ Employee updated successfully!");
  } catch (error) {
    console.error("❌ Error updating employee:", error);

    if (error.response) {
      console.error("🔍 Server Error Response:", error.response.data);
      console.error("🔍 Status Code:", error.response.status);
    }

    toast.error("❌ Failed to update employee!");
  }
};

  
// 🔹 Delete Employee
export const removeEmployee = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // ✅ Include token
    if (!token) {
      toast.error("❌ No authentication token found!");
      return;
    }

    console.log(`🚀 Deleting employee with ID: ${id}`);

    const res = await axios.delete(`${API_BASE_URL}/employee/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Pass Token
      },
    });

    console.log("✅ Employee Deleted Response:", res.data);

    dispatch(deleteEmployee(id));
  } catch (error) {
    console.error("❌ Error deleting employee:", error);

    if (error.response) {
      console.error("🔍 Server Error Response:", error.response.data);
      console.error("🔍 Status Code:", error.response.status);
    }
    
    toast.error("❌ Failed to delete employee!");
  }
};
