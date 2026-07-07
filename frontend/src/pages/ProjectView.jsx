import { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import { NavLink, useParams } from "react-router-dom";
import { formatDate } from "../util";
import { useAuthStore } from "../store/authStore";

export default function ProjectView() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const { id } = useParams();
    const [project, setProject] = useState({});
    useEffect(() => {
        async function loadProject() {
            const response = await api.get('/projects/'+id, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setProject(response.data.data);
        }
        loadProject();
    }, [accessToken, id]);
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
                 : <h1>Project Not Found</h1>}
                 </section>
                
            </main>
        </div>
    );
};
