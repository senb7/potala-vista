// controllers/userController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// signup controller
const signupUser = async (req, res) => {

  // nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const { name, email, address, contact, password, role } = req.body;

  // Check if admin already exists
  if (role === 'admin') {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({ error: 'ADMIN ALREADY IN SYSTEM' });
    }
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email Already Exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token using crypto
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Set token expiry time (e.g., 10 minutes from now)
    const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes

    // Save user with 'pending' status
    const newUser = new User({
      name,
      email,
      address,
      contact,
      password: hashedPassword,
      role,
      verificationToken,
      tokenExpiry
    });

    await newUser.save();

    // Send verification email
    const verificationLink = `http://localhost:5000/api/users/verify/${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - PotalaVista',
      html: `
        <h2>Welcome to PotalaVista, ${name}!</h2>
        <p>Click the link below to verify your email and activate your account:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>If you did not register, please ignore this email.</p>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email Sending Error:", error);
      return res.status(500).json({ error: "Email Could Not Sent" });
    }
    res.status(201).json({ message: 'Signup Successful, Please Check your email for Verification' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user || user.tokenExpiry < Date.now()) {
      return res.status(400).json({ error: 'Invalid or Expired Token' });
    }

    user.status = 'verified';
    user.verificationToken = null;
    user.tokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Account Verified Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
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

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ 
      message: "Login Successful",
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token // Send token to frontend
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
      if (!isMatch) return res.status(400).json({ message: 'Invalid Reset Code' });

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

      res.json({ message: 'Password Reset Successful' });

  } catch (error) {
      res.status(500).json({ message: 'Something Went Wrong' });
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
  verifyEmail,
  loginUser,
  sendResetCode,
  verifyResetCode,
  resetPassword,
  getUserCountsByRole,
  getUsers,
  updateUser,
  deleteUser,
};
