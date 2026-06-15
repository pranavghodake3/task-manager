import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Project from "../pages/Project";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../compoenets/ProtectedRoute";
import { AuthContextProvider } from "../context/AuthContextProvider";
import Users from "../pages/Users";

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
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    } />

                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
};
