import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/employeeList.css";
import { fetchEmployees, removeEmployee } from "../redux/actions/Employee.actions";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees || []);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await dispatch(removeEmployee(id));
        toast.success("✅ Employee deleted successfully!");
      } catch (error) {
        toast.error("❌ Failed to delete employee!");
      }
    }
  };

  return (
    <div className="employee-list-container">
      <h2>📋 Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>
                <Link to={`/employee/${emp._id}`} className="view-btn">👁 View</Link>
                <Link to={`/edit-employee/${emp._id}`} className="edit-btn">✏ Edit</Link>
                <button onClick={() => handleDelete(emp._id)} className="delete-btn">🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
