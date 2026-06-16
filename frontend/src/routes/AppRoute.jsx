import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Project from "../pages/Project";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../compoenets/ProtectedRoute";
import { AuthContextProvider } from "../context/AuthContextProvider";
import Users from "../pages/Users";
import AddUser from "../pages/AddUser";
import { ROLES } from "../constants";
import Unathorized from "../pages/Unathorized";

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
                        <ProtectedRoute>
                            <Project />
                        </ProtectedRoute>
                    } />

                    <Route path="/users" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                            <Users />
                        </ProtectedRoute>
                    } />

                    <Route path="/users/add" element={
                        <ProtectedRoute allowedRoles={[
                            ROLES.COMPANY_ADMIN,
                            ROLES.SUPER_ADMIN
                        ]}>
                            <AddUser />
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
