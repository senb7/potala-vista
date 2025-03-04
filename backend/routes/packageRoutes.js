// routes/packageRoutes.js
const express = require('express');
const { uploadPackage, getAllPackages, getSinglePackage, sendFeedback } = require('../controllers/packageController');

const router = express.Router();

// Route to upload a package with an image
router.post('/upload', uploadPackage);

// Route to get all packages
router.get('/all', getAllPackages);

// Route to get a single package by ID
router.get('/:id', getSinglePackage);

// Route to submit feedback for a package (PATCH)
router.patch('/:id/feedback', sendFeedback); // Add this line

module.exports = router;
