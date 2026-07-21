import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrEditTaskSchema } from "../formSchemas/createOrEditTask";

export default function UserCreateEditForm({ mode, task }) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        resolver: zodResolver(createOrEditTaskSchema),
        mode: 'onChange',
        defaultValues: {
            title: task?.title ?? '',
            description: task?.description ?? '',
            userId: task?.userId ? String(task.userId) : '',
            statusId: task?.statusId ? String(task.statusId) : '',
            priorityId: task?.priorityId ? String(task.priorityId) : '',
        },
    });

    useEffect(() => {
        async function loadDropDownsData() {
            try {
                const [userResponse, statusResponse, priorityResponse] = await Promise.all([
                    api.get('/users?isDropdown=true', { headers: {
                        Authorization: `Bearer ${accessToken}`
                    }}),
                    api.get('/statuses?isDropdown=true', { headers: {
                        Authorization: `Bearer ${accessToken}`
                    }}),
                    api.get('/priorities?isDropdown=true', { headers: {
                        Authorization: `Bearer ${accessToken}`
                    }}),

                ]);
                setUsers(userResponse.data.data);
                setStatuses(statusResponse.data.data);
                setPriorities(priorityResponse.data.data);

                // set form values after dropdown options are loaded (use strings)
                if (task?.statusId) {
                    setValue('statusId', String(task.statusId));
                } else if (statusResponse.data.data[0]) {
                    setValue('statusId', String(statusResponse.data.data[0].id));
                }

                if (task?.priorityId) {
                    setValue('priorityId', String(task.priorityId));
                } else if (priorityResponse.data.data[0]) {
                    setValue('priorityId', String(priorityResponse.data.data[0].id));
                }

                if (task?.userId) {
                    setValue('userId', String(task.userId));
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadDropDownsData();
    }, [accessToken, task?.statusId, task?.priorityId, task?.userId, setValue])
    async function onSubmit(data) {
        // convert string select values to numbers (or null) before sending
        data.userId = data.userId == 0 || data.userId === '' || data.userId == null ? null : Number(data.userId);

        if (!data.statusId || data.statusId === '') {
            data.statusId = statuses[0]?.id ?? null;
        } else {
            data.statusId = Number(data.statusId);
        }

        if (!data.priorityId || data.priorityId === '') {
            data.priorityId = priorities[0]?.id ?? null;
        } else {
            data.priorityId = Number(data.priorityId);
        }

        try {
            if (mode === 'create') {
                const response = await api.post(`/tasks`, data, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/tasks');
                }
            }else{
                const response = await api.put(`/tasks/${task.id}`, data, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/tasks');
                }
            }
            
        } catch (error) {
            console.log('User Create Error', error);
            setFormErrorMessage(error.response.data.error.message);
        }
    }
    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Enter title" {...register('title')} />
                {errors.title && <p className="error-text">{errors.title.message}</p>}
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea name="description" id="description" placeholder="Enter description" {...register('description')} />
                {errors.description && <p className="error-text">{errors.description.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="userId">Select User</label>
                <select id="userId" {...register('userId')}>
                    <option value="">UnAssigned</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))}
                </select>
                {errors.userId && <p className="error-text">{errors.userId.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="statusId">Select Status</label>
                <select id="statusId" {...register('statusId')}>
                    {statuses.map((status) => (
                        <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                </select>
                {errors.statusId && <p className="error-text">{errors.statusId.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="priorityId">Select Priority</label>
                <select id="priorityId" {...register('priorityId')}>
                    {priorities.map((priority) => (
                        <option key={priority.id} value={priority.id}>{priority.name}</option>
                    ))}
                </select>
                {errors.priorityId && <p className="error-text">{errors.priorityId.message}</p>}
            </div>

            <p className="error-text">{formErrorMessage}</p>

            <button type="submit" className="auth-btn" disabled={isSubmitting}>
            {mode === 'create' ? (isSubmitting ? 'Submitting...' : 'Submit') : (isSubmitting ? 'Updating...' : 'Update')}
            </button>
            <button type="button" className="auth-btn" onClick={() => navigate('/tasks')}>
                Cancel
            </button>
        </form>
    );
}
