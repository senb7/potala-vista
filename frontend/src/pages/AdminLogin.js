// AdminLogin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// all styles for this page
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #6e7f8d, #b1c8d0)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  heading: {
    fontFamily: "'Arial', sans-serif",
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f0a500",
    border: "none",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  linkContainer: {
    textAlign: "right",
    paddingRight: "10px",
    fontSize: "20px",
  },
  link: {
    textDecoration: "none",
  },
};

// admin login function
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password Required ⚠️");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      if (response.data.role === "admin") {
        localStorage.setItem("adminEmail", email);
        toast.success("Login Successful");
        setTimeout(() => navigate("/admin/dashboard"), 2000);
      } else {
        toast.error("Unauthorized! Only admins can log in.");
      }
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
          <div style={styles.linkContainer}>
            <Link to="/admin/signup" style={styles.link}>Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
