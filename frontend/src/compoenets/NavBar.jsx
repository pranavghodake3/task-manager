import { NavLink, useNavigate } from "react-router-dom";
import { destroyToken } from "../util/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ACTION_TYPES, ENTITIES } from "../constants";
import usePermission from "../hooks/usePermission";

export default function NavBar() {
    const AuthContextData = useContext(AuthContext);
    const { can } = usePermission();
    const navigate = useNavigate();
    // const role = getRole();
    // const myRole = role?.name;
    function handleLogout() {
        AuthContextData.setIsLoggedIn(false);
        AuthContextData.setAccessToken(null);
        destroyToken();
        navigate("/login");
    }
  return (
    <aside className="sidebar">
        <div className="logo"><NavLink to="/">Home</NavLink></div>

        <nav className="menu">
          <NavLink to="/dashboard">Dashboard</NavLink>

          <NavLink to="/projects">Projects</NavLink>

          {/* { [GLOBAL_ROLES.COMPANY_ADMIN, GLOBAL_ROLES.SUPER_ADMIN].includes(myRole) && <NavLink to="/users">Users</NavLink> } */}

          { can(ENTITIES.USER, ACTION_TYPES.READ) && <NavLink to="/users">Users</NavLink> }

          <NavLink to="/tasks">Tasks</NavLink>
          
          {/* <NavLink to="/">Boards</NavLink> */}
          {/* <NavLink to="/">Reports</NavLink> */}
          {/* <NavLink to="/">Settings</NavLink> */}
            <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>
  )  
};
