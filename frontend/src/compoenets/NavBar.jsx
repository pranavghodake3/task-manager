import { Link, useNavigate } from "react-router-dom";
import { destroyToken } from "../util/auth";

export default function NavBar() {
    const navigate = useNavigate();
    function handleLogout(params) {
        destroyToken();
        navigate("/login");
    }
  return (
    <aside className="sidebar">
        <div className="logo"><Link to="/">Home</Link></div>

        <nav className="menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/">Projects</Link>
          <Link to="/">My Issues</Link>
          <Link to="/">Boards</Link>
          <Link to="/">Reports</Link>
          <Link to="/">Settings</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>
  )  
};
