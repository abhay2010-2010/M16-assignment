import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { toast } from "react-toastify";
import "../styles/employeeDetails.css"
const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token from localStorage
        if (!token) {
          toast.error("❌ No authentication token found!");
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Pass token in headers
          },
        });

        setEmployee(res.data.employee);
      } catch (error) {
        console.error("❌ Error fetching employee:", error);
        toast.error("❌ Failed to load employee details!");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!employee) return <p>⚠ Employee not found!</p>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>Email: {employee.email}</p>
      <p>Position: {employee.position}</p>
      <p>Department: {employee.department}</p>
    </div>
  );
};

export default EmployeeDetail;
