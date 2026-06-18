import { useContext, useEffect, useState } from "react";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import ProjectCreateEditForm from "../compoenets/ProjectCreateEditForm";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useParams } from "react-router-dom";
import api from "../services/api";

export default function ProjectEdit() {
    const AuthContextData = useContext(AuthContext);
    const [project, setProject] = useState({});
    const { id } = useParams();
    useEffect(() => {
        async function getProject() {
            try {
                const response = await api.get(`/projects/${id}`, { headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
                }});
                setProject(response.data.data);
            } catch (error) {
                console.log('Error in edit page: ', error);
            }
        }
        getProject();
    }, [AuthContextData.accessToken, id]);
    return (
                <div className="dashboard">
                    {/* Sidebar */}
                    <NavBar />
        
                    {/* Main Content */}
                    <main className="main-content">
                        {/* Header */}
                        <Header title='Edit Project' description='' button={
                    <NavLink className='create-btn' to='/projects'>Back</NavLink>
                } />
                        
        
                        {/* Projects Table */}
                        <section className="projects-table-section">
                            <ProjectCreateEditForm key={project.id || 'project-edit'} mode='edit' project={project} />
                        </section>
                        
                    </main>
                </div>
            );
}