import { useState } from "react";
import "../assets/css/auth.css";
import api from "../services/api";

export default function Signup() {
  const [isCompany, selectIsCompany] = useState("0");
  const [companyName, selectCompanyName] = useState("");
  const [firstName, selectFirstName] = useState("");
  const [lastName, selectLastName] = useState("");
  const [email, selectEmail] = useState("");
  const [password, selectPassword] = useState("");
  const [confirmPassword, selectConfirmPassword] = useState("");

  function handleIsCompany(e) {
    selectIsCompany(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post(isCompany == 1 ? "/auth/register/company" : "auth/register", {
      ...(isCompany == 1 ? {name: companyName} : null),
      firstName,
      lastName,
      email,
      password
    });
    console.log(response);
  }
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-right">
          <div className="auth-card">
            <h2>Create Account 🚀</h2>

            <p className="auth-subtitle">
              Start building and managing your tasks today
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
             
              <div className="form-group">
                <label>Is Company ?</label>
                <label>
                  <input type="radio" name="company" checked={isCompany === "0"}  value="0" onChange={handleIsCompany} />
                  No
                </label>
                <label>
                  <input type="radio" name="company" checked={isCompany === "1"}  value="1" onChange={handleIsCompany} />
                  Yes
                </label>
              </div>

              <div className={`form-group ${ isCompany == '0' ? 'hide' : 'show' }`}>
                <label>Company Name</label>
                <input type="text" placeholder="Enter your company name" onChange={(e) => selectCompanyName(e.target.value)} />
              </div>
      
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" onChange={(e) => selectFirstName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" onChange={(e) => selectLastName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" onChange={(e) => selectEmail(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Create password" onChange={(e) => selectPassword(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm password" onChange={(e) => selectConfirmPassword(e.target.value)} />
              </div>

              <button type="submit" className="auth-btn">
                Create Account
              </button>
            </form>

            <p className="auth-footer">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
