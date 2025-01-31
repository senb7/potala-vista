// userController.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


// signup controller
const signupUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email Already Exists" });
    }

    // check if admin already exists
    if (role === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({ error: "Only one ADMIN allowed" });
      }
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error Registering user" });
  }
};


// login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    res.json({ message: "Login Successful", role: user.role, user: user.name });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// get logged in user profile
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




// export signup & login controllers
module.exports = { 
  signupUser,
  loginUser,
  getUserByEmail
};
