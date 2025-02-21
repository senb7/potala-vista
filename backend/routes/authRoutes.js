// routes/authRoutes.js
const express = require("express");
const { signupUser, loginUser, resetPassword, getUserByEmail } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
