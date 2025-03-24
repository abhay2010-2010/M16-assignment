import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const authSlice = createSlice({ // Changed from authReducer to authSlice
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Login Payload:", action.payload); // ✅ Debugging Log

      if (!action.payload || !action.payload.token) {
        console.error("❌ Error: Payload does not contain a token!");
        return; // Exit the reducer if no token is found
      }

      state.token = action.payload.token;
      state.user = action.payload.user; // Assuming user data is in payload.user
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    registerSuccess: (state, action) => {
      console.log("Register Payload:", action.payload); // Debugging
      //After registration you do not get token so it is better to not save it
      state.user = action.payload.user; // Assuming user data is in payload.user after registration

      // If your API returns a token upon registration, you can save it here:
      // state.token = action.payload.token;
      // localStorage.setItem("token", action.payload.token);
    },
  },
});


export const { loginSuccess, logout, registerSuccess } = authSlice.actions; // Added registerSuccess
export default authSlice.reducer; // Changed from authReducer to authSlice.reducer