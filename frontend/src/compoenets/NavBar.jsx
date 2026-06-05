import { NavLink, useNavigate } from "react-router-dom";
import { destroyToken, getUserInfo } from "../util/auth";
import { ROLES } from "../constants";

export default function NavBar() {
  const user = getUserInfo();
    const navigate = useNavigate();
    function handleLogout(params) {
        destroyToken();
        navigate("/login");
    }
  return (
    <aside className="sidebar">
        <div className="logo"><NavLink to="/">Home</NavLink></div>

        <nav className="menu">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/">Projects</NavLink>
          <NavLink to="/">My Issues</NavLink>
          {/* <NavLink to="/">Boards</NavLink> */}
          {/* <NavLink to="/">Reports</NavLink> */}
          {/* <NavLink to="/">Settings</NavLink> */}
            <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>
  )  
};
