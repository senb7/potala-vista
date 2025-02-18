import React, { useEffect, useState } from "react";
import axios from "axios";
import ManageUsers from "../components/ManageUsers.js";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [agencyCount, setAgencyCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin.name) {
      setAdminName(admin.name.toUpperCase());
    } else {
      console.error("Admin data not found");
    }
    fetchUserCounts();
  }, []);

  // Fetch user counts
  const fetchUserCounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/count");
      if (response.data) {
        setTotalUsers(response.data.total);
        setVisitorCount(response.data.visitors);
        setAgencyCount(response.data.agencies);
      } else {
        setError("Invalid data format received from API");
      }
    } catch (err) {
      setError("Error fetching user counts");
    }
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    // top section
    <div className="container" style={{ marginTop: "150px", height: "500px" }}>
      <div className="d-flex justify-content-between align-items-center bg-light p-3 shadow-sm">
        <h4 className="m-0" style={{ fontSize: "24px", fontWeight: "bold" }}>
          Admin Dashboard - {adminName || "Loading..."}
        </h4>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>


      {/* count section */}
      <div className="p-4 text-center mt-3" style={styles.container}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div style={{ ...styles.item, backgroundColor: '#f8d7da' }}>
          <p>Total Users: <span style={styles.number}>{totalUsers - 1}</span></p>
        </div>
        <div style={{ ...styles.item, backgroundColor: '#cfe2f3' }}>
          <p>Visitors: <span style={styles.number}>{visitorCount}</span></p>
        </div>
        <div style={{ ...styles.item, backgroundColor: '#55ff00cc' }}>
          <p>Travel Agencies: <span style={styles.number}>{agencyCount}</span></p>
        </div>
      </div>


      {/* manage users section */}
      <ManageUsers refreshUserCounts={fetchUserCounts} />
    </div>
  );
};

// styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    fontSize: '18px',
    fontWeight: '500',
    textAlign: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column', // Stack the text and number vertically
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    color: '#343a40',
    fontWeight: 'bold',
    flex: '1',
  },
  number: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#495057', // Darker color for the numbers to make them pop
  }
};

export default AdminDashboard;
