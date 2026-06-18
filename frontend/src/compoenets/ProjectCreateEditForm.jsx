import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function ProjectCreateEditForm({ mode, project }) {
    const AuthContextData = useContext(AuthContext);
    const [name, setProjectName] = useState(() => project?.name ?? '');
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (mode === 'create') {
                const response = await api.post('/projects', {
                    name,
                }, {
                    headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }
                });
                if (response.data.status) {
                    navigate('/projects');
                }
            }else{
                const response = await api.put('/projects/'+project.id, {
                    name,
                }, {
                    headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
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
        <form className="project-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter project name" value={name} onChange={(e) => setProjectName(e.target.value)} />
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