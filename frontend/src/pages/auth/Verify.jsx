import React, { useState, useEffect } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const RESEND_COOLDOWN = 30; // 30 seconds cooldown

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  const { btnLoading, verifyOtp, resendOtp } = UserData();
  const navigate = useNavigate();

  // Load recipient email
  useEffect(() => {
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
  }, []);

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (timer > 0) {
      setCanResend(false);
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    if (!canResend || btnLoading) return;
    const res = await resendOtp();
    if (res) {
      setTimer(RESEND_COOLDOWN);
      setCanResend(false);
      setOtp(""); // keep input blank for manual entry
    }
  };

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
          marginBottom: '18px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#495057' }}>
            Verification code sent to your email:
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: '15px', fontWeight: 'bold', color: '#007bff' }}>
            {email || "your registered email"}
          </p>
          <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#6c757d' }}>
            📩 (Please check your <strong>Inbox</strong> or <strong>Spam/Junk</strong> folder)
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Enter 6-Digit OTP</label>
          <input
            type="number"
            id="otp"
            placeholder="Enter OTP from email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            autoFocus
          />
          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP with Timer */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
            Didn't receive the email?{" "}
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={btnLoading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  fontSize: '13px'
                }}
              >
                Resend OTP
              </button>
            ) : (
              <span style={{ color: '#888', fontWeight: 600 }}>
                Resend in {timer}s
              </span>
            )}
          </p>
        </div>

        <p style={{ marginTop: '20px' }}>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;