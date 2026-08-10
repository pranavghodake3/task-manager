import { useAuthStore } from "../store/authStore";
import { getGlobalProjectId } from "../util";

export default function usePermission() {
    const user = useAuthStore((state) => state.user);
    // const permissions = user?.permissions;

    let permissions = user.permissions;
    const currentGlobalProjectId = getGlobalProjectId();
    if(user?.projectMembership){
        user?.projectMembership.forEach(pm => {
            if(pm.projectId == currentGlobalProjectId){
                permissions = pm.permissions;
            }
        });
    }

    const can = (entity, action) => {
        // if(entity && action && !permissions.includes(`${entity}:${action}`)){
        if(entity && action && permissions && (!permissions[entity] || !permissions[entity].includes(action))){
            return false;
        }
        return true;
    }
    return { can }
}
