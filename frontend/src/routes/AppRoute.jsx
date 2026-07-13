import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProjectList from "../pages/ProjectList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../compoenets/ProtectedRoute";
// import { AuthContextProvider } from "../context/AuthContextProvider";
import UserList from "../pages/UserList";
import UserAdd from "../pages/UserAdd";
import { ENTITIES, ACTION_TYPES } from "../constants";
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
import ProjectAddMember from "../pages/ProjectAddMember";
import GlobalProjectContextProvider from "../context/GlobalProjectContextProvider";

export default function AppRoute() {
    return (
        <BrowserRouter>
            <GlobalProjectContextProvider>
            {/* <AuthContextProvider> */}
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects" element={
                        <ProtectedRoute
                        entity={ENTITIES.PROJECT}
                        action={ACTION_TYPES.READ}
                        >
                            <ProjectList />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects/create" element={
                        <ProtectedRoute
                        entity={ENTITIES.PROJECT}
                        action={ACTION_TYPES.CREATE}
                        >
                           <ProjectCreate />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects/:id" element={
                        <ProtectedRoute
                        entity={ENTITIES.PROJECT}
                        action={ACTION_TYPES.READ}
                        >
                           <ProjectView />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects/:id/edit" element={
                        <ProtectedRoute
                        entity={ENTITIES.PROJECT}
                        action={ACTION_TYPES.UPDATE}
                        >
                           <ProjectEdit />
                        </ProtectedRoute>
                    } />

                    <Route path="/projects/:id/add-member" element={
                        <ProtectedRoute
                        entity={ENTITIES.PROJECT}
                        action={ACTION_TYPES.UPDATE}
                        >
                           <ProjectAddMember />
                        </ProtectedRoute>
                    } />

                    <Route path="/users" element={
                        <ProtectedRoute
                        entity={ENTITIES.USER}
                        action={ACTION_TYPES.READ}
                        >
                            <UserList />
                        </ProtectedRoute>
                    } />

                    <Route path="/users/:id/edit" element={
                        <ProtectedRoute
                        entity={ENTITIES.USER}
                        action={ACTION_TYPES.UPDATE}
                        >
                            <UserEdit />
                        </ProtectedRoute>
                    } />

                    <Route path="/users/:id" element={
                        <ProtectedRoute
                        entity={ENTITIES.USER}
                        action={ACTION_TYPES.READ}
                        >
                            <UserView />
                        </ProtectedRoute>
                    } />

                    <Route path="/users/create" element={
                        <ProtectedRoute
                        entity={ENTITIES.USER}
                        action={ACTION_TYPES.CREATE}
                        >
                            <UserAdd />
                        </ProtectedRoute>
                    } />

                    <Route path="/tasks" element={
                        <ProtectedRoute>
                            <TaskList />
                        </ProtectedRoute>
                    } />

                    <Route path="/tasks/create" element={
                        <ProtectedRoute>
                           <TaskCreate />
                        </ProtectedRoute>
                    } />

                    <Route path="/tasks/:id" element={
                        <ProtectedRoute>
                           <TaskView />
                        </ProtectedRoute>
                    } />

                    <Route path="/tasks/:id/edit" element={
                        <ProtectedRoute>
                           <TaskEdit />
                        </ProtectedRoute>
                    } />

                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<Signup />} />

                    <Route path="/unathorized" element={<Unathorized />} />
                </Routes>
            {/* </AuthContextProvider> */}
            </GlobalProjectContextProvider>
        </BrowserRouter>
    );
};
