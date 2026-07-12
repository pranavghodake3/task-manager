import { NavLink, useNavigate } from "react-router-dom";
import { destroyToken } from "../util/auth";
import { ACTION_TYPES, ENTITIES } from "../constants";
import usePermission from "../hooks/usePermission";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import Cookies from "js-cookie";

export default function NavBar() {
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const [globalProjectId, setGlobalProjectId] = useState(Cookies.get('globalProjectId') ?? '');
    const user = useAuthStore((state) => state.user);
    const { can } = usePermission();
    const navigate = useNavigate();
    async function handleLogout() {
      try {
        await destroyToken();
          setIsLoggedIn(false);
          setAccessToken(null);
          navigate("/login");
      } catch (error) {
        console.log('Error in logout: ',error);
      }
    }
    function handleGlobalProjectChange(e) {
      Cookies.set('globalProjectId', e.target.value);
      setGlobalProjectId(e.target.value);
    }

  return (
    <aside className="sidebar">
        <div className="logo"><NavLink to="/">Home</NavLink> { `${user.firstName} ${user.lastName} (${user?.globalRole?.name ?? ''})` } </div>

        <nav className="menu">
          <div>
            <select name="projects" id="projects" value={globalProjectId} onChange={handleGlobalProjectChange}>
              {user?.projectMembership?.map(pm => 
                <option key={pm.projectId} value={pm.project.id}>{pm.project.name}</option>
              )}
            </select>
          </div>
          <NavLink to="/dashboard">Dashboard({ user.company?.name })</NavLink>

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
