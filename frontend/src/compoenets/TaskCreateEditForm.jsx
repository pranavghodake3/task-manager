import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function UserCreateEditForm({ mode, task }) {
    const AuthContextData = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [title, selectTitle] = useState(() => task?.title ?? '');
    const [description, selectDescription] = useState(() => task?.description ?? '');
    const [projectId, selectProjectId] = useState(() => task?.projectId ?? '');
    const [userId, selectUserId] = useState(() => task?.userId ?? '');
    const [statusId, selectStatusId] = useState(() => task?.statusId ?? '');
    const [priorityId, selectPriorityId] = useState(() => task?.priorityId ?? '');
    // const [formErrorMessage, setFormErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadDropDownsData() {
            try {
                const [projectResponse, userResponse, statusResponse, priorityResponse] = await Promise.all([
                    api.get('/projects?isDropdown=true', { headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }}),
                    api.get('/users?isDropdown=true', { headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }}),
                    api.get('/statuses?isDropdown=true', { headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }}),
                    api.get('/priorities?isDropdown=true', { headers: {
                        Authorization: `Bearer ${AuthContextData.accessToken}`
                    }}),

                ]);
                setProjects(projectResponse.data.data);
                setUsers(userResponse.data.data);
                setStatuses(statusResponse.data.data);
                setPriorities(priorityResponse.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadDropDownsData();
    }, [AuthContextData.accessToken])
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (mode === 'create') {
                const response = await api.post(`/tasks`, {
                    title,
                    description,
                    projectId,
                    userId,
                    statusId,
                    priorityId
                }, {
                    headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
                }
                });
                if (response.data.status) {
                    navigate('/tasks');
                }
            }else{
                const response = await api.put(`/tasks/${task.id}`, {
                    title,
                    description,
                    projectId,
                    userId,
                    statusId,
                    priorityId
                }, {
                    headers: {
                    Authorization: `Bearer ${AuthContextData.accessToken}`
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
                <label htmlFor="projectId">Select Project</label>
                <select name="projectId" id="projectId" value={projectId ?? task?.projectId} onChange={(e) => selectProjectId(e.target.value)}>
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
            </div>

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
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="statusId">Select Status</label>
                <select name="statusId" id="statusId" onChange={(e) => selectStatusId(e.target.value)} value={statusId ?? task?.statusId}>
                    <option value="">Select Status</option>
                    {statuses.map((status) => (
                        <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="priorityId">Select Priority</label>
                <select name="priorityId" id="priorityId" value={priorityId ?? task?.priorityId} onChange={(e) => selectPriorityId(e.target.value)}>
                    <option value="">Select Priority</option>
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
