
import { useContext, useEffect, useState } from "react";
import "../assets/css/dashboard.css";
import NavBar from "../compoenets/NavBar";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../compoenets/Header";

export default function UserList() {
  const AuthContextData = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
        const response = await api.get(`/company/${AuthContextData.user.company.id}/users`, {
            headers: { Authorization: 'Bearer ' + AuthContextData.accessToken },
        });
        setUsers(response.data.data);
    }
    loadUsers();
  }, [AuthContextData.accessToken, AuthContextData.user.company.id]);

  function handleAddUser() {
    navigate('/users/add');
  }
  async function handleDeleteUser(e) {
      const userIndex = parseInt(e.currentTarget.dataset.userIndex, 10);
      const userId = e.currentTarget.dataset.userId;
      const conf = confirm('Are you sure you want to delete this user ?');
      if (conf) {
        await api.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${AuthContextData.accessToken}`
          }
        });
        setUsers((currentUsers) => currentUsers.filter((_, idx) => idx !== userIndex));
      }
    }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <Header title='Users' description='Manage and view all your users' button={
            <button className="create-btn" onClick={handleAddUser}>+ New User</button>
        } />

        {/* Users Table */}
        <section className="users-table-section">
          <div className="card">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="">
                    <td className="">{user.id}</td>
                    <td className="">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="">
                      {user.email}
                    </td>
                    <td className="">
                      {user?.roleInfo?.name}
                    </td>
                    <td className="actions">
                      <NavLink to={`/users/${user.id}`} className="action-link">
                        View
                      </NavLink>
                      <NavLink to={`/users/${user.id}/edit`} className="action-link">
                        Edit
                      </NavLink>
                      <button className="action-link delete-link" onClick={handleDeleteUser} data-user-index={index} data-user-id={user.id}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <style>{`
        .users-table-section {
          margin-bottom: 32px;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .users-table thead {
          background: #f5f6f7;
          border-bottom: 2px solid #eee;
        }

        .users-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #172b4d;
        }

        .users-table td {
          padding: 16px;
          border-bottom: 1px solid #eee;
          color: #172b4d;
        }

        .user-row:hover {
          background: #f9f9f9;
        }

        .user-name {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }

        .user-avatar-mini {
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

        .user-key {
          font-weight: 600;
          color: #0052cc;
        }

        .user-description {
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
          .user-description {
            display: none;
          }

          .users-table th:nth-child(3),
          .users-table td:nth-child(3) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .users-table {
            font-size: 12px;
          }

          .users-table th,
          .users-table td {
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
