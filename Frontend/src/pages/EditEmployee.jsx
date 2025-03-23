import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/editEmployee.css";
import { modifyEmployee } from "../redux/actions/Employee.actions";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    emp_id: "",
    department: "",
    position: "",
    salary: "",
    phone: "",
    address: "",
    avatar: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("❌ No authentication token found!");
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployee(res.data.employee);
      } catch (error) {
        console.error("❌ Error fetching employee:", error);
        toast.error("❌ Failed to load employee details!");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("❌ No authentication token found!");
        setLoading(false);
        return;
      }
  
      // Let the action creator handle the API call
      await dispatch(modifyEmployee(id, employee));
      toast.success("✅ Employee updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("❌ Error updating employee:", error);
      toast.error("❌ Failed to update employee!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="edit-employee-form">
        <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="emp_id" value={employee.emp_id} onChange={handleChange} placeholder="Employee ID" required />
        <input type="text" name="department" value={employee.department} onChange={handleChange} placeholder="Department" required />
        <input type="text" name="position" value={employee.position} onChange={handleChange} placeholder="Position" required />
        <input type="number" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" required />
        <input type="text" name="phone" value={employee.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="text" name="address" value={employee.address} onChange={handleChange} placeholder="Address" required />
        <input type="file" name="avatar" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Employee"}
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;