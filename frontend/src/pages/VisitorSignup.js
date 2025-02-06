import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// page styles
const styles = {
  container: {
    marginTop: "150px",
    height: "700px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  form: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 2px 24px rgba(0, 0, 0, 0.2)",
  },
  button: {
    fontWeight: "bold",
  },
};

// visitor signup
const VisitorSignup = () => {
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
        role: "visitor",
      });
      toast.success("Signup Successful");
      setTimeout(() => navigate("/visitor/login"), 2500);
    } catch (err) {
      toast.error(`${err.response.data.error} ⚠️`);
    }
  };

  const handleBack = () => {
    navigate("/visitor/login");
  };

  return (
    <div className="container" style={styles.container}>
      <h2 className="text-center text-danger mb-4">Visitor - Signup</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          className="form-control mb-4"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-warning" type="submit" style={styles.button}>
            Sign Up
          </button>
          <button className="btn btn-success" type="button" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitorSignup;
