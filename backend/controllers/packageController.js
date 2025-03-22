// controllers/packageController.js
const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const Package = require('../models/packageModel');
const upload = require('../middleware/uploadMiddleware');
const User = require("../models/userModel"); 

//upload package
const uploadPackage = async (req, res) => {
  try {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: 'Image upload failed', error: err.message });
      }

      const { title, description, price, agencyId, maxCapacity } = req.body;
      const imageUrl = `/data/${req.file.filename}`;

      // Validate agencyId
      if (!mongoose.Types.ObjectId.isValid(agencyId)) {
        return res.status(400).json({ message: "Invalid Agency ID" });
      }

      // Check if agency is verified
      const agency = await User.findById(agencyId);
      if (!agency) {
        return res.status(404).json({ message: "Agency Not Found" });
      }
      if (agency.status !== "verified") {
        return res.status(403).json({ message: 'Your Account is Not Verified Yet' });
      }

      // Validate maxCapacity
      const capacity = parseInt(maxCapacity, 10);
      if (isNaN(capacity) || capacity <= 0) {
        return res.status(400).json({ message: 'Invalid max capacity' });
      }

      const itineraries = req.body.itineraries;

      // Ensure itineraries is always an array
      const itineraryArray = Array.isArray(itineraries)
        ? itineraries.map(item => item.trim())
        : typeof itineraries === 'string'
        ? itineraries.split(';').map(item => item.trim()).filter(Boolean) // Convert string to array
        : []; // Default to empty array if undefined or invalid

      const newPackage = new Package({
        title,
        description,
        itineraries: itineraryArray,
        price,
        image: imageUrl,
        agencyId,
        maxCapacity: capacity, // Add maxCapacity
        currentBookings: 0, // Initialize with 0
        rating: 'Good', // Default rating
        feedback: null, // Initially null
        feedbackDate: null // Initially null
      });
      await newPackage.save();
      
      res.status(201).json({ message: 'Package Uploaded', package: newPackage });
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload Failed', error: error.message });
  }
};



// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error });
  }
};



// Get a single package by ID
const getSinglePackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ message: 'Package Not Found' });
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// send feedback controller
const sendFeedback = async (req, res) => {
  try {
    const { rating, feedback, visitorId } = req.body; // Get visitorId from request
    const { id: packageId } = req.params; // Extract packageId from URL

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(visitorId)) {
      return res.status(400).json({ message: "Invalid visitor ID" });
    }

    // Check if the visitor has booked the package
    const bookingExists = await Booking.findOne({ visitorId, packageId });

    if (!bookingExists) {
      return res.status(403).json({ message: "You Must Book Package before Sending Feedback" });
    }

    // Update the package with new feedback
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      {
        $set: {
          rating,
          feedback,
          feedbackDate: new Date(),
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found." });
    }

    res.status(200).json({ message: "Feedback Submitted", package: updatedPackage });
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({ message: "Failed to submit feedback.", error: error.message });
  }
};



// Agency fetch packages
const agencyManagePackages = async (req, res) => {
  try {
    const { agencyId } = req.params;
    const packages = await Package.find({ agencyId }).select('title price feedback maxCapacity currentBookings');

    res.status(200).json({ message: 'Fetch Success', data: packages });
    // console.log(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// Delete a package by ID
const deletePackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ success: false, message: 'Package Not Found' });
    }
    await package.deleteOne();
    res.status(200).json({ success: true, message: 'Package Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// edit package controller
const editPackage = async (req, res) => {
  try {
    const { id: packageId } = req.params; // Extract packageId from URL
    const { title, description, maxCapacity, price } = req.body; // Fields to update

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }

    // Find and update the package
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      { $set: { title, description, maxCapacity, price } },
      { new: true } // Return updated document
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({ message: 'Package Updated Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Update Package' });
  }
};



// exports
module.exports = {
  uploadPackage,
  getAllPackages,
  getSinglePackage,
  sendFeedback,
  agencyManagePackages,
  deletePackage,
  editPackage
};
