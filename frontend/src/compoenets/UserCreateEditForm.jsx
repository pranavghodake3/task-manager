import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";

export default function UserCreateEditForm({ mode, user }) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [firstName, selectFirstName] = useState(() => user?.firstName ?? '');
    const [lastName, selectLastName] = useState(() => user?.lastName ?? '');
    const [email, selectEmail] = useState(() => user?.email ?? '');
    const [password, selectPassword] = useState('');
    const [confirmPassword, selectConfirmPassword] = useState('');
    // const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (mode === 'create') {
                const response = await api.post(`/users`, {
                    firstName,
                    lastName,
                    email,
                    password,
                }, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
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
                }, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
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

            <button type="submit" className="auth-btn">
                {mode === 'create' ? 'Submit' : 'Update'}
            </button>
            <button type="button" className="auth-btn" onClick={() => navigate('/users')}>
                Cancel
            </button>
        </form>
    );
}