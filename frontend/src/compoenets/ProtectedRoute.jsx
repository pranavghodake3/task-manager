import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../util/auth";

export default function ProtectedRoute({ children }) {
    const isLogged = isLoggedIn();
    if(!isLogged){
        return <Navigate to="/login" />
    }

    return children;
}
