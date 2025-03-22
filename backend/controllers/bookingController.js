// controllers/bookingController.js
const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const Package = require('../models/packageModel');
const User = require('../models/userModel');

// create booking
const createBooking = async (req, res) => {
  try {
    const { visitorId, packageId, travelDate, visitors, amount } = req.body;

    // Input validation
    if (!visitorId || !packageId || !travelDate) {
      return res.status(400).json({ message: 'Visitor ID Package ID and Travel Date are Required' });
    }

    if (!mongoose.Types.ObjectId.isValid(visitorId) || !mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: 'Invalid Visitor ID or Package ID' });
    }

    // Check if visitor is verified
    const visitor = await User.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor Not Found' });
    }
    if (visitor.status !== 'verified') {
      return res.status(403).json({ message: 'Your Account Is Not Verified Yet' });
    }
       
    // Find the package
    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res.status(404).json({ message: 'Package Not Found' });
    }

    // Check if the package has enough space for new visitors
    if ((packageData.currentBookings + visitors) > packageData.maxCapacity) {
      return res.status(400).json({ message: 'Booking Full: Not Enough Available Slots' });
    }


    // Check if user has already booked the package
    const existingBooking = await Booking.findOne({ visitorId, packageId });

    if (existingBooking) {
      if (existingBooking.status === 'canceled') {
        // If canceled, change status to confirmed with new travel date
        existingBooking.status = 'confirmed';
        existingBooking.travelDate = travelDate;
        existingBooking.amount = amount;
        existingBooking.bookedAt = new Date();
        await existingBooking.save();

        // Increment currentBookings in the package
        await Package.findByIdAndUpdate(packageId, { $inc: { currentBookings: visitors } });

        return res.status(200).json({ message: 'Booking Successful', booking: existingBooking });
      } else {
        return res.status(409).json({ message: 'You have already booked this Package' });
      }
    }

    // Create and save new booking
    const newBooking = new Booking({ visitorId, packageId, travelDate, amount });
    await newBooking.save();

    // Increment currentBookings in the package
    await Package.findByIdAndUpdate(packageId, { $inc: { currentBookings: visitors } });

    res.status(201).json({ message: 'Booking Successful', booking: newBooking });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Cancel booking
const cancelVisitorBooking = async (req, res) => {
  const visitorDecrement = -2;

  try {
    const bookingId = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID format' });
    }

    // Find booking
    const booking = await Booking.findById(new mongoose.Types.ObjectId(bookingId));
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if already canceled
    if (booking.status === 'canceled') {
      return res.status(409).json({ message: 'Booking is already canceled' });
    }

    // Update status to 'canceled'
    booking.status = 'canceled';
    await booking.save();

    // Decrease currentBookings count in Package
    await Package.findByIdAndUpdate(booking.packageId, { $inc: { currentBookings: visitorDecrement } });

    res.status(200).json({ message: 'Booking Canceled Successfully' });
  } catch (error) {
    console.error('Error in cancelVisitorBooking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// Get visitor bookings
const getVisitorBookings = async (req, res) => {
  try {
    const { visitorId } = req.params;

    const bookings = await Booking.find({ visitorId })
      .populate("visitorId", "name email")
      .populate("packageId", "title")
      .select("status bookedAt travelDate amount");

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this visitor" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





// get agency bookings list
const getAgencyBookings = async (req, res) => {
  try {
    const { agencyId } = req.params;

    const bookings = await Booking.find().populate("visitorId", "name email")
      .populate("packageId", "title agencyId")
      .select("status bookedAt travelDate amount");

    const agencyBookings = bookings.filter(booking => 
      booking.packageId.agencyId.toString() === agencyId);

    if (!agencyBookings.length) {
      return res.status(404).json({ message: "No bookings found for this agency." });
    }

    res.status(200).json(agencyBookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// delete booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  createBooking,
  getVisitorBookings,
  cancelVisitorBooking,
  getAgencyBookings,
  deleteBooking
};
