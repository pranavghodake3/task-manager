import { NavLink, useNavigate } from "react-router-dom";
import { destroyToken } from "../util/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
    const AuthContextData = useContext(AuthContext);
    const navigate = useNavigate();
    function handleLogout(params) {
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
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/">My Issues</NavLink>
          {/* <NavLink to="/">Boards</NavLink> */}
          {/* <NavLink to="/">Reports</NavLink> */}
          {/* <NavLink to="/">Settings</NavLink> */}
            <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>
  )  
};
