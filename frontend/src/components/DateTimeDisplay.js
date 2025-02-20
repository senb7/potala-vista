// components/DateTimeDisplay.js

import React, { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format date as DD-MM-YYYY and time as HH:MM:SS AM/PM
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `Date: ${day}-${month}-${year} |  Time: ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div style={styles.container}>
      {formatDate(currentDateTime)}
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#22222211",
    padding: "8px 15px",
    borderRadius: "8px",
    boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.1)",
    display: "inline-block",
  },
};

export default DateTimeDisplay;
