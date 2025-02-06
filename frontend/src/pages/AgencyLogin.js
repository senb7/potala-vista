import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(120deg, #f0f4f7, rgb(160, 186, 217))",
    padding: "20px",
  },
  loginBox: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "40px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "bold",
    color: "#2980b9",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#f39c12",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  link: {
    fontSize: "16px",
    color: "#2980b9",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "10px",
    transition: "color 0.3s",
  },
};

const AgencyLogin = () => {
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

      if (response.data.role === "agency") {
        localStorage.setItem("agency", email);
        toast.success("Login Successful");
        setTimeout(() => navigate("/agency/dashboard"), 2500);
      } else {
        toast.error("Unauthorized! Only travel agencies can log in.");
      }
    } catch (err) {
      toast.error("Invalid Credentials ⚠️");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Travel Agency Login</h2>
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
          <button type="submit" style={styles.button}>Login</button>
          <div style={{ marginTop: "20px" }}>
            <Link
              to="/agency/signup"
              style={styles.link}
              onMouseEnter={(e) => (e.target.style.color = "#f39c12")}
              onMouseLeave={(e) => (e.target.style.color = "#2980b9")}
            >
              No Account? Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgencyLogin;
