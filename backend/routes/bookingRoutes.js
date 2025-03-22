const express = require("express");
const router = express.Router();
const { createBooking, getVisitorBookings, cancelVisitorBooking, getAgencyBookings, deleteBooking } = require("../controllers/bookingController");

// booking route
router.post("/", createBooking);
router.get("/:visitorId", getVisitorBookings);
router.put("/cancel/:id", cancelVisitorBooking);
router.get("/agency/:agencyId", getAgencyBookings);
router.delete("/:id", deleteBooking);

module.exports = router;
