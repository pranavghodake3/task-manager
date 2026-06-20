import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function UserCreateEditForm({ mode, user }) {
    const AuthContextData = useContext(AuthContext);
    const [userRoles, setUserRoles] = useState([]);
    const [firstName, selectFirstName] = useState(() => user?.firstName ?? '');
    const [lastName, selectLastName] = useState(() => user?.lastName ?? '');
    const [email, selectEmail] = useState(() => user?.email ?? '');
    const [password, selectPassword] = useState('');
    const [confirmPassword, selectConfirmPassword] = useState('');
    const [roleId, selectRoleId] = useState(() => user?.role ?? '');
    // const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadRoles() {
            try {
                const response = await api.get('/users/roles', { headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
                }});
                setUserRoles(response.data.data);
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
                const response = await api.post(`/company/${AuthContextData.user.company?.id}/users`, {
                    firstName,
                    lastName,
                    email,
                    password,
                    role: roleId
                }, {
                    headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/users');
                }
            }else{
                const response = await api.put(`/company/${AuthContextData.user.company?.id}/users/${user.id}`, {
                    firstName,
                    lastName,
                    email,
                    password,
                    role: roleId
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
                <select name="role" id="role" onChange={(e) => selectRoleId(e.target.value)}>
                    {
                        userRoles.map((userRole) => <option key={userRole.id} value={userRole.id} selected={ user?.role && user.role == userRole.id ? true : false}>{userRole.name}</option>)
                    }
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