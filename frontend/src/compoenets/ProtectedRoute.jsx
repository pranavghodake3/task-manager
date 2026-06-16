import { Navigate } from "react-router-dom";
import { getRole, isLoggedIn } from "../util/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
    const AuthContextData = useContext(AuthContext);
    const role = getRole();
    const myRole = role?.name;
    console.log('Protected Route AuthContextData: ',AuthContextData);
    if(AuthContextData.authLoading){
        return null;
    }
    if(!isLoggedIn(AuthContextData)){
        return <Navigate to="/login" />
    }

    if(allowedRoles && !allowedRoles.includes(myRole)){
        return <Navigate to='/unathorized' />
    }

    return children;
}
