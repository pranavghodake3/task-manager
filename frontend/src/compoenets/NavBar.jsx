import { NavLink, useNavigate } from "react-router-dom";
import { destroyToken, getRole } from "../util/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLES } from "../constants";

export default function NavBar() {
    const AuthContextData = useContext(AuthContext);
    const navigate = useNavigate();
    const role = getRole();
    const myRole = role?.name;
    console.log('NavBar AuthContextData: ',AuthContextData);
    console.log('NavBar myRole: ',myRole);
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

          { [ROLES.COMPANY_ADMIN, ROLES.SUPER_ADMIN].includes(myRole) && <NavLink to="/projects">Projects</NavLink> }

          { [ROLES.COMPANY_ADMIN, ROLES.SUPER_ADMIN].includes(myRole) && <NavLink to="/users">Users</NavLink> }

          <NavLink to="/tasks">Tasks</NavLink>
          
          {/* <NavLink to="/">Boards</NavLink> */}
          {/* <NavLink to="/">Reports</NavLink> */}
          {/* <NavLink to="/">Settings</NavLink> */}
            <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>
  )  
};
