import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/Auth.reducer";
import employeeReducer from "./reducers/Employee.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
  },
});

export default store;
