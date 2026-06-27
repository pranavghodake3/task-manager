import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function usePermission() {
    const { user } = useContext(AuthContext);
    const permissions = user.permissions;

    const can = (entity, action) => {
        // if(entity && action && !permissions.includes(`${entity}:${action}`)){
        if(entity && action && (!permissions[entity] || !permissions[entity].includes(action))){
            return false;
        }
        return true;
    }
    return { can }
}