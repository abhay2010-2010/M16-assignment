import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/auth.css"; // Import CSS styles
import { loginUser } from "../redux/actions/Auth.actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("❌ Please fill in all fields!");
      return;
    }

    try {
      await dispatch(loginUser({ email, password }));
      toast.success("🎉 Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("❌ Invalid email or password!");
    }
  };

  return (
    <div className="auth-container">
      <h2>🔑 Employee Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
