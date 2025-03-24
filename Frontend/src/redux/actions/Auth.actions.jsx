import axios from "axios";
import {
  loginSuccess,
  logout,
  registerSuccess,
} from "../reducers/Auth.reducer";
import { API_BASE_URL } from "../../config";

// const API_BASE_URL = "http://localhost:5000/api"; // Change if deployed

// 🔹 Login User
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

    console.log("API Response (Login):", res.data); // ✅ Debugging Log

    if (!res.data.token) {
      throw new Error("No token received from the server.");
    }

    dispatch(loginSuccess(res.data)); // ✅ Ensure correct payload
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw the error for component handling
  }
};

// 🔹 Register User
export const registerUser = (userData) => async (dispatch) => {
  console.log(userData)
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);

    console.log("API Response (Register):", res.data); // ✅ Debugging Log
    dispatch(registerSuccess(res.data));
    // You might want to dispatch a success action or handle the response data here
    // For example, if your API returns user data after registration:
    // dispatch(registerSuccess(res.data)); // Assuming you have a registerSuccess action

    //For now, just return the data
    return res.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error; // Re-throw the error for component handling
  }
};

// 🔹 Logout User
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
