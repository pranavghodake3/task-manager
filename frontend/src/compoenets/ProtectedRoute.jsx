import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../util/auth";
import { useAuthStore } from "../store/authStore";
import { getGlobalProjectId } from "../util";

export default function ProtectedRoute({ entity, action, children }) {
    const userData = useAuthStore((state) => state.user);
    const authLoading = useAuthStore((state) => state.authLoading);
    const accessToken = useAuthStore((state) => state.accessToken);
    const isUserLoggedIn = useAuthStore((state) => state.isLoggedIn);
    // const accessToken = useAuthStore((state) => state.accessToken);
    let permissions = {};
    console.log('Protected userData: ',userData);
    const currentGlobalProjectId = getGlobalProjectId();
    if(userData?.projectMembership){
        userData?.projectMembership.forEach(pm => {
            if(pm.projectId == currentGlobalProjectId){
                permissions = pm.permissions;
            }
        });
    }
    console.log('Protected permissions: ',permissions);
    
    if(authLoading){
        return null;
    }
    if(!isLoggedIn({accessToken, isUserLoggedIn})){
        return <Navigate to="/login" />
    }

    if(entity && action && permissions && (!permissions[entity] || !permissions[entity].includes(action))){
        return <Navigate to='/unathorized' />
    }

    return children;
}
