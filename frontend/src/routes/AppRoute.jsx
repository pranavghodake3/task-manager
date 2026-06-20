import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProjectList from "../pages/ProjectList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../compoenets/ProtectedRoute";
import { AuthContextProvider } from "../context/AuthContextProvider";
import UserList from "../pages/UserList";
import UserAdd from "../pages/UserAdd";
import { ROLES } from "../constants";
import Unathorized from "../pages/Unathorized";
import ProjectView from "../pages/ProjectView";
import ProjectCreate from "../pages/ProjectCreate";
import ProjectEdit from "../pages/ProjectEdit";
import UserView from "../pages/UserView";
import UserEdit from "../pages/UserEdit";
import TaskList from "../pages/TaskList";
import TaskEdit from "../pages/TaskEdit";
import TaskView from "../pages/TaskView";
import TaskCreate from "../pages/TaskCreate";

export default function AppRoute() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                            <ProjectList />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects/create" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                           <ProjectCreate />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects/:id" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                           <ProjectView />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects/:id/edit" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                           <ProjectEdit />
                        </ProtectedRoute>
                    } />

                    <Route path="/users" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                            <UserList />
                        </ProtectedRoute>
                    } />

                    <Route path="/users/:id/edit" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                            <UserEdit />
                        </ProtectedRoute>
                    } />

                    <Route path="/users/:id" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                            <UserView />
                        </ProtectedRoute>
                    } />

                    <Route path="/users/add" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                            <UserAdd />
                        </ProtectedRoute>
                    } />

                    <Route path="/tasks" element={
                        <ProtectedRoute>
                            <TaskList />
                        </ProtectedRoute>
                    } />

                    <Route path="/tasks/create" element={
                        <ProtectedRoute allowedRoles={[
                            // ROLES.COMPANY_ADMIN,
                            // ROLES.SUPER_ADMIN
                        ]}>
                           <TaskCreate />
                        </ProtectedRoute>
                    } />

                    <Route path="/tasks/:id" element={
                        <ProtectedRoute allowedRoles={[
                            // ROLES.COMPANY_ADMIN,
                            // ROLES.SUPER_ADMIN
                        ]}>
                           <TaskView />
                        </ProtectedRoute>
                    } />

                    <Route path="/tasks/:id/edit" element={
                        <ProtectedRoute allowedRoles={[
                            // ROLES.COMPANY_ADMIN,
                            // ROLES.SUPER_ADMIN
                        ]}>
                           <TaskEdit />
                        </ProtectedRoute>
                    } />

                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<Signup />} />

                    <Route path="/unathorized" element={<Unathorized />} />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
};
