
import { useContext, useEffect, useState } from "react";
import "../assets/css/dashboard.css";
import NavBar from "../compoenets/NavBar";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../compoenets/Header";


export default function ProjectList() {
  const AuthContextData = useContext(AuthContext);
const [projects, setProjects] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    async function loadProjects() {
      try {
          const response = await api.get(`/projects`, {
          headers: {
            Authorization: `Bearer ${AuthContextData.accessToken}`
          }
        });
        setProjects(response.data.data);
      } catch (error) {
        console.log('Error: ',error)
        setProjects([]);
      }
      
    }
    loadProjects();
  }, [AuthContextData.accessToken]);
  async function handleDeleteProject(e) {
    const projectIndex = parseInt(e.currentTarget.dataset.projectIndex, 10);
    const projectId = e.currentTarget.dataset.projectId;
    const conf = confirm('Are you sure you want to delete this project ?');
    if (conf) {
      await api.delete(`/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${AuthContextData.accessToken}`
        }
      });
      setProjects((currentProjects) => currentProjects.filter((_, idx) => idx !== projectIndex));
    }
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <Header title='Projects' description='Manage and view all your projects' button={
            <button className="create-btn" onClick={()=> navigate('/projects/create')}>+ New Project</button>
        } />

        {/* Projects Table */}
        <section className="projects-table-section">
          <div className="card">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.id} className="project-row">
                    <td className="project-key">{project.id}</td>
                    <td className="">
                      <NavLink to={`/projects/${project.id}`}>{project.name}</NavLink>
                    </td>
                    <td className="actions">
                      <NavLink to={`/projects/${project.id}`} className="action-link">
                        View
                      </NavLink>
                      <NavLink to={`/projects/${project.id}/edit`} className='action-link action-btn'>Edit</NavLink>
                      {/* <button className="action-link action-btn">Edit</button> */}
                      <button
                        type="button"
                        className="action-link delete-link"
                        onClick={handleDeleteProject}
                        data-project-index={index}
                        data-project-id={project.id}
                      >
                        Delete
                      </button>
                    </td>
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
