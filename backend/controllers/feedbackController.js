// controllers/feedbackController.js
const Feedback = require('../models/feedbackModel');

// feedback submit
const submitFeedback = async (req, res) => {
  try {
    const { name, email, contactNumber, feedback } = req.body;
    
    // Create a new feedback document
    const newFeedback = new Feedback({
      name,
      email,
      contactNumber,
      feedback
    });
    
    // Save feedback to database
    const savedFeedback = await newFeedback.save();
    res.status(201).json({ message: 'Feedback Submitted', data: savedFeedback });
  } catch (error) {
    console.error('Error while submitting feedback:', error);
    res.status(500).json({ message: 'Server error while submitting feedback' });
  }
};


// get all feedbacks
const getAllFeedback = async (req, res) => {
  try {
    // Retrieve all feedback entries, sorted with the latest first
    const feedbacks = await Feedback.find().sort({ sentAt: -1 });
    res.status(200).json({ data: feedbacks });
  } catch (error) {
    console.error('Error while retrieving feedback:', error);
    res.status(500).json({ message: 'Server error while retrieving feedback' });
  }
};


// module exports
module.exports = {
  submitFeedback,
  getAllFeedback
};
