import React, { useState } from "react";
import "./Login.css";
import { useLoginHook } from "../hooks/useLoginHook";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const { login, loading, error } = useLoginHook();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await login(formData);
    if (result) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form-section">
          <div className="login-header">
            <img
              src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740"
              alt="logo"
            />
            <h1>Welcome Back</h1>
            <p>Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {formErrors.email && (
                <div className="error-message">
                  <FiAlertCircle />
                  {formErrors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {formErrors.password && (
                <div className="error-message">
                  <FiAlertCircle />
                  {formErrors.password}
                </div>
              )}
            </div>

            {error && (
              <div className="error-message">
                <FiAlertCircle />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="forgot-password">
              <a href="#!">Forgot your password?</a>
            </div>
          </form>

          <div className="register-section">
            <p>Don't have an account?</p>
            <button
              className="register-button"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>
        </div>

        <div className="login-image-section">
          <div className="content">
            <h2>Welcome to Our Platform</h2>
            <p>
              We provide the best solutions for your business needs. Join us today
              and experience the difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
