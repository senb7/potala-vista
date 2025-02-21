// routes/userRoutes.js
const express = require("express");
const { signupUser, loginUser, sendResetCode, verifyResetCode, resetPassword, getUserCountsByRole, getUsers, updateUser, deleteUser, } = require("../controllers/userController");
const router = express.Router();


// login & signup routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

// password reset routes
router.post('/send-reset-code', sendResetCode);   // Step 1: Send reset code
router.post('/verify-reset-code', verifyResetCode); // Step 2: Verify reset code
router.post('/reset-password', resetPassword);     // Step 3: Reset password

// Route to get user counts by role
router.get('/count', getUserCountsByRole);

// CRUD user routes
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);



module.exports = router;
