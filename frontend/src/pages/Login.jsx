import { useState } from "react";

import "../assets/css/auth.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginSuccess, setIsLoginSuccess] = useState(true);

    async function handleSubmit(e){
        e.preventDefault();
        try {
          const response = await api.post("/auth/login", {email, password});
          console.log(response);
          setIsLoginSuccess(response.data.status);
          if(response.data.status){
            navigate('/dashboard');
          }else{
            
          }
        } catch (error) {
          setApiError(error.response.data.error.message);
          setIsLoginSuccess(error.response.data.status);
        }
    }

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Right Side */}
        <div className="auth-right">
          <div className="auth-card">
            <h2>Welcome Back 👋</h2>
            <p className="auth-subtitle">
              Login to continue managing your projects
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className={`form-group ${isLoginSuccess ? 'success' : 'invalid-credentials'}`}>
                <label>{ apiError }</label>
                </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="/">Forgot Password?</a>
              </div>

              <button type="submit" className="auth-btn">
                Login
              </button>
                <a href="/">Cancel</a>
            </form>

            <p className="auth-footer">
              Don’t have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
