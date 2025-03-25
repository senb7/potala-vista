import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AgencyManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null); // Store the booking to delete
  const agency = JSON.parse(localStorage.getItem("agency"));

  // Fetch bookings button
  const fetchBookings = async () => {
    setHasClicked(true);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/agency/${agency.id}`);
      setBookings(response.data || []);
    } catch (err) {
      console.log(err);
      // toast.error("Failed to fetch bookings.");
    }
    setLoading(false);
  };

  // Handle delete
  const handleDelete = async () => {
    if (bookingToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${bookingToDelete}`);
        setBookings(bookings.filter((booking) => booking._id !== bookingToDelete));
        toast.success("Booking Deleted Successfully");
      } catch (error) {
        toast.error("Failed to Delete Booking");
      }
      setShowModal(false); // Close modal after deletion
    }
  };

  // Show confirmation modal before deleting
  const confirmDelete = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowModal(true);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowModal(false);
    setBookingToDelete(null);
  };

  // Function to format date to a readable format
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "Invalid Date";
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Manage all the Bookings</h3>
      <button style={styles.button} onClick={fetchBookings}>
        See All Bookings
      </button>
      {loading && <p style={styles.loadingText}>Loading...</p>}
      {hasClicked && bookings.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>SN</th>
              <th style={styles.tableHeader}>Visitor Name</th>
              <th style={styles.tableHeader}>Email</th>
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
              <tr key={booking._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{booking.visitorId?.name || "N/A"}</td>
                <td style={styles.tableCell}>{booking.visitorId?.email || "N/A"}</td>
                <td style={styles.tableCell}>{booking.packageId?.title || "No title"}</td>
                <td style={styles.tableCell}>
                  {formatDate(booking.bookedAt)} {/* Use formatDate for booking date */}
                </td>
                <td style={styles.tableCell}>
                  {formatDate(booking.travelDate)} {/* Use formatDate for travel date */}
                </td>
                <td style={styles.tableCell}>{booking.amount || "No Price"}</td>
                <td
                  style={
                    booking.status === "confirmed"
                      ? { ...styles.tableCell, ...styles.confirmedStatus }
                      : booking.status === "canceled"
                      ? { ...styles.tableCell, ...styles.canceledStatus }
                      : styles.tableCell
                  }
                >
                  {booking.status || "No status"}
                </td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => confirmDelete(booking._id)}
                  >
                    Delete Booking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        hasClicked && !loading && <p style={styles.noBookings}>No Bookings Found</p>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h4 style={styles.modalHeader}>Are you sure to delete this booking?</h4>
            <div style={styles.modalButtons}>
              <button
                style={styles.modalButton}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                style={styles.modalButton}
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles object
const styles = {
  container: {
    marginTop: "120px",
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
    cursor: "pointer",
    backgroundColor: "#444", // Dark Green
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    transition: "background 0.3s ease-in-out",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
    backgroundColor: "#6B8B87",
    color: "#fff",
  },
  tableCell: {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: "18px",
    color: "#D2691E",
    fontWeight: "bold",
  },
  noBookings: {
    fontSize: "18px",
    color: "#FF4500",
    fontWeight: "bold",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#B22222", // Burnt Orange
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    transition: "background 0.3s ease-in-out",
  },
  confirmedStatus: {
    padding: "2px 10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "0px",
    textAlign: "center",
  },
  canceledStatus: {
    backgroundColor: "#D3D3D3",
    color: "#777",
    padding: "5px 10px",
    borderRadius: "0px",
    fontSize: "16px",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
  },
  modalHeader: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
  },
  modalButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#FF6347", // Tomato
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default AgencyManageBookings;
