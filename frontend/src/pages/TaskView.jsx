import { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../compoenets/Header";
import NavBar from "../compoenets/NavBar";
import { NavLink, useParams } from "react-router-dom";
import { formatDate } from "../util";
import { useAuthStore } from "../store/authStore";

export default function TaskView() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const { id } = useParams();
    const [task, setTask] = useState({});
    useEffect(() => {
        async function loadTask() {
            const response = await api.get('/tasks/'+id, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setTask(response.data.data);
        }
        loadTask();
    }, [accessToken, id]);
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <NavBar />

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <Header title={task ? task.name : 'Task'} description='Task Details' button={
                    <NavLink className='create-btn' to='/tasks'>Back</NavLink>
                } />
                

                {/* Tasks Table */}
                <section className="tasks-table-section">
          <div className="card">
                { task ? 
                    <table className="detail-table">
                        <tbody>
                            <tr>
                                <td><b>Id: </b></td>
                                <td>{task.id}</td>
                            </tr>
                            <tr>
                                <td><b>Title: </b></td>
                                <td>{task.title}</td>
                            </tr>
                            <tr>
                                <td><b>Description: </b></td>
                                <td>{task.description}</td>
                            </tr>
                            <tr>
                                <td><b>Assigned To: </b></td>
                                <td>{task.user?.firstName} {task.user?.lastName}</td>
                            </tr>
                            <tr>
                                <td><b>Created By: </b></td>
                                <td>{task.creator?.firstName} {task.creator?.lastName}</td>
                            </tr>
                            <tr>
                                <td><b>Status: </b></td>
                                <td>
                                  <div style={{
                                    color: task.status?.color
                                  }}>
                                    { task.status?.name }
                                  </div>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Priority: </b></td>
                                <td>
                                  <div style={{
                                    color: task.priority?.color
                                  }}>
                                    { task.priority?.name }
                                  </div>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Created At:</b></td>
                                <td>{formatDate(task.createdAt, 'DD-MMM-YYYY')}</td>
                            </tr>
                        </tbody>
                    </table>
                 : <h1>Task Not Found</h1>}
                 </div>
                 </section>
                
            </main>
        </div>
    );
};
