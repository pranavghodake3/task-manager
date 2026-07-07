import { NavLink, useNavigate } from "react-router-dom";
import { destroyToken } from "../util/auth";
import { ACTION_TYPES, ENTITIES } from "../constants";
import usePermission from "../hooks/usePermission";
import { useAuthStore } from "../store/authStore";

export default function NavBar() {
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const { can } = usePermission();
    const navigate = useNavigate();
    function handleLogout() {
        setIsLoggedIn(false);
        setAccessToken(null);
        destroyToken();
        navigate("/login");
    }
  return (
    <aside className="sidebar">
        <div className="logo"><NavLink to="/">Home</NavLink></div>

        <nav className="menu">
          <NavLink to="/dashboard">Dashboard</NavLink>

          <NavLink to="/projects">Projects</NavLink>

          { can(ENTITIES.USER, ACTION_TYPES.READ) && <NavLink to="/users">Users</NavLink> }

          <NavLink to="/tasks">Tasks</NavLink>
          
          {/* <NavLink to="/">Reports</NavLink> */}
          {/* <NavLink to="/">Settings</NavLink> */}
            <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>
  )  
};
