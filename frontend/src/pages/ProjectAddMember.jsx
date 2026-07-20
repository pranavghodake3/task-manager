import { useEffect, useState } from "react";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteUserToProjectSchema } from "../formSchemas/invite-user-to-project";

export default function ProjectAddMember() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [users, setUsers] = useState([]);
    const [roles, setUserRoles] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);

    const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(inviteUserToProjectSchema),
        mode: 'onChange',
    });

    const { id } = useParams();
    useEffect(() => {
        async function getProject() {
            try {
                const [usersResponse, userRoleResponse, jobTitleResponse] = await Promise.all([
                    api.get('/users/get-unassigned-users'),
                    api.get('/users/roles'),
                    api.get('/job-titles?isDropdown=true'),
                ]);
                setUsers(usersResponse.data.data);
                setUserRoles(userRoleResponse.data.data);
                setJobTitles(jobTitleResponse.data.data);
            } catch (error) {
                console.log('Error in edit page: ', error);
            }
        }
        getProject();
    }, [accessToken, id]);
    async function onSubmit(data) {
        try {
            const response = await api.post(`/projects/${id}/add-member`, data);
            if (response.data.status) {
                navigate('/projects');
            }
        } catch (error) {
            console.log('Add Project Member Error', error);
            setFormErrorMessage(error.response.data.error.message);
        }
    }
    return (
                <div className="dashboard">
                    {/* Sidebar */}
                    <NavBar />

                    {/* Main Content */}
                    <main className="main-content">
                        {/* Header */}
                        <Header title='Add Member to Project' description='' button={
                            <NavLink className='create-btn' to='/projects'>Back</NavLink>
                        } />
        
                        {/* Projects Table */}
                        <section className="projects-table-section">
                            <form className="auth-form project-form" onSubmit={handleSubmit(onSubmit)}>
              
              
              <div className="form-group">
                <label htmlFor="userId">Select User</label>
                <select {...register('userId')}>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))}
                </select>
                {errors.userId && <p className="error-text">{errors.userId.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="roleId">Select Role</label>
                <select {...register('roleId')}>
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
                {errors.roleId && <p className="error-text">{errors.roleId.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="jobTitleId">Select Job Title</label>
                <select {...register('jobTitleId')}>
                    <option value="">Select Job Title</option>
                    {jobTitles.map((jobTitle) => (
                        <option key={jobTitle.id} value={jobTitle.id}>{jobTitle.name}</option>
                    ))}
                </select>
                {errors.jobTitleId && <p className="error-text">{errors.jobTitleId.message}</p>}
            </div>


                                    <div className={formErrorMessage ? 'error' : 'success'}>
                                        <label>{formErrorMessage}</label>
                                    </div>

                                    <button type="submit" className="auth-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add'}
              </button>
                                    <button type="button" className="auth-btn" onClick={() => navigate('/projects')}>
                                        Cancel
                                    </button>
                                    </form>
                        </section>

                    </main>
                </div>
            );
}
