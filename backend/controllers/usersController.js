// backend/controllers/userController.js
const User = require('../models/userModel');

// Get count of users by role
exports.getUserCountsByRole = async (req, res) => {
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
