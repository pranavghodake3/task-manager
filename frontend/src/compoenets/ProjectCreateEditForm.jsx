import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrEditProjectSchema } from "../formSchemas/createOrEditProject";

export default function ProjectCreateEditForm({ mode, project }) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createOrEditProjectSchema),
        mode: 'onChange',
        defaultValues: {
            name: project?.name ?? '',
            description: project?.description ?? '',
        },
    });

    async function onSubmit(data) {
        try {
            if (mode === 'create') {
                const response = await api.post('/projects', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.data.status) {
                    navigate('/projects');
                }
            }else{
                const response = await api.put('/projects/'+project.id, data, {
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
        <form className="auth-form project-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter project name" {...register('name')} />
                {errors.name && <p className="error-text">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea {...register('description')} placeholder="Enter Description"></textarea>
                {errors.description && <p className="error-text">{errors.description.message}</p>}
              </div>

                <p className="error-text">{formErrorMessage}</p>

              <button type="submit" className="auth-btn" disabled={isSubmitting}>
                {mode === 'create' ? (isSubmitting ? 'Submitting...' : 'Submit') : (isSubmitting ? 'Updating...' : 'Update')}
                </button>
              <button type="button" className="auth-btn" onClick={() => navigate('/projects')}>
                Cancel
              </button>
            </form>
    );
}