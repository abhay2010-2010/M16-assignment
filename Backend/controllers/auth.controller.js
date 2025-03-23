const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
// User Registration
const registerUser = async (req, res) => {
    try {
      console.log(req.body); // Debugging: Check if password is received
  
      const { name, email, password, avatar } = req.body;
  
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
  
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10); // 🔥 Ensure password is not undefined
  
      user = new User({ name, email, password: hashedPassword, avatar });
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser,loginUser };
