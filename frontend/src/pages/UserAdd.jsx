import NavBar from "../compoenets/NavBar";
import Header from "../compoenets/Header";
import { NavLink } from "react-router-dom";
import UserCreateEditForm from "../compoenets/UserCreateEditForm";


export default function UserAdd() {
    return (
        <div className="dashboard">
          {/* Sidebar */}
          <NavBar />
    
          {/* Main Content */}
          <main className="main-content">
            {/* Header */}
            <Header title='Add User' description='' button={
                <NavLink className='create-btn' to='/users'>Back</NavLink>
            } />
    
            {/* Projects Table */}
            <section className="projects-table-section">
              <div className="card">
                <UserCreateEditForm mode='create' />
              </div>
            </section>
          </main>
        </div>
    );
}