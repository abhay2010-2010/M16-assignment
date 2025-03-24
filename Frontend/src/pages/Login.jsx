import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/auth.css";
import { loginUser, registerUser } from "../redux/actions/Auth.actions"; // Replace with your actual Redux actions
// import { registerUser } from "../redux/actions/Auth.actions"; // Import register action


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // For registration
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("❌ Please fill in all fields!");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })); // Dispatch Login Action
      toast.success("🎉 Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("❌ Invalid email or password!");
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      toast.error("❌ Please fill in all registration fields!");
      return;
    }

    try {
      await dispatch(registerUser({ username, email, password })); 
      console.log(username, email, password);
      // Dispatch Register Action
      toast.success("🎉 Registration Successful! Please Login.");
      setIsLogin(true); // Switch to Login after registration
    } catch (error) {
      toast.error("❌ Registration failed. Please try again.");
    }
  };



  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <h2>{isLogin ? "🔑 Employee Login" : "📝 Employee Registration"}</h2>

      <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
        {!isLogin && (
          <input
            type="text"
            placeholder="👤 Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="📧 Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="🔒 Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

export default AuthForm;