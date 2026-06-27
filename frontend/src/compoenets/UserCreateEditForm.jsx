import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function UserCreateEditForm({ mode, user }) {
    const AuthContextData = useContext(AuthContext);
    const [userRoles, setUserRoles] = useState([]);
    const [projects, setProjects] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [firstName, selectFirstName] = useState(() => user?.firstName ?? '');
    const [lastName, selectLastName] = useState(() => user?.lastName ?? '');
    const [email, selectEmail] = useState(() => user?.email ?? '');
    const [password, selectPassword] = useState('');
    const [confirmPassword, selectConfirmPassword] = useState('');
    const [roleId, selectRoleId] = useState(() => user?.role ?? '');
    const [projectId, selectProjectId] = useState(() => user?.projectId ?? '');
    const [jobTitleId, selectJobTitleId] = useState(() => user?.jobTitleId ?? '');
    // const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadRoles() {
            try {
                const [userRoleResponse, projectResponse, jobTitleResponse] = await Promise.all([
                    api.get('/users/roles', { headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }}),
                    api.get('/projects?isDropdown=true', { headers: {
                            Authorization: `Bearer ${AuthContextData.accessToken}`
                    }}),
                    api.get('/job-titles?isDropdown=true', { headers: {
                            Authorization: `Bearer ${AuthContextData.accessToken}`
                    }}),
                ]);
                setUserRoles(userRoleResponse.data.data);
                setProjects(projectResponse.data.data);
                setJobTitles(jobTitleResponse.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadRoles();
    }, [AuthContextData.accessToken])
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (mode === 'create') {
                const response = await api.post(`/users`, {
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId,
                    projectId
                }, {
                    headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/users');
                }
            }else{
                const response = await api.put(`/users/${user.id}`, {
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId,
                    projectId
                }, {
                    headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/users');
                }
            }
            
        } catch (error) {
            console.log('User Create Error', error);
            // setFormErrorMessage(error.response.data.error.message);
        }
    }
    return (
        <form className="auth-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="projectId">Select Project</label>
                <select name="projectId" id="projectId" value={projectId ?? user?.projectId} onChange={(e) => selectProjectId(e.target.value)}>
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
            </div>
             
            <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => selectFirstName(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => selectLastName(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => selectEmail(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Create password" value={password} onChange={(e) => selectPassword(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => selectConfirmPassword(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="role">Select Role</label>
                <select name="roleId" id="roleId" value={roleId ?? user?.role} onChange={(e) => selectRoleId(e.target.value)}>
                    <option value="">Select Role</option>
                    {userRoles.map((userRole) => (
                        <option key={userRole.id} value={userRole.id}>{userRole.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="jobTitleId">Select Job Title</label>
                <select name="jobTitleId" id="jobTitleId" value={jobTitleId ?? user?.jobTitleId} onChange={(e) => selectJobTitleId(e.target.value)}>
                    <option value="">Select Role</option>
                    {jobTitles.map((jobTitle) => (
                        <option key={jobTitle.id} value={jobTitle.id}>{jobTitle.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="auth-btn">
                {mode === 'create' ? 'Submit' : 'Update'}
            </button>
            <button type="button" className="auth-btn" onClick={() => navigate('/users')}>
                Cancel
            </button>
        </form>
    );
}