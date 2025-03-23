import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Login Payload:", action.payload); // ✅ Debugging Log

      if (!action.payload || !action.payload.token) {
        console.error("❌ Error: Payload does not contain a token!");
        return;
      }

      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});


export const { loginSuccess, logout } = authReducer.actions;
export default authReducer.reducer;
