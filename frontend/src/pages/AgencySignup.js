import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// all styles for this page
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(120deg, #f0f4f7, rgb(160, 186, 217))",
    padding: "20px",
  },
  signupBox: {
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
    backgroundColor: "#27ae60",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

const AgencySignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("All Fields Required ⚠️");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/users/signup", {
        name,
        email,
        password,
        role: "agency",
      });
      toast.success("Signup Successful");
      setTimeout(() => navigate("/agency/login"), 2500);
    } catch (err) {
      toast.error("Signup Failed. Try Again.");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupBox}>
        <h2 style={styles.title}>Travel Agency Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Agency Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
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
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default AgencySignup;
