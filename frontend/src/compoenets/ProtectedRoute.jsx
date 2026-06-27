import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../util/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ entity, action, children }) {
    const AuthContextData = useContext(AuthContext);
    const permissions = AuthContextData.user.permissions;
    console.log('Protected AuthContextData: ',AuthContextData);
    if(AuthContextData.authLoading){
        return null;
    }
    if(!isLoggedIn(AuthContextData)){
        return <Navigate to="/login" />
    }

    if(entity && action && (!permissions[entity] || !permissions[entity].includes(action))){
        return <Navigate to='/unathorized' />
    }

    return children;
}
