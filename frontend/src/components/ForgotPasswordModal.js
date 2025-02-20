// components/ForgotPasswordModal.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (!email.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      toast.error("All Fields are Required");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/reset-password", {
        email,
        newPassword,
      });

      if (response.data.success) {
        toast.success("Password Reset Successful");
        // Clear input fields
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");

        // Close modal after short delay
        setTimeout(onClose, 2000);
      } else {
        toast.error("Email Not Found");
      }
    } catch (err) {
      toast.error("Error resetting password");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h3>Reset Password</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleResetPassword} style={styles.button}>Reset</button>
        <button onClick={onClose} style={styles.closeButton}>Cancel</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    width: "900px",
    minHeight: "400px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  closeButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ForgotPasswordModal;
