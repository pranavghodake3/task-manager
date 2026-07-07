import { useState } from "react";
import "../assets/css/auth.css";
import api from "../services/api";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const setUserData = useAuthStore((state) => state.setUserData);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setAccessTokenExpiry = useAuthStore((state) => state.setAccessTokenExpiry);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);


  // const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginSuccess, setIsLoginSuccess] = useState(true);

    function setLoginData(data) {
      setUserData(data.user);
      setAccessToken(data.accessToken);
      const expireMinutes = parseInt(data.accessTokenExpiresIn, 10);
      const expiryMs = Date.now() + expireMinutes * 60 * 1000;
      setAccessTokenExpiry(expiryMs.toString());
      setIsLoggedIn(true);
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
          const response = await api.post("/auth/login", {email, password});
          setUserData(response.data.data.user);
          setIsLoginSuccess(response.data.status);
          setLoginData(response.data.data);
          
          if(response.data.status){
            navigate('/dashboard');
          }
        } catch (error) {
          console.log("Login Error: ",error)
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

                <NavLink to="/" end>Forgot Password?</NavLink>
              </div>

              <button type="submit" className="auth-btn">
                Login
              </button>
              <NavLink to="/" end>Cancel</NavLink>
            </form>

            <p className="auth-footer">
              Don’t have an account? <NavLink to="/signup" end>Sign Up</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
