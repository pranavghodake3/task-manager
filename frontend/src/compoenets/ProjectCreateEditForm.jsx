import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";

export default function ProjectCreateEditForm({ mode, project }) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [name, setProjectName] = useState(() => project?.name ?? '');
    const [description, setProjectDescription] = useState(() => project?.description ?? '');

    const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (mode === 'create') {
                const response = await api.post('/projects', {
                    name,
                    description,
                    // createNew,
                    // projectAdminId: userId,
                    // firstName,
                    // lastName,
                    // email,
                    // password
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.data.status) {
                    navigate('/projects');
                }
            }else{
                const response = await api.put('/projects/'+project.id, {
                    name,
                    description,
                    // createNew,
                    // projectAdminId: userId,
                    // existingProjectMemberUserId: existingUsers?.[0]?.userId
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.data.status) {
                    navigate('/projects');
                }
            }
            
        } catch (error) {
            console.log('Project Create Error', error);
            setFormErrorMessage(error.response.data.error.message);
        }
    }
    return (
        <form className="auth-form project-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter project name" value={name} onChange={(e) => setProjectName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" id="description" value={description} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Enter Description"></textarea>
              </div>

              <div className={formErrorMessage ? 'error' : 'success'}>
                <label>{formErrorMessage}</label>
            </div>

              <button type="submit" className="auth-btn">
                {mode === 'create' ? 'Submit' : 'Update'}
              </button>
              <button type="button" className="auth-btn" onClick={() => navigate('/projects')}>
                Cancel
              </button>
            </form>
    );
}