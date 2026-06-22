import { Navigate } from "react-router-dom";
import { getRole, isLoggedIn } from "../util/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
    const AuthContextData = useContext(AuthContext);
    const roles = getRole();
    const myRole = roles?.[0].name;
    // console.log('Protected Route AuthContextData: ',AuthContextData);
    if(AuthContextData.authLoading){
        return null;
    }
    if(!isLoggedIn(AuthContextData)){
        return <Navigate to="/login" />
    }

    if(allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(myRole)){
        return <Navigate to='/unathorized' />
    }

    return children;
}
