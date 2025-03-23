import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // ✅ Ensure it's always an array
  loading: false,
};

const employeeReducer = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.list = action.payload; // ✅ Update list without creating a new reference
    },
    addEmployee: (state, action) => {
      state.list = [...state.list, action.payload]; // ✅ Add without mutating
    },
    updateEmployee: (state, action) => {
      state.list = state.list.map((emp) =>
        emp._id === action.payload._id ? action.payload : emp
      );
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter((emp) => emp._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setEmployees, addEmployee, updateEmployee, deleteEmployee, setLoading } =
  employeeReducer.actions;
export default employeeReducer.reducer;
