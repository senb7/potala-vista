// models/packageModel.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    itineraries: [{ type: String, required: true }], // Array of strings for itineraries
    price: { type: Number, required: true },
    image: { type: String, required: true },
    agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: String, enum: ['Best', 'Good', 'Bad'], default: 'Good' },
    feedback: { type: String, default: null },
    feedbackDate: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
