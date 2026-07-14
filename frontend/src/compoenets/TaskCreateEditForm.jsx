import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";

export default function UserCreateEditForm({ mode, task }) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [title, selectTitle] = useState(() => task?.title ?? '');
    const [description, selectDescription] = useState(() => task?.description ?? '');
    const [userId, selectUserId] = useState(() => task?.userId ?? '');
    const [statusId, selectStatusId] = useState(() => task?.statusId ?? '');
    const [priorityId, selectPriorityId] = useState(() => task?.priorityId ?? '');
    // const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();

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
                selectStatusId(statusResponse.data.data[0]?.id);
                setPriorities(priorityResponse.data.data);
                selectPriorityId(priorityResponse.data.data[0]?.id);
            } catch (error) {
                console.log(error);
            }
        }
        loadDropDownsData();
    }, [accessToken])
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (mode === 'create') {
                const response = await api.post(`/tasks`, {
                    title,
                    description,
                    userId,
                    statusId,
                    priorityId
                }, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/tasks');
                }
            }else{
                const response = await api.put(`/tasks/${task.id}`, {
                    title,
                    description,
                    userId,
                    statusId,
                    priorityId
                }, {
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
            // setFormErrorMessage(error.response.data.error.message);
        }
    }
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            
            <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Enter title" value={title} onChange={(e) => selectTitle(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea name="description" id="description" placeholder="Enter description" value={description} onChange={(e) => selectDescription(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="userId">Select User</label>
                <select name="userId" id="userId" value={userId ?? task?.userId} onChange={(e) => selectUserId(e.target.value)}>
                    <option value="">UnAssigned</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="statusId">Select Status</label>
                <select name="statusId" id="statusId" onChange={(e) => selectStatusId(e.target.value)} value={statusId ?? task?.statusId}>
                    {statuses.map((status) => (
                        <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="priorityId">Select Priority</label>
                <select name="priorityId" id="priorityId" value={priorityId ?? task?.priorityId} onChange={(e) => selectPriorityId(e.target.value)}>
                    {priorities.map((priority) => (
                        <option key={priority.id} value={priority.id}>{priority.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="auth-btn">
                {mode === 'create' ? 'Submit' : 'Update'}
            </button>
            <button type="button" className="auth-btn" onClick={() => navigate('/tasks')}>
                Cancel
            </button>
        </form>
    );
}
