import { useState } from "react";
import "../assets/css/auth.css";
import api from "../services/api";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../formSchemas/signup-form";

export default function Signup() {
  const [isCompany, selectIsCompany] = useState("0");
  const [formError, setFormError] =useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (formData) => {
    try {
      await api.post(isCompany == 1 ? "/auth/register/company" : "auth/register", {
        ...(isCompany == 1 ? {name: formData.name} : null),
        ...formData
      });
      navigate("/login");
    } catch (error) {
      setFormError(error.response.data.error.message);
      console.error("Error occurred while signing up:", error);
    }
  };

  function handleIsCompany(e) {
    selectIsCompany(e.target.value);
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

            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Is Company ?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="company" checked={isCompany === "0"}  value="0" onChange={handleIsCompany} />
                    No
                  </label>
                  <label>
                    <input type="radio" name="company" checked={isCompany === "1"}  value="1" onChange={handleIsCompany} />
                    Yes
                  </label>
                </div>
              </div>

              <div className={`form-group ${ isCompany == '0' ? 'hide' : 'show' }`}>
                <label>Company Name</label>
                <input type="text" name="name" placeholder="Enter your company name" {...register('name')} />
                {errors.name && <p className="error-text">{errors.name.message}</p>}
              </div>
      
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="Enter your first name" {...register('firstName')} />
                {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="Enter your last name" {...register('lastName')} />
                {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="text" placeholder="Enter your email" {...register('email')} />
                {errors.email && <p className="error-text">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Create password" {...register('password')} />
                {errors.password && <p className="error-text">{errors.password.message}</p>}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" placeholder="Confirm password" {...register('confirm_password')} />
                {errors.confirm_password && <p className="error-text">{errors.confirm_password.message}</p>}
              </div>

              <p className="error-text">{formError}</p>

              <button type="submit" className="auth-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Create Account'}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account? <NavLink to="/login" end>Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
