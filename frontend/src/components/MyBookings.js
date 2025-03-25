// components/MyBookings.js
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoBookings, setShowNoBookings] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [bookingToCancel, setBookingToCancel] = useState(null); // State to store the booking to cancel

  const fetchBookings = async () => {
    setHasClicked(true);
    setShowLoading(true);

    setTimeout(async () => {
      setLoading(true);
      const visitor = JSON.parse(localStorage.getItem("visitor"));
      if (visitor && visitor.id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/bookings/${visitor.id}`);
          setBookings(response.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        toast.error("No visitor Found");
      }
      setLoading(false);
      setShowLoading(false);

      setTimeout(() => {
        if (bookings.length === 0) {
          setShowNoBookings(true);
        }
      }, 1000);
    }, 1000);
  };

  // Cancel booking
  const handleCancel = async () => {
    if (bookingToCancel) {
      try {
        const response = await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingToCancel._id}`);
        toast.success(response.data.message);

        // Update UI
        const updatedBookings = bookings.map(booking =>
          booking._id === bookingToCancel._id
            ? { ...booking, status: "canceled" }
            : booking
        );
        setBookings(updatedBookings);
      } catch (error) {
        toast.error(error.response?.data?.error ?? 'Failed to Cancel Booking');
      } finally {
        setShowModal(false);
      }
    }
  };

  // Show modal with booking details
  const confirmCancelBooking = (booking) => {
    setBookingToCancel(booking);
    setShowModal(true);
  };

  // Close modal without canceling
  const closeModal = () => {
    setShowModal(false);
    setBookingToCancel(null);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>My Bookings</h3>
      <button style={styles.button} onClick={fetchBookings}>See My Bookings</button>

      {showLoading && !loading && <p style={styles.loadingText}>Loading...</p>}

      {hasClicked && bookings.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Package Title</th>
              <th style={styles.tableHeader}>Booking Date</th>
              <th style={styles.tableHeader}>Travel Date</th>
              <th style={styles.tableHeader}>Amount</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.tableCell}>{booking.packageId?.title || "No title"}</td>
                <td style={styles.tableCell}>{booking.bookedAt ? new Date(booking.bookedAt).toLocaleDateString() : "Date not available"}</td>
                <td style={styles.tableCell}>{booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : "Travel date not available"}</td> {/* Display travel date */}
                <td style={styles.tableCell}>{booking.amount || "No Amount"}</td>
                <td style={styles.tableCell}>{booking.status || "No status"}</td>
                <td style={styles.tableCell}>
                  {booking.status === "confirmed" ? (
                    <button style={styles.cancelButton} onClick={() => confirmCancelBooking(booking)}>
                      Cancel Booking
                    </button>
                  ) : (
                    <span style={styles.canceledText}>Canceled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        hasClicked && !showLoading && showNoBookings && <p style={styles.noBookings}>No Bookings Found</p>
      )}

      {/* Modal for confirming cancellation */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h4>Are you sure to cancel this booking?</h4>
            <div style={styles.modalActions}>
              <button style={styles.modalButton} onClick={handleCancel}>Yes</button>
              <button style={styles.modalButton} onClick={closeModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    marginBottom: "15px",
    cursor: "pointer",
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    color: "#333",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: "18px",
    color: "#800080",
    fontWeight: "bold",
    marginLeft: "10px",
  },
  noBookings: {
    fontSize: "18px",
    color: "#d9534f",
    fontWeight: "bold",
    marginLeft: "10px",
  },
  cancelButton: {
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  canceledText: {
    color: "#d9534f",
    fontWeight: "bold",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "300px",
  },
  modalActions: {
    marginTop: "20px",
  },
  modalButton: {
    padding: "10px 20px",
    fontSize: "14px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default MyBookings;
