// models/feedbackModel.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    contactNumber: String,
    feedback: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
