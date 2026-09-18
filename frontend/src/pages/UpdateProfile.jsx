import { NavLink, useNavigate } from "react-router-dom";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";
import { updateProfileSchema } from "../formSchemas/updateProfileSchema";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUserData = useAuthStore((state) => state.setUserData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
    });
  }, [user, reset]);

  async function onSubmit(data) {
    try {
      const response = await api.post(`/users/profile`, data);
      const updatedUser = { ...user, ...data };
      setUserData(updatedUser);
      if (response.data.status) {
        navigate("/profile");
      }
    } catch (error) {
      console.log("Profile Update Error", error);
      // setFormErrorMessage(error.response.data.error.message);
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
          title="Update Profile"
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
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="error-text">{errors.firstName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="error-text">{errors.lastName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email")}
                disabled={true}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="auth-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
