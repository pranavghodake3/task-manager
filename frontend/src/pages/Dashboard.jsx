// Dashboard.jsx

import { Link } from "react-router-dom";
import "../assets/css/dashboard.css";
import NavBar from "../compoenets/NavBar";
import { getUserInfo } from "../util/auth";
import { ROLES } from "../constants"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const projects = [
  {
    id: 1,
    name: "Task Manager App",
    key: "TM",
    issues: 24,
  },
  {
    id: 2,
    name: "Auth Service",
    key: "AUTH",
    issues: 12,
  },
  {
    id: 3,
    name: "Notification System",
    key: "NOTIFY",
    issues: 8,
  },
];

const activities = [
  "Rahul moved TM-24 to DONE",
  "Amit commented on AUTH-12",
  "New issue created in NOTIFY",
  "Sprint planning completed",
];

export default function Dashboard() {
  const AuthContextData = useContext(AuthContext);
  console.log("Dashboard AuthContextData: ",AuthContextData)
  const user = getUserInfo();
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, { user.firstName + ' ' + user.lastName + ROLES.SUPER_ADMIN } == { AuthContextData.user.email } 👋</p>
          </div>

          <button className="create-btn">+ Create Issue</button>
        </header>

        {/* Stats */}
        <section className="stats-grid">
          <div className="card stat-card">
            <h3>Total Projects</h3>
            <p>12</p>
          </div>

          <div className="card stat-card">
            <h3>Open Issues</h3>
            <p>48</p>
          </div>

          <div className="card stat-card">
            <h3>Completed Tasks</h3>
            <p>132</p>
          </div>

          <div className="card stat-card">
            <h3>Team Members</h3>
            <p>18</p>
          </div>
        </section>

        {/* Projects */}
        <section className="projects-section">
          <div className="section-header">
            <h2>Projects</h2>
            <button>View All</button>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="card project-card">
                <div className="project-avatar">{project.key}</div>

                <div>
                  <h3>{project.name}</h3>
                  <p>{project.issues} Open Issues</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activity */}
        <section className="activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>

          <div className="card activity-card">
            {activities.map((activity, index) => (
              <div key={index} className="activity-item">
                {activity}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}