// routes/feedbackRoutes.js
const express = require('express');
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackController');
const verifyAdmin = require("../middleware/authMiddleware");

const router = express.Router();

// Route to submit feedback (accessible to anyone)
router.post('/submit', submitFeedback);

// Route to retrieve all feedback (only admin should access this - middleware to be added later)
router.get('/all', verifyAdmin, getAllFeedback);

module.exports = router;
