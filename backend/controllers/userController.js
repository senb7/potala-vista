// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');


// signup controller
const signupUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  // check if admin already exists
  if (role === "admin") {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(400).json({ error: "Only One ADMIN Allowed" });
    }
  }

  try {
    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email Already Exists" });
    }
    
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error Registering User" });
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
    res.json({ 
      message: "Login Successful",
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, 
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};



// password reset code send to email
const sendResetCode = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
      const hashedCode = await bcrypt.hash(resetCode, 10);

      user.resetCode = hashedCode;
      user.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // Code expires in 10 minutes
      await user.save();

      // Send email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });

      const mailOptions = {
          from: 'PotalaVista <potalavista7@gmail.com>',
          to: email,
          subject: 'Password Reset Code',
          html: `<p style="font-size: 15px">Your password reset code is give below and expires in 10 minutes.</p>
                 <h2 style="font-size: 18px; font-weight: bold; color: #007BFF;">${resetCode}</h2>
                 `
      };
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Reset Code sent to your Email' });

  } catch (error) {
      res.status(500).json({ message: 'Something went wrong B' });
  }
};


// password verify
const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!user.resetCode || !user.resetCodeExpiry) return res.status(400).json({ message: 'Reset code not requested' });
      if (Date.now() > user.resetCodeExpiry) return res.status(400).json({ message: 'Reset code expired' });

      const isMatch = await bcrypt.compare(code, user.resetCode);
      if (!isMatch) return res.status(400).json({ message: 'Invalid reset code' });

      res.json({ message: 'Reset code verified' });

  } catch (error) {
      res.status(500).json({ message: 'Something went wrong B verify' });
  }
};


// reset password
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetCode = null;
      user.resetCodeExpiry = null;
      await user.save();

      res.json({ message: 'Password reset successfully' });

  } catch (error) {
      res.status(500).json({ message: 'Something went wrong B Reset' });
  }
};

// user counts
const getUserCountsByRole = async (req, res) => {
  try {
    const visitorCount = await User.countDocuments({ role: 'visitor' });
    const agencyCount = await User.countDocuments({ role: 'agency' });
    const totalCount = await User.countDocuments();

    res.json({
      total: totalCount,
      visitors: visitorCount,
      agencies: agencyCount
    });
  } catch (err) {
    console.error("Error fetching user counts:", err);
    res.status(500).json({ message: "Error fetching user counts" });
  }
};


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export signup & login controllers
module.exports = { 
  signupUser,
  loginUser,
  sendResetCode,
  verifyResetCode,
  resetPassword,
  getUserCountsByRole,
  getUsers,
  updateUser,
  deleteUser,
};
