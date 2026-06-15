import { useContext, useState } from "react";
import NavBar from "../compoenets/NavBar";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { getUserInfo } from "../util/auth";


export default function AddUser() {
    const AuthContextData = useContext(AuthContext);
    const user = getUserInfo();
    const [firstName, selectFirstName] = useState('');
    const [lastName, selectLastName] = useState('');
    const [email, selectEmail] = useState('');
    const [password, selectPassword] = useState('');
    const [confirmPassword, selectConfirmPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        await api.post(`/company/${user.company?.id}/users`, {
            firstName,
                lastName,
                email,
                password,
        }, {
             headers: {
                Authorization: `Bearer ${AuthContextData.accessToken}`
            }
        });
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
    
              <button className="create-btn">+ New User</button>
            </header>
    
            {/* Projects Table */}
            <section className="projects-table-section">
              <div className="card">
                <form className="auth-form" onSubmit={handleSubmit}>
             
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" placeholder="Enter your first name" onChange={(e) => selectFirstName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" placeholder="Enter your last name" onChange={(e) => selectLastName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" onChange={(e) => selectEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Create password" value={password} onChange={(e) => selectPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => selectConfirmPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="auth-btn">
                        Create Account
                    </button>
                    </form>
              </div>
            </section>
          </main>
        </div>
    );
}