import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, removeEmployee } from "../redux/actions/Employee.actions";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const memoizedEmployees = useMemo(() => employees || [], [employees]);
  const isLoading = useSelector((state) => state.employees.loading);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    department: "",
    position: "",
    salaryMin: "",
    salaryMax: ""
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Get unique departments and positions for filter dropdowns
  const departments = useMemo(() => {
    const deptSet = new Set(memoizedEmployees.map(emp => emp.department).filter(Boolean));
    return [...deptSet];
  }, [memoizedEmployees]);

  const positions = useMemo(() => {
    const posSet = new Set(memoizedEmployees.map(emp => emp.position).filter(Boolean));
    return [...posSet];
  }, [memoizedEmployees]);

  // ✅ Memoized filtered employees with enhanced filtering
  const filteredEmployees = useMemo(() => {
    return memoizedEmployees.filter((emp) => {
      // Name search filter
      const nameMatch = emp?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Department filter
      const departmentMatch = !filterOptions.department || 
        emp.department === filterOptions.department;
      
      // Position filter
      const positionMatch = !filterOptions.position || 
        emp.position === filterOptions.position;
      
      // Salary range filter
      const salaryMinMatch = !filterOptions.salaryMin || 
        parseFloat(emp.salary) >= parseFloat(filterOptions.salaryMin);
      
      const salaryMaxMatch = !filterOptions.salaryMax || 
        parseFloat(emp.salary) <= parseFloat(filterOptions.salaryMax);
      
      return nameMatch && departmentMatch && positionMatch && salaryMinMatch && salaryMaxMatch;
    });
  }, [memoizedEmployees, searchTerm, filterOptions]);

  // ✅ Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(removeEmployee(id));
      toast.success("Employee deleted successfully!");
    }
  };

  // ✅ Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterOptions({
      department: "",
      position: "",
      salaryMin: "",
      salaryMax: ""
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📋 Employee List</h2>
        <Link to="/add-employee" className="add-employee-btn">
          ➕ Add New Employee
        </Link>
      </div>
      
      {/* 🔍 Search and Filter Section */}
      <div className="filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-options">
          {/* Department Filter */}
          <select
            name="department"
            value={filterOptions.department}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          {/* Position Filter */}
          <select
            name="position"
            value={filterOptions.position}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Positions</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          
          {/* Salary Range Filters */}
          <input
            type="number"
            name="salaryMin"
            placeholder="Min Salary"
            value={filterOptions.salaryMin}
            onChange={handleFilterChange}
            className="salary-input"
          />
          
          <input
            type="number"
            name="salaryMax"
            placeholder="Max Salary"
            value={filterOptions.salaryMax}
            onChange={handleFilterChange}
            className="salary-input"
          />
          
          <button onClick={resetFilters} className="reset-filter-btn">
            🔄 Reset Filters
          </button>
        </div>
      </div>

      {/* 📊 Filter Results Summary */}
      <div className="filter-summary">
        <p>
          Showing {filteredEmployees.length} of {memoizedEmployees.length} employees
          {(searchTerm || filterOptions.department || filterOptions.position || 
            filterOptions.salaryMin || filterOptions.salaryMax) ? " (filtered)" : ""}
        </p>
      </div>

      {/* 📌 Employee Table */}
      {isLoading ? (
        <p className="loading-msg">⏳ Loading employees...</p>
      ) : filteredEmployees.length > 0 ? (
        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp._id}>
                  <td>
                    <img
                      src={emp.avatar || "https://via.placeholder.com/50"}
                      alt={emp.name}
                      className="employee-avatar"
                    />
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td>${emp.salary}</td>
                  <td>
                    <Link to={`/edit-employee/${emp._id}`} className="edit-btn">
                      ✏ Update
                    </Link>
                    <button onClick={() => handleDelete(emp._id)} className="delete-btn">
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-employee-msg">⚠ No employees found</p>
      )}
    </div>
  );
};

export default Dashboard;