// models/bookingModel.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    visitorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    travelDate: { type: Date, required: true },
    status: { type: String, enum: ["confirmed", "canceled"], default: "confirmed" },
    amount: { type: Number, required: true },
    bookedAt: { type: Date, default: Date.now }
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
