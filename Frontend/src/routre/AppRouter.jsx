
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddEmployee from "../pages/AddEmployees";
import EmployeeList from "../pages/EmployeeList";
import EditEmployee from "../pages/EditEmployee";
import EmployeeDetails from "../pages/EmployeeDetail";
import Navbar from "../components/Navbar";
import PrivateRoute from "./PrivateRoute";
import AuthForm from "../pages/Login";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<AuthForm />} />

        {/* ✅ Protected Routes */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-employee" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
        <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
        <Route path="/edit-employee/:id" element={<PrivateRoute><EditEmployee /></PrivateRoute>} />
        <Route path="/employee/:id" element={<PrivateRoute><EmployeeDetails/></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
