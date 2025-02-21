// src/components/PasswordResetModal.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    modal: {
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "400px", // Increased width
        backgroundColor: "#fff",
        textAlign: "center",
    },
    input: {
        width: "90%", // Increased width for better input visibility
        padding: "12px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
    },
    button: {
        padding: "12px 18px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "5px",
        fontSize: "16px",
    },
    buttonHover: {
        background: "#0056b3",
    },
};

const PasswordResetModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter Code, 3: Reset Password
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // send otp in email
    const handleSendCode = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/users/send-reset-code', { email });
            toast.success('Reset code sent to your Email');
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // verify otp code
    const handleVerifyCode = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/users/verify-reset-code', { email, code });
            toast.success('Code verified');
            setStep(3);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid code');
        } finally {
            setLoading(false);
        }
    };

    // password reset
    const handleResetPassword = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/users/reset-password', { email, password });
            toast.success('Password Reset Successfully');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {step === 1 && (
                    <div>
                        <h2>Forgot Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                        {loading ? (
                                <p style={{ color: '#0d6efd', fontSize: '18px', fontWeight: 'bold' }}>Sending OTP...</p>
                        ) : (
                            <button
                                onClick={handleSendCode}
                                style={styles.button}
                                onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
                                onMouseOut={(e) => (e.target.style.background = styles.button.background)}
                            >
                                Send Code
                            </button>
                        )}
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2>Enter Verification Code</h2>
                        <input
                            type="text"
                            placeholder="6-digit code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={styles.input}
                        />
                        {loading ? (
                                <p style={{ color: '#0d6efd', fontSize: '18px', fontWeight: 'bold' }}>Verifying Code...</p>
                        ) : (
                            <button
                                onClick={handleVerifyCode}
                                style={styles.button}
                                onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
                                onMouseOut={(e) => (e.target.style.background = styles.button.background)}
                            >
                                Verify Code
                            </button>
                        )}
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2>Reset Password</h2>
                        <input
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                        {loading ? (
                                <p style={{ color: '#0d6efd', fontSize: '18px', fontWeight: 'bold' }}>Resetting Password...</p>
                        ) : (
                            <button
                                onClick={handleResetPassword}
                                style={styles.button}
                                onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
                                onMouseOut={(e) => (e.target.style.background = styles.button.background)}
                            >
                                Reset Password
                            </button>
                        )}
                    </div>
                )}
                <button
                    onClick={onClose}
                    style={{ ...styles.button, background: "#dc3545" }}
                    onMouseOver={(e) => (e.target.style.background = "#a71d2a")}
                    onMouseOut={(e) => (e.target.style.background = "#dc3545")}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PasswordResetModal;
