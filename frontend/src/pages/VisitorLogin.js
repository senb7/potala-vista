import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  button: {
    width: "90px",
    fontWeight: "bold",
  },
};

const VisitorLogin = () => {
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

      if (response.data.role === "visitor") {
        localStorage.setItem("visitor", email);
        toast.success("Login Successful");
        setTimeout(() => navigate("/visitor/dashboard"), 2500);
      } else {
        toast.error("Unauthorized! only Visitors ⚠️");
      }
    } catch (err) {
      toast.error("Invalid Credentials ⚠️");
    }
  };

  return (
    <div className="container" style={styles.container}>
      <h2 className="text-center text-danger mb-4">Visitor - Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
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
          <button type="submit" className="btn btn-warning" style={styles.button}>
            Login
          </button>
          <Link to="/visitor/signup" className="btn btn-success ms-2">
            No Account? Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VisitorLogin;
