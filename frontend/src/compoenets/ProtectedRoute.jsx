import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../util/auth";
import { useContext } from "react";
import { AuthContextProvider} from "../context/AuthContextProvider";

export default function ProtectedRoute({ children }) {
    const AuthContextData = useContext(AuthContextProvider);
    console.log('Protected Route AuthContextData: ',AuthContextData);
    if(AuthContextData.authLoading){
        return null;
    }
    if(!isLoggedIn(AuthContextData)){
        return <Navigate to="/login" />
    }

    return children;
}
