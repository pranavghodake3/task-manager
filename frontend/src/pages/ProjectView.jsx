import { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import { NavLink, useParams } from "react-router-dom";
import { formatDate } from "../util";
import { useAuthStore } from "../store/authStore";
import usePermission from "../hooks/usePermission";
import { ENTITIES, ACTION_TYPES } from "../constants";

export default function ProjectView() {
    const { can } = usePermission();
    const accessToken = useAuthStore((state) => state.accessToken);
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [projectMembers, setProjectMembers] = useState([]);
    useEffect(() => {
        async function loadProject() {
            const response = await api.get('/projects/'+id, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setProject(response.data.data);
            setProjectMembers(response.data.data.projectMembers);
        }
        loadProject();
    }, [accessToken, id]);
    async function handleRemoveUser(e) {
      const userIndex = parseInt(e.currentTarget.dataset.userIndex, 10);
      const userId = e.currentTarget.dataset.userId;
      const conf = confirm('Are you sure you want to remove this user from this Project ?');
      if (conf) {
        await api.delete(`/projects/${id}/users/${userId}/remove`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setProjectMembers((currentUsers) => currentUsers.filter((_, idx) => idx !== userIndex));
      }
    }

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <NavBar />

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <Header title={project ? project.name : 'Project'} description='Project Details' button={
                    <NavLink className='create-btn' to='/projects'>Back</NavLink>
                } />
                

                {/* Projects Table */}
                <section className="projects-table-section">
                { project ? 
                    <table className="detail-table">
                        <tbody>
                            <tr>
                                <td><b>Id: </b></td>
                                <td>{project.id}</td>
                            </tr>
                            <tr>
                                <td><b>Name: </b></td>
                                <td>{project.name}</td>
                            </tr>
                            <tr>
                                <td><b>Description: </b></td>
                                <td>{project.description}</td>
                            </tr>
                            <tr>
                                <td><b>Key: </b></td>
                                <td>{project.key}</td>
                            </tr>
                            <tr>
                                <td><b>Project Admins: </b></td>
                                <td>{
                                    project?.projectMembers?.map((member) => member.role?.name === 'Project Admin' ? (
                                        <><span key={member.user.id}>{member.user.firstName} {member.user.lastName}</span><br /></>
                                    ) : null)
                                }</td>
                            </tr>
                            <tr>
                                <td><b>Created By: </b></td>
                                <td>{project.createdBy?.firstName} {project.createdBy?.lastName}</td>
                            </tr>
                            <tr>
                                <td><b>Created At:</b></td>
                                <td>{formatDate(project.createdAt, 'DD-MMM-YYYY HH:MM')}</td>
                            </tr>
                            <tr>
                                <td><b>Last Updated At:</b></td>
                                <td>{formatDate(project.updatedAt, 'DD-MMM-YYYY HH:MM:SS')}</td>
                            </tr>
                        </tbody>
                    </table>
                 : <h1>Project Not Found</h1>
                 }

                 <div>
                    <h2>Project Members: </h2>
                 </div>
                 <table className="users-table">
                    <thead>
                        <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Job Title</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectMembers.map((projectMember, index) => (
                        <tr key={projectMember.userId} className="">
                            <td className="">{projectMember.userId}</td>
                            <td className="">
                            {projectMember.user.firstName} {projectMember.user.lastName}
                            </td>
                            <td className="">
                            {projectMember.user.email}
                            </td>
                            <td className="">
                            {projectMember.role.name}
                            </td>
                            <td className="">
                            {projectMember.jobTitle.name}
                            </td>
                            <td className="actions">
                            <NavLink to={`/users/${projectMember.userId}`} className="action-link">
                                View
                            </NavLink>
                            
                            {
                                can(ENTITIES.USER, ACTION_TYPES.DELETE) &&
                                <button className="action-link delete-link" onClick={handleRemoveUser} data-user-index={index} data-user-id={projectMember.userId}>Remove</button>
                            }
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

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

        // .actions {
        //   display: flex;
        //   gap: 8px;
        // }

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
