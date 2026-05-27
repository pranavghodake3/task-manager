import { Link } from "react-router-dom";
import "../assets/css/home.css";

function Home() {
  return (
    <div className="home-page">

      <nav className="navbar">
        <h2>TaskManager Pro</h2>

        <div>
          <Link to="/login" className="btn login-btn">
            Login
          </Link>

          <Link to="/signup" className="btn signup-btn">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="hero">

        <h1>
          Manage Projects, Teams & Tasks
        </h1>

        <p>
          A centralized platform for companies to
          manage projects, employees, tasks and
          collaboration.
        </p>

        <Link
          to="/signup"
          className="btn hero-btn"
        >
          Get Started
        </Link>

      </section>

      <section className="features">

        <div className="feature-card">
          <h3>Project Management</h3>
          <p>
            Create and track projects efficiently.
          </p>
        </div>

        <div className="feature-card">
          <h3>Task Assignment</h3>
          <p>
            Assign work to developers and teams.
          </p>
        </div>

        <div className="feature-card">
          <h3>Role Management</h3>
          <p>
            Manage Super Admin, Company Admin,
            Managers and Employees.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;
