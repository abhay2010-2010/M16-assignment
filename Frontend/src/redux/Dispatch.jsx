import { useDispatch } from "react-redux";
import { createEmployee, fetchEmployees, loginUser, logoutUser, modifyEmployee, removeEmployee } from "./actions/Employee.actions";
import { registerSuccess } from "./reducers/Auth.reducer";

const useDispatchAction = () => {
  const dispatch = useDispatch();

  return {
    login: (credentials) => dispatch(loginUser(credentials)),
    login: (credentials) => dispatch(registerSuccess(credentials)),
    logout: () => dispatch(logoutUser()),
    getEmployees: () => dispatch(fetchEmployees()),
    addEmployee: (employeeData) => dispatch(createEmployee(employeeData)),
    editEmployee: (id, employeeData) => dispatch(modifyEmployee(id, employeeData)),
    deleteEmployee: (id) => dispatch(removeEmployee(id)),
  };
};

export default useDispatchAction;
