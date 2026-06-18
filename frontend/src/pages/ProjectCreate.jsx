import { NavLink } from "react-router-dom";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import ProjectCreateEditForm from "../compoenets/ProjectCreateEditForm";

export default function ProjectCreate() {
    return (
            <div className="dashboard">
                {/* Sidebar */}
                <NavBar />
    
                {/* Main Content */}
                <main className="main-content">
                    {/* Header */}
                    <Header title='Create Project' description='' button={
                        <NavLink className='create-btn' to='/projects'>Back</NavLink>
                    } />
                    
    
                    {/* Projects Table */}
                    <section className="projects-table-section">
                        <div className="card">
                            <ProjectCreateEditForm mode='create' />
                        </div>
                    </section>
                    
                </main>
            </div>
        );
};