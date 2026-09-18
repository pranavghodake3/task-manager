import { useEffect, useState } from "react";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import TaskCreateEditForm from "../compoenets/TaskCreateEditForm";
import { NavLink, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";

export default function TaskEdit() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [task, setTask] = useState({});
    const { id } = useParams();
    useEffect(() => {
        async function getTask() {
            try {
                const response = await api.get(`/tasks/${id}`, { headers: {
                    Authorization: `Bearer ${accessToken}`
                }});
                setTask(response.data.data);
            } catch (error) {
                console.log('Error in edit page: ', error);
            }
        }
        getTask();
    }, [accessToken, id]);
    return (
                <div className="dashboard">
                    {/* Sidebar */}
                    <NavBar />
        
                    {/* Main Content */}
                    <main className="main-content">
                        {/* Header */}
                        <Header title='Edit Task' description='' button={
                    <NavLink className='create-btn' to='/tasks'>Back</NavLink>
                } />
                        
        
                        {/* Tasks Table */}
                        <section className="tasks-table-section">
                            <TaskCreateEditForm key={task?.id || 'task-edit'} mode='edit' task={task} />
                        </section>
                        
                    </main>
                </div>
            );
}