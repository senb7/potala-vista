// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: String,
    contact: String,
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "agency", "visitor"], required: true },
    status: { type: String, default: 'pending'},
    verificationToken: String,
    tokenExpiry: Number,
    resetCode: { type: String },
    resetCodeExpiry: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
