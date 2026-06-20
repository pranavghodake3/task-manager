import NavBar from "../compoenets/NavBar";
import Header from "../compoenets/Header";
import { NavLink } from "react-router-dom";
import TaskCreateEditForm from "../compoenets/TaskCreateEditForm";


export default function TaskCreate() {
    return (
        <div className="dashboard">
          {/* Sidebar */}
          <NavBar />
    
          {/* Main Content */}
          <main className="main-content">
            {/* Header */}
            <Header title='Add Task' description='' button={
                <NavLink className='create-btn' to='/tasks'>Back</NavLink>
            } />
    
            {/* Projects Table */}
            <section className="projects-table-section">
              <div className="card">
                <TaskCreateEditForm mode='create' />
              </div>
            </section>
          </main>
        </div>
    );
}