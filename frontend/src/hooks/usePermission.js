import { useAuthStore } from "../store/authStore";

export default function usePermission() {
    const user = useAuthStore((state) => state.user);
    const permissions = user?.permissions;

    const can = (entity, action) => {
        // if(entity && action && !permissions.includes(`${entity}:${action}`)){
        if(entity && action && permissions && (!permissions[entity] || !permissions[entity].includes(action))){
            return false;
        }
        return true;
    }
    return { can }
}
