
import { useEffect, useState } from "react";
import "../assets/css/dashboard.css";
import NavBar from "../compoenets/NavBar";
import api from "../services/api";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../compoenets/Header";
import { useAuthStore } from "../store/authStore";
import usePermission from "../hooks/usePermission";
import { ACTION_TYPES, ENTITIES } from "../constants";

export default function TaskList() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { can } = usePermission();

  useEffect(() => {
    async function loadTasks() {
      try {
          const response = await api.get(`/tasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setTasks(response.data.data);
      } catch (error) {
        console.log('Error: ',error)
        setTasks([]);
      }
      
    }
    loadTasks();
  }, [accessToken]);
  async function handleDeleteTask(e) {
    const taskIndex = parseInt(e.currentTarget.dataset.taskIndex, 10);
    const taskId = e.currentTarget.dataset.taskId;
    const conf = confirm('Are you sure you want to delete this task ?');
    if (conf) {
      await api.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setTasks((currentTasks) => currentTasks.filter((_, idx) => idx !== taskIndex));
    }
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <Header title='Tasks' description='Manage and view all your tasks' button={
          can(ENTITIES.TASK, ACTION_TYPES.CREATE) && <button className="create-btn" onClick={()=> navigate('/tasks/create')}>+ New Task</button>
        } />

        {/* Tasks Table */}
        <section className="tasks-table-section">
          <div className="card">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Project</th>
                  <th>Assgined To</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} className="task-row">
                    <td className="task-key">{task.id}</td>
                    <td className="">
                      <NavLink to={`/tasks/${task.id}`}>{task.title}</NavLink>
                    </td>
                    <td>
                      {task.project?.name}
                    </td>
                    <td>
                      {task.user?.firstName} {task.user?.lastName}
                    </td>
                    <td>
                      {task.creator?.firstName} {task.creator?.lastName}
                    </td>
                    <td>
                      <div style={{
                        color: task.status?.color
                      }}>
                        { task.status?.name }
                      </div>
                    </td>
                    <td>
                      <div style={{
                        color: task.priority?.color
                      }}>
                        { task.priority?.name }
                      </div>
                    </td>
                    <td className="actions">
                      {
                        can(ENTITIES.TASK, ACTION_TYPES.READ) &&
                        <NavLink to={`/tasks/${task.id}`} className="action-link">
                          View
                        </NavLink>
                      }

                      {
                        can(ENTITIES.TASK, ACTION_TYPES.UPDATE) &&
                        <NavLink to={`/tasks/${task.id}/edit`} className='action-link action-btn'>Edit</NavLink>
                      }

                      {
                        can(ENTITIES.TASK, ACTION_TYPES.DELETE) &&
                        <button
                          type="button"
                          className="action-link delete-link"
                          onClick={handleDeleteTask}
                          data-task-index={index}
                          data-task-id={task.id}
                        >
                          Delete
                        </button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <style>{`
        .tasks-table-section {
          margin-bottom: 32px;
        }

        .tasks-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .tasks-table thead {
          background: #f5f6f7;
          border-bottom: 2px solid #eee;
        }

        .tasks-table th {
          padding: 16px;
          font-weight: 600;
          color: #172b4d;
        }

        .tasks-table td {
          padding: 16px;
          border-bottom: 1px solid #eee;
          color: #172b4d;
        }

        .task-row:hover {
          background: #f9f9f9;
        }

        .task-name {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }

        .task-avatar-mini {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #0052cc;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
        }

        .task-key {
          font-weight: 600;
          color: #0052cc;
        }

        .task-description {
          color: #5e6c84;
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .text-center {
          text-align: center;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-in progress {
          background: #e2e8f0;
          color: #0052cc;
        }

        .status-planning {
          background: #fff3cd;
          color: #856404;
        }

        .status-completed {
          background: #d4edda;
          color: #155724;
        }

        // .actions {
        //   display: flex;
        //   gap: 8px;
        // }

        .action-link {
          padding: 6px 10px;
          border: none;
          background: transparent;
          color: #0052cc;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 4px;
          transition: 0.2s;
        }

        .action-link:hover {
          background: #e8f0ff;
        }

        .action-btn {
          padding: 6px 10px;
        }

        .delete-link {
          color: #dc3545;
        }

        .delete-link:hover {
          background: #ffe8e8;
        }

        @media (max-width: 1200px) {
          .task-description {
            display: none;
          }

          .tasks-table th:nth-child(3),
          .tasks-table td:nth-child(3) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .tasks-table {
            font-size: 12px;
          }

          .tasks-table th,
          .tasks-table td {
            padding: 10px;
          }

          .actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
