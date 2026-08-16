import React, { useState, useEffect } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [fallbackOtp, setFallbackOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get email
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      const token = localStorage.getItem("activationToken");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload?.user?.email) {
            setEmail(payload.user.email);
          }
        } catch (e) {
          console.error("Error decoding token payload:", e);
        }
      }
    }

    // 2. Check for fallback OTP (when cloud provider blocks SMTP)
    const fb = localStorage.getItem("fallbackOtp");
    if (fb) {
      setFallbackOtp(fb);
      setOtp(fb); // auto-fill for frictionless testing
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>

        <div style={{
          backgroundColor: '#f0f7ff',
          border: '1px solid #cce5ff',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#495057' }}>
            Verification code sent to:
          </p>
          <p style={{ margin: '3px 0 0 0', fontSize: '15px', fontWeight: 'bold', color: '#007bff' }}>
            {email || "your email address"}
          </p>
          <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#dc3545', fontWeight: 500 }}>
            ⚠️ Note: Please check your <strong>Spam / Junk</strong> folder if not in Inbox!
          </p>
        </div>

        {fallbackOtp && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeeba',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#856404' }}>
              ⚡ <strong>Direct Code:</strong> <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{fallbackOtp}</span>
            </p>
          </div>
        )}

        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Enter 6-Digit OTP</label>
          <input
            type="number"
            id="otp"
            placeholder="e.g. 123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            autoFocus
          />
          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait..." : "Verify OTP"}
          </button>
        </form>
        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;