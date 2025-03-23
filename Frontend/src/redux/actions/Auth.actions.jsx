import axios from "axios";
import { loginSuccess, logout } from "../reducers/Auth.reducer";
import { API_BASE_URL } from "../../config";

// const API_BASE_URL = "http://localhost:5000/api"; // Change if deployed

// 🔹 Login User
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

    console.log("API Response:", res.data); // ✅ Debugging Log

    if (!res.data.token) {
      throw new Error("No token received from the server.");
    }

    dispatch(loginSuccess(res.data)); // ✅ Ensure correct payload
  } catch (error) {
    console.error("Login failed:", error);
  }
};


// 🔹 Logout User
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
