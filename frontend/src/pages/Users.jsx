
import { useContext, useEffect, useState } from "react";
import "../assets/css/dashboard.css";
import NavBar from "../compoenets/NavBar";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const AuthContextData = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
        const response = await api.get('/company/1/users', {
            headers: { Authorization: 'Bearer ' + AuthContextData.accessToken },
        });
        setUsers(response.data.data);
    }
    loadUsers();
  }, []);

  function handleAddUser() {
    navigate('/users/add');
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="topbar">
          <div>
            <h1>Users</h1>
            <p>Manage and view all your users</p>
          </div>

          <button className="create-btn" onClick={handleAddUser}>+ New User</button>
        </header>

        {/* Projects Table */}
        <section className="projects-table-section">
          <div className="card">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="">
                    <td className="">{user.id}</td>
                    <td className="">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="">
                      {user.email}
                    </td>
                    <td className="">
                      {user.email}
                    </td>
                    {/* <td className="actions">
                      <Link to={`/project/${project.id}`} className="action-link">
                        View
                      </Link>
                      <button className="action-link action-btn">Edit</button>
                      <button className="action-link delete-link">Delete</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <style>{`
        .projects-table-section {
          margin-bottom: 32px;
        }

        .projects-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .projects-table thead {
          background: #f5f6f7;
          border-bottom: 2px solid #eee;
        }

        .projects-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #172b4d;
        }

        .projects-table td {
          padding: 16px;
          border-bottom: 1px solid #eee;
          color: #172b4d;
        }

        .project-row:hover {
          background: #f9f9f9;
        }

        .project-name {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }

        .project-avatar-mini {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #0052cc;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
        }

        .project-key {
          font-weight: 600;
          color: #0052cc;
        }

        .project-description {
          color: #5e6c84;
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .text-center {
          text-align: center;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-in progress {
          background: #e2e8f0;
          color: #0052cc;
        }

        .status-planning {
          background: #fff3cd;
          color: #856404;
        }

        .status-completed {
          background: #d4edda;
          color: #155724;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .action-link {
          padding: 6px 10px;
          border: none;
          background: transparent;
          color: #0052cc;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 4px;
          transition: 0.2s;
        }

        .action-link:hover {
          background: #e8f0ff;
        }

        .action-btn {
          padding: 6px 10px;
        }

        .delete-link {
          color: #dc3545;
        }

        .delete-link:hover {
          background: #ffe8e8;
        }

        @media (max-width: 1200px) {
          .project-description {
            display: none;
          }

          .projects-table th:nth-child(3),
          .projects-table td:nth-child(3) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .projects-table {
            font-size: 12px;
          }

          .projects-table th,
          .projects-table td {
            padding: 10px;
          }

          .actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
