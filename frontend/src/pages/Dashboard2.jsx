import "../assets/css/dashboard2.css";

function Dashboard() {

  const user = {
    name: "Pranav",
    role: "SUPER_ADMIN"
  };

  return (
    <div className="dashboard">

      <header className="topbar">

        <div>
          <h2>TaskManager Pro</h2>
        </div>

        <div className="profile-section">

          <div>
            <p>{user.name}</p>
            <span>{user.role}</span>
          </div>

          <button className="logout-btn">
            Logout
          </button>

        </div>

      </header>

      <main>

        <div className="welcome-section">

          <h1>
            Welcome Back, {user.name}
          </h1>

          <p>
            Here's what's happening today.
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Projects</h3>
            <h2>14</h2>
          </div>

          <div className="stat-card">
            <h3>Total Users</h3>
            <h2>82</h2>
          </div>

          <div className="stat-card">
            <h3>Open Tasks</h3>
            <h2>126</h2>
          </div>

          <div className="stat-card">
            <h3>Completed Tasks</h3>
            <h2>540</h2>
          </div>

        </div>

        <div className="dashboard-grid">

          <div className="tasks-section">

            <h2>Recent Tasks</h2>

            <table>

              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Priority</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>JWT Authentication</td>
                  <td>In Progress</td>
                  <td>High</td>
                </tr>

                <tr>
                  <td>Docker Setup</td>
                  <td>Pending</td>
                  <td>Medium</td>
                </tr>

                <tr>
                  <td>AWS Deployment</td>
                  <td>Completed</td>
                  <td>High</td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="quick-actions">

            <h2>Quick Actions</h2>

            <button>Create Project</button>

            <button>Create Task</button>

            <button>Add User</button>

            <button>View Reports</button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
