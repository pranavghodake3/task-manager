import "../assets/css/dashboard.css";
import { NavLink } from "react-router-dom";
import NavBar from "../compoenets/NavBar";

export default function Unathorized() {
  return (
    <div className="dashboard unauthorized-page">
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Unauthorized</h1>
            <p className="topbar-subtitle">
              You don’t have permission to access this page.
            </p>
          </div>
        </header>

        <section className="unauthorized-card">
          <div className="unauthorized-icon">!</div>
          <div className="unauthorized-content">
            <h2>Access Denied</h2>
            <p>
              This section is restricted. If you believe this is an error, contact your administrator or return to a safe page.
            </p>

            <div className="unauthorized-actions">
              <NavLink to="/dashboard" className="button primary">
                Go to Dashboard
              </NavLink>
              <NavLink to="/" className="button secondary">
                Return Home
              </NavLink>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}