import { NavLink, useNavigate } from "react-router-dom";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import { useForm } from "react-hook-form";
import api from "../services/api";

export default function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: { password: "", confirm_password: "" },
  });

  const mode = "update";

  async function onSubmit(data) {
    try {
      await api.post(`/user/change-password`, data);
      navigate("/profile");
    } catch (error) {
      console.error("Change password error", error);
    }
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <Header
          title="Edit User"
          description=""
          button={
            <NavLink className="create-btn" to="/users">
              Back
            </NavLink>
          }
        />

        {/* Users Table */}
        <section className="users-table-section">
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create password"
                {...register("password")}
              />
              {errors.password && (
                <p className="error-text">{errors.password.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <p className="error-text">{errors.confirm_password.message}</p>
              )}
            </div>

            <button type="submit" className="auth-btn" disabled={isSubmitting}>
              {mode === "create"
                ? isSubmitting
                  ? "Submitting..."
                  : "Submit"
                : isSubmitting
                  ? "Updating..."
                  : "Update"}
            </button>
            <button
              type="button"
              className="auth-btn"
              onClick={() => navigate("/users")}
            >
              Cancel
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
