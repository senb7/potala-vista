// components/ManageUsers.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = ({ refreshUserCounts }) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/allusers");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // confirmation dialog
  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };


// delete api call
  const handleDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/allusers/${userToDelete}`);
      setUsers(users.filter((user) => user._id !== userToDelete));
      refreshUserCounts();
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "bg-danger"
                        : user.role === "agency"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.role === "admin" ? (
                    <span style={styles.disabledActions}>No Actions</span>
                  ) : (
                    <>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
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
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    marginBottom: "20px",
    fontWeight: "bold",
  },
  disabledActions: {
    color: "#888",
    fontStyle: "italic",
  },
};

export default ManageUsers;
